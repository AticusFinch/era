import styles from "./container.module.css";

export default function Container({ children }) {
  return (
    <div className="mx-auto w-[90%] max-w-[2200px] px-1 sm:px-4 lg:px-6 xl:px-8 2xl:px-10 text-font-primary">
      {children}
    </div>
  );
}
