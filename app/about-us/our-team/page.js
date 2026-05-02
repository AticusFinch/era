import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import Image from "next/image";
import styles from "./page.module.css";
import PageUnderConstruction from "@/app/components/pageUnderConstruction";

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
    role: "Project and Advocacy Coordinator,",
    organization: "ERA",
    focus: "Key programmes / focus areas",
    image: "/img/our-team/team/Elena.png",
    bio: "Elena Petrovska is the program manager of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "jelena",
    name: "Jelena Jeremić",
    role: "PR and Comms Officer",
    organization: "ERA",
    focus: "Key programmes / focus areas",
    image: "/img/our-team/team/Jelena.png",
    bio: "Jelena Jeremić is the program manager of ERA. She is a member of the LGBT+ Centre Zagreb and a member of the European Network of Pride Organizers (ENPO).",
  },
  {
    id: "sila",
    name: "Bugu Sila",
    role: "Project Coordinator",
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
              <div className={styles.team_intro}>
                <p>
                  We are a{" "}
                  <b>
                    regional platform advancing LGBTIQ equality through
                    coordinated action, evidence-based approaches, and policy
                    engagement
                  </b>
                  .
                </p>
                <p>
                  Our governance brings together leaders from across the region
                  - the Board, ensuring that our strategic priorities and
                  direction is grounded in lived realities, while reflecting
                  diverse national contexts and maintaining a coherent regional
                  approach. The ERA team translates that into action, designing
                  regional initiatives, programmes, partnerships, supporting
                  organisations and advocacy processes, and positioning regional
                  issues within European spaces.
                </p>
              </div>
            </header>

            <section className={styles.team_section}>
              <div className={styles.team_section_header}>
                <h2 className={styles.team_section_title}>
                  <span className="title-accent">Team</span>
                </h2>
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
                <h2 className={styles.team_section_title}>
                  <span className="title-accent">Board Members</span>
                </h2>
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
