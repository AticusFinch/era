import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";

export default function OurWork() {
  return (
    <>
      <Navbar />
      <main className={styles.our_work_page}>
        <Container>
          <div className={styles.our_work_container}>
            <header className={styles.our_work_header}>
              <h1 className={`${styles.our_work_title} title`}>
                <span className="title-accent">Our Work</span>
              </h1>
              <p className={styles.our_work_intro}>
                At ERA, we are dedicated to advancing LGBTI+ rights, equality,
                and inclusion across the Western Balkans and Türkiye through a
                comprehensive approach that combines advocacy, capacity
                building, research, public awareness, and international
                engagement. Our work is deeply rooted in the belief that a
                strong, well-connected, and strategically empowered movement is
                essential for achieving meaningful and sustainable change.
              </p>
            </header>

            <div className={styles.our_work_sections}>
              <article className={styles.our_work_card}>
                <div className={styles.our_work_card_icon}>
                  <span>AP</span>
                </div>
                <div className={styles.our_work_card_content}>
                  <h4 className={styles.our_work_section_title}>
                    Advocacy and Policy Influence
                  </h4>
                  <div className={styles.our_work_text_columns}>
                    <p className={styles.our_work_section_body}>
                      Advocacy and Policy Influence lie at the heart of our
                      mission. We work closely with national governments, EU
                      institutions, and international organizations to promote
                      stronger anti-discrimination legislation, legal
                      protections, and inclusive policies. Through direct
                      engagement with policymakers, we ensure that LGBTI+ rights
                      remain a priority on political agendas, influencing
                      decision-making at local, national, and regional levels.
                    </p>
                    <p className={styles.our_work_section_body}>
                      Our advocacy efforts are backed by rigorous research,
                      legal expertise, and strategic campaigns, ensuring that we
                      address the systemic barriers and challenges faced by
                      LGBTI+ communities. As a recognized stakeholder in the EU
                      enlargement process, we actively contribute to policy
                      discussions, monitoring the implementation of human rights
                      standards and reforms in the region.
                    </p>
                  </div>
                </div>
              </article>

              <article className={styles.our_work_card}>
                <div className={styles.our_work_card_icon}>
                  <span>CB</span>
                </div>
                <div className={styles.our_work_card_content}>
                  <h4 className={styles.our_work_section_title}>
                    Capacity Building and Movement Strengthening
                  </h4>
                  <div className={styles.our_work_text_columns}>
                    <p className={styles.our_work_section_body}>
                      Strengthening the capacities of LGBTI+ organizations and
                      activists is a key component of our work. We provide
                      tailored training, mentorship, and leadership development
                      to ensure that organizations and individuals have the
                      skills, knowledge, and resources needed to advocate
                      effectively and build sustainable movements.
                    </p>
                    <p className={styles.our_work_section_body}>
                      Through strategic networking opportunities, we foster
                      cross-border cooperation and peer learning, helping our
                      members adapt to complex political environments, respond
                      to crises, and amplify their impact. We also support
                      grassroots initiatives by providing access to funding
                      opportunities, capacity-strengthening programs, and expert
                      guidance to enhance their operational resilience.
                    </p>
                  </div>
                </div>
              </article>

              <article className={styles.our_work_card}>
                <div className={styles.our_work_card_icon}>
                  <span>RE</span>
                </div>
                <div className={styles.our_work_card_content}>
                  <h4 className={styles.our_work_section_title}>
                    Research and Evidence-Based Advocacy
                  </h4>
                  <div className={styles.our_work_text_columns}>
                    <p className={styles.our_work_section_body}>
                      Research is a fundamental tool in our approach, enabling
                      us to document realities, highlight gaps in protection,
                      and inform advocacy strategies. ERA conducts regional
                      studies on discrimination, hate crimes, social attitudes,
                      and policy frameworks, producing evidence-based reports
                      that strengthen the case for legal and institutional
                      reforms.
                    </p>
                    <p className={styles.our_work_section_body}>
                      ERA continuously supports its member organizations in
                      their national advocacy efforts by different means. Our
                      evidence-based approach and the data we produce not only
                      shape our own strategies but also serve as essential
                      resources for policymakers, civil society organizations,
                      and international bodies. By continuously monitoring
                      trends, challenges, and progress, we ensure that our work
                      remains relevant and responsive to the evolving needs of
                      LGBTI+ communities.
                    </p>
                  </div>
                </div>
              </article>

              <article className={styles.our_work_card}>
                <div className={styles.our_work_card_icon}>
                  <span>PA</span>
                </div>
                <div className={styles.our_work_card_content}>
                  <h4 className={styles.our_work_section_title}>
                    Public Awareness and Social Change
                  </h4>
                  <div className={styles.our_work_text_columns}>
                    <p className={styles.our_work_section_body}>
                      Our public awareness and social change initiatives seek to
                      transform societal perceptions and challenge deep-seated
                      prejudices against LGBTI+ people. We use innovative
                      communication strategies, storytelling, education
                      programs, and media engagement to counter misinformation,
                      foster empathy, and create inclusive narratives.
                    </p>
                    <p className={styles.our_work_section_body}>
                      Through national and regional campaigns, we work to break
                      stereotypes, increase public support for LGBTI+ rights,
                      and encourage active allyship.
                    </p>
                  </div>
                </div>
              </article>

              <article className={styles.our_work_card}>
                <div className={styles.our_work_card_icon}>
                  <span>EU</span>
                </div>
                <div className={styles.our_work_card_content}>
                  <h4 className={styles.our_work_section_title}>
                    International and EU-Level Advocacy
                  </h4>
                  <div className={styles.our_work_text_columns}>
                    <p className={styles.our_work_section_body}>
                      On an international level, ERA plays a critical role in
                      advancing LGBTI+ rights within the EU integration process
                      and global human rights frameworks. We work closely with
                      the European Commission, European Parliament, and
                      international institutions to ensure that LGBTI+ issues
                      are prioritized in policy discussions, funding mechanisms,
                      and human rights reports.
                    </p>
                    <p className={styles.our_work_section_body}>
                      Our engagement in EU advocacy includes monitoring
                      accession processes, ensuring alignment with human rights
                      standards, and advocating for the inclusion of LGBTI+
                      indicators in EU programs. Beyond the EU, we collaborate
                      with UN agencies, international human rights
                      organizations, and global LGBTI+ networks, reinforcing the
                      importance of intersectional and regionally specific
                      approaches in addressing human rights violations.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
