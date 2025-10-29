import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ children, href, className }) => {
  return (
    <Link href={href} className={`${styles.button} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
