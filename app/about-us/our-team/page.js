import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import Image from "next/image";
import styles from "./page.module.css";

const boardMembers = [
  {
    id: "admir",
    name: "Admir Adilović",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/Admir.png",
    bio: "Admir Adilović is a board member of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "aleksa",
    name: "Aleksa Milanović",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/Aleksa.png",
    bio: "Aleksa Milanović is a board member of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "david",
    name: "David Tasevski",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/David.png",
    bio: "David Tasevski is a board member of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "helena",
    name: "Helena Vuković",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/Helena.png",
    bio: "Helena Škegro is a board member of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "jelena-v",
    name: "Jelena Vasiljević",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/JelenaV.png",
    bio: "Jelena Vasiljević is a board member of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "jovan",
    name: "Jovan Džoli Ulićević",
    role: "Board member",
    organization: "LGBT+ Centre Zagreb",
    image: "/img/our-team/board/Jovan.png",
    bio: "Jovan Đurković is a board member of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
];

const teamMembers = [
  {
    id: "bojana",
    name: "Bojana Simić",
    role: "Finance Manager",
    organization: "ERA",
    image: "/img/our-team/team/Bojana.png",
    bio: "Bojana Simić is the finance manager of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "danijel",
    name: "Danijel Kalezić",
    role: "Executive Director",
    organization: "ERA",
    image: "/img/our-team/team/Danijel.png",
    bio: "Danijel Kalezić is the executive director of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "elena",
    name: "Elena Petrovska",
    role: "Program Manager",
    organization: "ERA",
    focus: "Key programmes / focus areas",
    image: "/img/our-team/team/Elena.png",
    bio: "Elena Petrovska is the program manager of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "jelena",
    name: "Jelena Jeremić",
    role: "Program Manager",
    organization: "ERA",
    focus: "Key programmes / focus areas",
    image: "/img/our-team/team/Jelena.png",
    bio: "Jelena Jeremić is the program manager of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "sila",
    name: "Bugu Sila",
    role: "Project Manager",
    organization: "ERA",
    image: "/img/our-team/team/Sila.png",
    bio: "Bugu Sila is the project manager of ERA. He is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
];

const OurTeamPage = () => {
  return (
    <>
      <Navbar />
      <main className={styles.team_page}>
        <Container>
          <div className={styles.team_container}>
            <header className={styles.team_header}>
              <h1 className={`${styles.team_title} title`}>
                <span className="title-accent">Our Team</span>
              </h1>
              <p className={styles.team_intro}>
                This is a placeholder introduction about ERA&apos;s team and
                governance. You can describe how the Board and staff work
                together, include a short mission statement, and highlight your
                regional presence here.
              </p>
            </header>

            <section className={styles.team_section}>
              <div className={styles.team_section_header}>
                <h2 className={styles.team_section_title}>Team</h2>
                <p className={styles.team_section_description}>
                  Placeholder text for describing ERA&apos;s staff team. You can
                  outline key departments, ways of working, and how the team
                  supports members across the region.
                </p>
              </div>
              <div className={styles.team_grid}>
                {teamMembers.map((member) => (
                  <article key={member.id} className={styles.team_card}>
                    <div className={styles.team_image_wrapper}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={320}
                        height={360}
                        className={styles.team_image}
                      />
                      <div className={styles.team_overlay}>
                        <h3 className={styles.team_overlay_name}>
                          {member.name}
                        </h3>
                        <p className={styles.team_overlay_role}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.team_section}>
              <div className={styles.team_section_header}>
                <h2 className={styles.team_section_title}>Board Members</h2>
                <p className={styles.team_section_description}>
                  Placeholder text for explaining the role of the Board. You can
                  add information about governance structure, terms, and how the
                  Board represents ERA&apos;s membership.
                </p>
              </div>
              <div className={styles.team_grid}>
                {boardMembers.map((member) => (
                  <article key={member.id} className={styles.team_card}>
                    <div className={styles.team_image_wrapper}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={320}
                        height={360}
                        className={styles.team_image}
                      />
                      <div className={styles.team_overlay}>
                        <h3 className={styles.team_overlay_name}>
                          {member.name}
                        </h3>
                        <p className={styles.team_overlay_role}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default OurTeamPage;
