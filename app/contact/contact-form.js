"use client";

import { useState } from "react";
import styles from "./contact-form.module.css";

const SUBJECT_OPTIONS = [
  { value: "", label: "Select a topic" },
  { value: "general", label: "General inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media & press" },
  { value: "membership", label: "Membership" },
  { value: "other", label: "Other" },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
  website: "",
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.subject) {
    errors.subject = "Please select a topic.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      setStatusMessage("");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again later.",
        );
      }

      setStatus("success");
      setStatusMessage(
        data.message ||
          "Thank you for your message. We will get back to you as soon as possible.",
      );
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message ||
          "Unable to send your message. Please email us at office@lgbti-era.org.",
      );
    }
  }

  return (
    <div className={styles.form_card}>
      <form
        className={styles.form_grid}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "submitting"}
      >
        <div className={`${styles.form_field} ${styles.form_field_full}`}>
          <label className={styles.form_honeypot} htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            className={styles.form_honeypot}
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_field}>
          <label className={styles.form_label} htmlFor="name">
            Name <span className={styles.form_required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`${styles.form_input} ${errors.name ? styles.form_input_error : ""}`}
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className={styles.form_error} role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.form_field}>
          <label className={styles.form_label} htmlFor="email">
            Email <span className={styles.form_required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.form_input} ${errors.email ? styles.form_input_error : ""}`}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className={styles.form_error} role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={`${styles.form_field} ${styles.form_field_full}`}>
          <label className={styles.form_label} htmlFor="organization">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            className={styles.form_input}
            value={form.organization}
            onChange={handleChange}
            autoComplete="organization"
          />
        </div>

        <div className={`${styles.form_field} ${styles.form_field_full}`}>
          <label className={styles.form_label} htmlFor="subject">
            Topic <span className={styles.form_required}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            className={`${styles.form_select} ${errors.subject ? styles.form_select_error : ""}`}
            value={form.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value || "default"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="subject-error" className={styles.form_error} role="alert">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className={`${styles.form_field} ${styles.form_field_full}`}>
          <label className={styles.form_label} htmlFor="message">
            Message <span className={styles.form_required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className={`${styles.form_textarea} ${errors.message ? styles.form_textarea_error : ""}`}
            value={form.message}
            onChange={handleChange}
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p id="message-error" className={styles.form_error} role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className={`${styles.form_actions} ${styles.form_field_full}`}>
          <button
            type="submit"
            className={styles.form_submit}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>

          {statusMessage ? (
            <p
              className={`${styles.form_status} ${
                status === "success"
                  ? styles.form_status_success
                  : styles.form_status_error
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
