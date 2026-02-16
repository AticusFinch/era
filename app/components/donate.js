import styles from "./donate.module.css";
import Button from "@/app/components/button";
import Container from "@/app/components/container";

const Donate = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={`${styles.half} ${styles.half_member}`}>
            <h2 className={styles.title}>Become a member</h2>
            <p className={styles.description}>
              Join ERA and help us promote equality and inclusion for all.
            </p>
            <div>
              <Button href="/become-a-member">Become a member</Button>
            </div>
          </div>
          <div className={`${styles.half} ${styles.half_donate}`}>
            <h2 className={styles.title}>Donate to ERA</h2>
            <p className={styles.description}>
              Your support helps us continue our work in promoting equality and
              inclusion for all.
            </p>
            <div>
              <Button href="/donate" className={styles.button_donate}>
                Donate
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Donate;
