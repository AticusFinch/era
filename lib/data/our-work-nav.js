import {
  FaDiagramProject,
  FaGraduationCap,
  FaUsers,
  FaHandshake,
  FaGavel,
  FaMicroscope,
  FaCalendarDays,
} from "react-icons/fa6";

/**
 * Our Work subpages — used by the navbar dropdown and /our-work landing subnav.
 * `Icon` is optional for consumers that only need href/label (e.g. navbar).
 */
export const ourWorkSubnavLinks = [
  { href: "/our-work/projects", label: "Projects", Icon: FaDiagramProject },
  { href: "/our-work/training-hub", label: "Training Hub", Icon: FaGraduationCap },
  { href: "/our-work/caucuses", label: "WLW & TNBI Caucuses", Icon: FaUsers },
  {
    href: "/our-work/community-support",
    label: "Community Support",
    Icon: FaHandshake,
  },
  { href: "/our-work/advocacy", label: "Advocacy", Icon: FaGavel },
  { href: "/our-work/research", label: "Research", Icon: FaMicroscope },
  { href: "/our-work/events", label: "Events", Icon: FaCalendarDays },
];
