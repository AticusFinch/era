import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";

const pillars = [
  {
    abbr: "AP",
    title: "Advocacy and Policy Influence",
    paragraphs: [
      "Advocacy and Policy Influence lie at the heart of our mission. We work closely with national governments, EU institutions, and international organizations to promote stronger anti-discrimination legislation, legal protections, and inclusive policies. Through direct engagement with policymakers, we ensure that LGBTI+ rights remain a priority on political agendas, influencing decision-making at local, national, and regional levels.",
      "Our advocacy efforts are backed by rigorous research, legal expertise, and strategic campaigns, ensuring that we address the systemic barriers and challenges faced by LGBTI+ communities. As a recognized stakeholder in the EU enlargement process, we actively contribute to policy discussions, monitoring the implementation of human rights standards and reforms in the region.",
    ],
  },
  {
    abbr: "CB",
    title: "Capacity Building and Movement Strengthening",
    paragraphs: [
      "Strengthening the capacities of LGBTI+ organizations and activists is a key component of our work. We provide tailored training, mentorship, and leadership development to ensure that organizations and individuals have the skills, knowledge, and resources needed to advocate effectively and build sustainable movements.",
      "Through strategic networking opportunities, we foster cross-border cooperation and peer learning, helping our members adapt to complex political environments, respond to crises, and amplify their impact. We also support grassroots initiatives by providing access to funding opportunities, capacity-strengthening programs, and expert guidance to enhance their operational resilience.",
    ],
  },
  {
    abbr: "RE",
    title: "Research and Evidence-Based Advocacy",
    paragraphs: [
      "Research is a fundamental tool in our approach, enabling us to document realities, highlight gaps in protection, and inform advocacy strategies. ERA conducts regional studies on discrimination, hate crimes, social attitudes, and policy frameworks, producing evidence-based reports that strengthen the case for legal and institutional reforms.",
      "ERA continuously supports its member organizations in their national advocacy efforts by different means. Our evidence-based approach and the data we produce not only shape our own strategies but also serve as essential resources for policymakers, civil society organizations, and international bodies. By continuously monitoring trends, challenges, and progress, we ensure that our work remains relevant and responsive to the evolving needs of LGBTI+ communities.",
    ],
  },
  {
    abbr: "PA",
    title: "Public Awareness and Social Change",
    paragraphs: [
      "Our public awareness and social change initiatives seek to transform societal perceptions and challenge deep-seated prejudices against LGBTI+ people. We use innovative communication strategies, storytelling, education programs, and media engagement to counter misinformation, foster empathy, and create inclusive narratives.",
      "Through national and regional campaigns, we work to break stereotypes, increase public support for LGBTI+ rights, and encourage active allyship.",
    ],
  },
  {
    abbr: "EU",
    title: "International and EU-Level Advocacy",
    paragraphs: [
      "On an international level, ERA plays a critical role in advancing LGBTI+ rights within the EU integration process and global human rights frameworks. We work closely with the European Commission, European Parliament, and international institutions to ensure that LGBTI+ issues are prioritized in policy discussions, funding mechanisms, and human rights reports.",
      "Our engagement in EU advocacy includes monitoring accession processes, ensuring alignment with human rights standards, and advocating for the inclusion of LGBTI+ indicators in EU programs. Beyond the EU, we collaborate with UN agencies, international human rights organizations, and global LGBTI+ networks, reinforcing the importance of intersectional and regionally specific approaches in addressing human rights violations.",
    ],
  },
];

export default function OurWork() {
  return (
    <>
      <Navbar />
      <main className={styles.our_work_page}>
        <div className={styles.our_work_hero}>
          <Container>
            <header className={styles.our_work_header}>
              <div className={styles.our_work_header_row}>
                <h1 className={`${styles.our_work_title} title`}>
                  <span className="title-accent">Our Work</span>
                </h1>
                <p className={styles.our_work_intro}>
                  At ERA, we are dedicated to advancing LGBTI+ rights, equality,
                  and inclusion across the Western Balkans and Türkiye through a
                  comprehensive approach that combines advocacy, capacity
                  building, research, public awareness, and international
                  engagement. Our work is deeply rooted in the belief that a
                  strong, well-connected, and strategically empowered movement
                  is essential for achieving meaningful and sustainable change.
                </p>
              </div>
            </header>
          </Container>
        </div>

        <Container>
          <div className={styles.our_work_sections}>
            {pillars.map((pillar, index) => (
              <article
                key={pillar.abbr}
                className={styles.our_work_card}
                style={{ "--pillar-index": index }}
              >
                <div className={styles.our_work_card_top}>
                  <span className={styles.our_work_card_index} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.our_work_card_icon} aria-hidden>
                    <span>{pillar.abbr}</span>
                  </div>
                </div>
                <div className={styles.our_work_card_body}>
                  <h2 className={styles.our_work_section_title}>
                    {pillar.title}
                  </h2>
                  <div className={styles.our_work_text_columns}>
                    {pillar.paragraphs.map((text, i) => (
                      <p key={i} className={styles.our_work_section_body}>
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
