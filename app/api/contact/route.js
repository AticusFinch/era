const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL_TO || "stasabastrica05@gmail.com";

const SUBJECT_LABELS = {
  general: "General inquiry",
  partnership: "Partnership",
  media: "Media & press",
  membership: "Membership",
  other: "Other",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, organization, subject, message, website } = body ?? {};

  if (website) {
    return Response.json({ message: "Thank you for your message." });
  }

  if (!name?.trim() || !email?.trim() || !subject || !message?.trim()) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email.trim())) {
    return Response.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const subjectLabel = SUBJECT_LABELS[subject] || subject;
  const emailSubject = `[ERA Contact] ${subjectLabel} — ${name.trim()}`;
  const emailBody = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    organization?.trim() ? `Organization: ${organization.trim()}` : null,
    `Topic: ${subjectLabel}`,
    "",
    "Message:",
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;

  if (resendKey && resendFrom) {
    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [CONTACT_EMAIL],
          reply_to: email.trim(),
          subject: emailSubject,
          text: emailBody,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error("Resend error:", errorData);
        return Response.json(
          { error: "Unable to send your message. Please try again later." },
          { status: 502 },
        );
      }

      return Response.json({
        message:
          "Thank you for your message. We will get back to you as soon as possible.",
      });
    } catch (error) {
      console.error("Resend request failed:", error);
      return Response.json(
        { error: "Unable to send your message. Please try again later." },
        { status: 502 },
      );
    }
  }

  try {
    const formSubmitResponse = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: "table",
          _captcha: "false",
          name: name.trim(),
          email: email.trim(),
          organization: organization?.trim() || "—",
          topic: subjectLabel,
          message: message.trim(),
        }),
      },
    );

    const formSubmitData = await formSubmitResponse.json().catch(() => ({}));

    if (!formSubmitResponse.ok || formSubmitData.success === false) {
      console.error("FormSubmit error:", formSubmitData);
      return Response.json(
        {
          error:
            "Unable to send your message right now. Please email us at office@lgbti-era.org.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      message:
        "Thank you for your message. We will get back to you as soon as possible.",
    });
  } catch (error) {
    console.error("FormSubmit request failed:", error);
    return Response.json(
      {
        error:
          "Unable to send your message right now. Please email us at office@lgbti-era.org.",
      },
      { status: 502 },
    );
  }
}
