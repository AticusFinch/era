const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL_TO?.trim() || "stasabastrica05@gmail.com";

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

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) return null;

  return { apiKey, from };
}

async function sendViaResend({ from, apiKey, to, replyTo, subject, text }) {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  const data = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    const detail =
      data?.message ||
      data?.error?.message ||
      (typeof data?.error === "string" ? data.error : null);

    return { ok: false, detail, status: resendResponse.status };
  }

  return { ok: true };
}

async function sendViaFormSubmit({
  to,
  subject,
  name,
  email,
  organization,
  topic,
  message,
}) {
  const formSubmitResponse = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name,
        email,
        organization: organization || "—",
        topic,
        message,
      }),
    },
  );

  const data = await formSubmitResponse.json().catch(() => ({}));

  if (!formSubmitResponse.ok || data.success === false) {
    return { ok: false, detail: data?.message || "FormSubmit request failed" };
  }

  return { ok: true };
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

  const payload = {
    to: CONTACT_EMAIL,
    replyTo: email.trim(),
    subject: emailSubject,
    text: emailBody,
    name: name.trim(),
    email: email.trim(),
    organization: organization?.trim() || "",
    topic: subjectLabel,
    message: message.trim(),
  };

  const resend = getResendConfig();

  if (resend) {
    try {
      const result = await sendViaResend({
        from: resend.from,
        apiKey: resend.apiKey,
        to: payload.to,
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
      });

      if (result.ok) {
        return Response.json({
          message:
            "Thank you for your message. We will get back to you as soon as possible.",
        });
      }

      console.error("Resend error:", result.status, result.detail);
    } catch (error) {
      console.error("Resend request failed:", error);
    }
  }

  try {
    const fallback = await sendViaFormSubmit(payload);

    if (fallback.ok) {
      return Response.json({
        message:
          "Thank you for your message. We will get back to you as soon as possible.",
      });
    }

    console.error("FormSubmit error:", fallback.detail);
  } catch (error) {
    console.error("FormSubmit request failed:", error);
  }

  return Response.json(
    {
      error:
        "Unable to send your message right now. Please email us at office@lgbti-era.org.",
    },
    { status: 502 },
  );
}
