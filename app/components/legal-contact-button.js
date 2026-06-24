"use client";

import { MdEmail } from "react-icons/md";

const ERA_EMAIL = "office@lgbti-era.org";

export default function LegalContactButton({
  subject = "ERA website inquiry",
  className,
  children = ERA_EMAIL,
}) {
  const mailtoHref = `mailto:${ERA_EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <a
      href={mailtoHref}
      className={className}
      aria-label={`Email ERA at ${ERA_EMAIL} about ${subject}`}
    >
      <MdEmail aria-hidden />
      {children}
    </a>
  );
}
