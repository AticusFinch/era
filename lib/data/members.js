/**
 * Member organizations — logos live under public/img/members/{country}/
 * Update email, description, website per organization when ready.
 */

function memberFromFile(countryFolder, filename, overrides = {}) {
  const base = filename.replace(/\.[^.]+$/, "");
  const id =
    overrides.id ??
    `${countryFolder}-${base}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const logo = `/img/members/${countryFolder}/${filename}`;
  return {
    id,
    name: overrides.name ?? base.replace(/([a-z])([A-Z])/g, "$1 $2"),
    email: overrides.email ?? "email@example.org",
    logo,
    description:
      overrides.description ??
      "Nedostaje opis organizacije i njenog rada. Dodati.",
    website: overrides.website ?? "https://example.org",
    /** Optional URLs: website, facebook, instagram, twitter, linkedin, bluesky, youtube */
    social:
      overrides.social && typeof overrides.social === "object"
        ? overrides.social
        : {},
  };
}

export const membersByCountry = [
  {
    countryCode: "AL",
    countryName: "Albania",
    members: [
      memberFromFile("albania", "AAPLWHA.jpg", {
        name: "Albanian Association of PLWHA-AAPLWHA",
        email: "alb_org_plwha@yahoo.com",
        description:
          "The Albanian Association of People Living with HIV/AIDS (PLWHA) is a non-profit organization, founded and leaded by PLHIV, registered with the Decision no. 1139, dated 11/10/2004 of the Tirana First Instance Court, with registered address at “Aleksandër Moisiu” Street, No. 80, Tirana, Albania, with Identification Number (NIPT) K71912001W. The Organization’s mission is to improve the quality of life of PLHIV, through the provision of services, capacity building, and collaboration with professionals in the field of HIV/AIDS. It works to promote and protect the human rights of PLHIV, including access to treatment, care, support, education, and employment. The Organization is created by and led by people PLHIV. ",
        social: {
          facebook: "https://www.facebook.com/ShoqataShqiptarePLWHA",
          instagram: "https://www.instagram.com/etw.albania/",
        },
      }),
      memberFromFile("albania", "Aleanca.png", {
        name: "Aleanca LGBT",
        email: "aleanca.al@gmail.com",
        description:
          "Alliance Against Discrimination of LGBTI (Aleanca) is a national civil society organization working to empower LGBTI people in Albania and to advance equality, non-discrimination and access to justice. Through direct service provision, strategic litigation, advocacy and institutional lobbying, Aleanca promotes legal recognition and policy reforms in line with European and international human rights standards. By combining community-based support with research, monitoring and professional capacity-building, the organization challenges stigma and discrimination and contributes to a fairer, safer and more inclusive society.",
        social: {
          facebook: "https://www.facebook.com/AleancaLGBT/",
          instagram: "https://www.instagram.com/aleancalgbt/",
          tiktok: "https://www.tiktok.com/@aleancalgbt",
        },
      }),
      memberFromFile("albania", "OMSA.png", {
        name: "Open Mind Spectrum Albania (OMSA)",
        email: "omsa.albania@gmail.com",
        description:
          "Open Mind Spectrum Albania (OMSA) is a human rights organization promoting equality, dignity, and social inclusion for LGBTIQ+ people and other marginalized communities in Albania. Through advocacy, culture, education, and community engagement, OMSA works to challenge discrimination and strengthen access to rights, services, and public and political participation.",
        social: {
          website: "https://omsalbania.org/",
          facebook: "https://www.facebook.com/groups/365766123524749/",
          instagram: "https://instagram.com/omsalbania?igshid=jbtuxj7k1hs",
          twitter: "https://www.twitter.com/OMSAalbania/",
          linkedin:
            "https://www.linkedin.com/company/open-mind-spectrum-albania/",
        },
      }),
      memberFromFile("albania", "Pink.png", {
        name: "PINK Albania",
        email: "pink@pinkembassy.al",
        description:
          "PINK Embassy / LGBT Pro Albania is a non-profit organization which works for the protection and advancement of the rights of lesbians, gays, bisexuals, transgender, intersex and queer people in Albania.",
        social: {
          facebook: "https://www.facebook.com/pinkembassy",
          instagram: "https://www.instagram.com/ambasadapinkshqiperi/",
        },
      }),
      memberFromFile("albania", "ProLGBT.png", {
        name: "ProLGBT",
        email: "prolgbtalbania@gmail.com",
        description:
          "ProLGBT works for equality and dignity for LGBTI people in Albania, using the media, advocacy and public education to drive social change through its platform Historia Ime. The platfirm counters misinformation, strengthens inclusive journalism, and amplifies marginalized voices. This way we promote a more informed and equitable public discourse.",
        social: {
          instagram:
            "https://www.instagram.com/historiaime?igsh=b3o3dWl6NnZ5MzFw",
        },
      }),
      memberFromFile("albania", "Streha.png", {
        name: "Streha Center",
        email: "info@strehacenter.org",
        description:
          "Streha is a leading LGBTI+ organization in Albania dedicated to advancing the protection, empowerment, and social and economic inclusion of at-risk LGBTI+ youth. Through shelter-based interventions, institutional capacity building, and policy advocacy, Streha reduces exposure to violence and homelessness, strengthens access to rights and services, and improves pathways toward education, employment, and independent living. Working in Tirana and across the Albanian-speaking region, Streha contributes to sustainable, rights-based change by translating individual protection into systemic improvements in policies, practices, and public awareness.",
        social: {
          facebook: "https://www.facebook.com/strehalgbtAlbania/",
          instagram: "https://www.instagram.com/strehalgbt/",
          linkedin:
            "https://www.linkedin.com/in/streha-lgbt-shelter-6394732bb/",
        },
      }),
    ],
  },
  {
    countryCode: "BA",
    countryName: "Bosnia and Herzegovina",
    members: [
      memberFromFile("bih", "Cure.png", {
        name: "CURE Foundation",
        description:
          "CURE Foundation is a feminist-activist organization that operates for the equality of sexes and genders pleading for positive social changes through educational, artistic, cultural and research programs.",
        social: {
          website: "https://fondacijacure.org/",
          instagram: "https://www.instagram.com/fondacijacure/",
          facebook: "https://www.facebook.com/fondacijacure",
        },
      }),
      memberFromFile("bih", "TOC.png", {
        name: "Tuzla Open Center",
        description:
          "Tuzla Open Center (TOC) is a civil society organization based in Tuzla, Bosnia and Herzegovina, dedicated to advancing human rights, equality, and democratic participation. Through advocacy, education, and community-based initiatives, TOC empowers LGBTI+ people, women, and other marginalized groups to actively engage in public and political life.",
        social: {
          website: "https://www.toc.ba/",
          instagram:
            "https://www.instagram.com/tuzlanski.otvoreni.centar?igsh=MXYweXhkOThkZmJhcw==",
          facebook: "https://www.facebook.com/share/182Uf8xkrh/",
          tiktok:
            "https://www.tiktok.com/@tuzlanskiotvorenicentar?_r=1&_t=ZS-93FlYQf1Z96",
          twitter: "https://x.com/toc_tuzla",
        },
      }),
      memberFromFile("bih", "Wings of Hope.png", {
        name: "Foundation Wings of Hope",
        description:
          "Foundation Wings of Hope is a Sarajevo-based organization providing psychosocial support and empowerment programs for marginalized communities. In April 2024, we opened the first LGBTIQ+ Safe House in Bosnia and Herzegovina, offering safe accommodation, basic living needs, psychosocial support, and trauma-informed care to survivors of violence and those at risk.",
        social: {
          website: "https://wings-of-hope.ba/",
          facebook: "https://www.facebook.com/FondacijaKrilanade",
          instagram: "https://www.instagram.com/krilanadewingsofhope/?hl=en",
        },
      }),
    ],
  },
  {
    countryCode: "HR",
    countryName: "Croatia",
    members: [
      memberFromFile("croatia", "Domino.png", {
        description:
          "Domino is a non-governmental, non-profit organization based in Zagreb, Croatia, founded in 2003. Its mission is to challenge traditional norms and contribute to social change by supporting independent culture, critical artistic expression, and public engagement on issues such as queer and minority rights, media, and public policy. Domino produces and promotes a range of cultural and artistic programs — including festivals, performances, film screenings, residencies, educational events, and interdisciplinary projects — with a focus on performance art, theatre, dance, and queer visibility. Through collaborations with local and international partners, the organization aims to foster an open, creative, and inclusive cultural environment.",
        social: {
          website: "https://thisisadominoproject.org/",
          facebook: "https://www.facebook.com/thisisadominoproject/",
          instagram: "https://www.instagram.com/this_is_a_domino_project/",
        },
      }),
      memberFromFile("croatia", "Dugine obitelji.png", {
        name: "Rainbow Families Croatia",
        description:
          "Rainbow Families Croatia is a non-governmental organisation advocating for the rights, recognition, and protection of LGBTIQ+ families in Croatia. We work through legal advocacy, community support, public education, and policy engagement to ensure that all families are treated equally, regardless of sexual orientation or gender identity.",
        social: {
          website: "https://www.dugineobitelji.com/",
          instagram: "https://www.instagram.com/dugineobitelji/",
          facebook: "https://www.facebook.com/dugineobitelji",
        },
      }),
      memberFromFile("croatia", "kolekTIRV.png", {
        name: "kolekTIRV",
        description:
          "kolekTIRV is a prominent trans-led organization in Croatia dedicated to the protection and empowerment of trans, intersex, and gender-variant individuals through peer support, systemic advocacy, and professional education. By bridging the gap between the community and institutional frameworks, we work to ensure legal rights, accessible healthcare, and a society that fosters safety and self-determination for all gender identities.",
        social: {
          website: "http://kolektirv.hr",
          facebook: "https://www.facebook.com/kolekTIRV",
          tiktok: "https://www.tiktok.com/@kolektirv",
          instagram: "https://www.instagram.com/kolektirv",
        },
      }),
      memberFromFile("croatia", "LGBT Centar Split.png", {
        description:
          "LGBT centar Split je društveno-kulturni centar LGBTIQ zajednice splitske aglomeracije, kojim se promoviraju vrijednosti inkluzivnosti, tolerancije, nenasilja, antifašizma i queerfeminizma. ",
        social: {
          website: "https://lgbtcentarsplit.org/",
          facebook: "https://www.facebook.com/lgbtcentarsplit",
          instagram: "https://www.instagram.com/lgbt_centar_split/",
        },
      }),
      memberFromFile("croatia", "queerANarchive.png", {
        name: "queerANarchive",
        description:
          "queerANarchive is a non-governmental organization based in Split, Croatia, active since 2013 (with informal beginnings in 2010), dedicated to the development, research, and critical exploration of queer culture. The organization works at the intersection of contemporary art, cultural production, education, and community advocacy, with a strong focus on LGBTIQ+ participation in cultural and social life. Through year-round programs including exhibitions, workshops, film production, festivals, and youth initiatives, queerANarchive creates safer, inclusive spaces for artistic expression and collective engagement. As part of its programmatic work, the organization co-manages the LGBT Center Split in collaboration with partner organizations, where it carries out advocacy, community support, and capacity-building activities at the local level.",
        social: {
          website: "https://queeranarchive.hr/",
          instagram: "https://www.instagram.com/queeranarchive/?hl=en",
        },
      }),
      memberFromFile("croatia", "QueerSport.png", {
        description:
          "Queer Sport organizes recreational sport activities for LGBTQIA+ people, including yearly international tournament Queer Sport Weekend. The association also organizes cultural and social activities like bookclub, movie nights, theater nights, board games in Zagreb, as well as psychological support in Split.",
        social: {
          website: "hr.qsport.info",
          facebook: "https://www.facebook.com/qSPORT.info/",
          instagram: "https://www.instagram.com/queer_sport_zagreb/",
        },
      }),
      memberFromFile("croatia", "TMB.png", {
        name: "Trans Network Balkan",
        description:
          "Trans Network Balkan (TMB) is a regional organization founded in 2014 with the aim of building a strong TIRV (trans, intersex, and gender-variant) community and its allies across the Balkans. Since its establishment, TMB has connected eight countries: Albania, Bosnia and Herzegovina, Montenegro, Croatia, Kosovo, North Macedonia, Serbia, and Slovenia. TMB is part of a broad front of resistance - anti-fascist, feminist, and decolonial - and supports the united dismantling of systems of oppression and exploitation. With this goal, TMB stands shoulder to shoulder with local communities, organizations, and individuals.",
        social: {
          website: "https://transbalkan.org/",
          instagram: "https://www.instagram.com/transmrezabalkan/",
          facebook: "https://www.facebook.com/transbalkan",
        },
      }),
      memberFromFile("croatia", "ZagrebPride.png", {
        description:
          "Zagreb Pride is a civil society organization dedicated to advancing the rights, visibility, and well-being of LGBTIQ people in Croatia through public advocacy, community support, and cultural activism. We organize the annual Zagreb Pride March, run public awareness initiatives, and provide direct support through Rozi megafon, which offers legal counsel, psychosocial support, and peer-to-peer assistance. Our work promotes equality, inclusion, and social change across Croatian society.",
        social: {
          website: "https://zagreb-pride.net/",
          instagram: "https://www.instagram.com/zagrebpride/",
          facebook: "https://www.facebook.com/zagrebpride",
          twitter: "https://twitter.com/zagrebpride?lang=en",
          bluesky: "https://bsky.app/profile/zagreb-pride.net",
        },
      }),
    ],
  },
  {
    countryCode: "KS",
    countryName: "Kosovo",
    members: [
      memberFromFile("kosovo", "CEL Kosova.png", {
        description:
          "CEL Kosova is a human rights organization working to promote equality and protect the rights of LGBTIQ+ persons in Kosovo. Through advocacy, capacity building, and direct legal and psychological support, the organization addresses discrimination, violence, and barriers to social and economic inclusion. CEL Kosova works with communities and institutions to contribute to a more inclusive and rights-based society.",
        social: {
          website: "https://cel-ks.org/",
          facebook: "https://www.facebook.com/cel.kosovo",
          instagram: "https://www.instagram.com/cel_kosova/",
          linkedin: "https://www.linkedin.com/company/cel-kosova/",
        },
      }),
      memberFromFile("kosovo", "CSGD.png", {
        description:
          "The Center for Social Group Development (CSGD) is a Kosovo-based civil society organization working to advance human rights, LGBTIQ+ rights, social inclusion, and equality, with a particular focus on LGBTIQ+ communities. Since its establishment, CSGD has combined advocacy, community empowerment, research, and service provision to address discrimination, promote health and wellbeing, and strengthen institutional accountability.",
        social: {
          website: "https://www.csgd-ks.org/",
          instagram: "https://www.instagram.com/csgdkos",
          facebook: "https://www.facebook.com/csgdkos",
        },
      }),
    ],
  },
  {
    countryCode: "MK",
    countryName: "North Macedonia",
    members: [
      memberFromFile("macedonia", "Egal Skopje.png", {
        description:
          "The association strives to protect all persons, regardless of their sexual orientation and sexual behavior, gender identity and/or gender expression, from sexually transmitted infections, by enabling them unhindered and equal access to comprehensive counselling, education and other support for the exercise of their sexual and reproductive rights and the achievement of good sexual and reproductive health.",
        social: {
          website: "https://www.egal.mk",
          facebook: "https://www.facebook.com/egalmk/",
          instagram: "https://www.instagram.com/egalmk/",
        },
      }),
      memberFromFile("macedonia", "HERA.png", {
        description:
          "HERA - Health Education and Research Association, founded in 2000, is a civil society organization dedicated to advancing health and social policies in North Macedonia. HERA works to ensure equal access to health services and information for all, with a focus on young people, women, Roma communities, and other vulnerable groups, through education, advocacy, and direct health and psychosocial services.",
        social: {
          website: "https://hera.org.mk/",
          facebook: "https://www.facebook.com/hera.macedonia/",
          instagram: "https://www.instagram.com/heramladi/",
        },
      }),
      memberFromFile("macedonia", "Helsinki Committee.png", {
        name: "Helsinki Committee for Human Rights - Skopje",
        description:
          "The Helsinki Committee for Human Rights - Skopje works to protect human rights, promote equality, and combat discrimination through legal aid, monitoring, advocacy, and public engagement. The organization has a strong focus on supporting marginalized groups, including LGBTQI+ persons, and advancing accountability, rule of law, and social justice.",
        social: {
          website: "https://www.mhc.org.mk",
          instagram: "https://www.instagram.com/helsinki_committee/",
          facebook: "https://www.facebook.com/MacedonianHelsinkiCommittee",
        },
      }),
      memberFromFile("macedonia", "KoalicijaMargini.png", {
        name: "Coalition MARGINS Skopje",
        description:
          "Coalition Margins is a civil society organization in North Macedonia working to advance the human, sexual, and health rights of marginalized communities. Through advocacy, research, community engagement, and strategic partnerships, the Coalition promotes equality, non-discrimination, and inclusive public policies, with a strong focus on LGBTI people, sex workers, people who use drugs, people living with HIV, and marginalized women.",
        social: {
          website: "https://coalition.org.mk/?lang=en",
          facebook: "https://www.facebook.com/CoalitionMargins",
          instagram: "https://www.instagram.com/coalitionmargins/",
        },
      }),
      memberFromFile("macedonia", "LGBTI Jadro Strumica.png"),
      memberFromFile("macedonia", "LGBTISupportCentre.png", {
        name: "LGBTI Support Centre",
        description:
          "The LGBTI Support Centre was founded in 2012 as a subsidiary of the Helsinki Committee for Human Rights – Skopje, in response to the need for safe, community-based support and advocacy for LGBTI people in North Macedonia. Our vision is a society free from discrimination where all people enjoy universal human rights and freedoms, regardless of sexual orientation, gender identity, or any other trait. Our mission is to strengthen the LGBTI community for self-advocacy and to advance the social and legal status of LGBTI people in the Republic of North Macedonia through direct support services, community programming, and strategic advocacy.",
        social: {
          website: "https://www.safehouse.mk",
          facebook: "https://www.facebook.com/safehousesk",
          instagram: "https://www.instagram.com/safehouse.sk/",
        },
      }),
      memberFromFile("macedonia", "LGBT United.png"),
      memberFromFile("macedonia", "LezFem.jpg", {
        name: "LezFem",
        description:
          "LezFem is a lesbian-feminist group that creates space for connection, reflection, and collective action among women and lesbians in North Macedonia. Grounded in lived experience, the group works to amplify feminist voices and challenge inequality.",
        social: {
          website: "http://lgbti.mk/lezfem/",
          instagram: "https://www.instagram.com/lezfem/",
        },
      }),
      memberFromFile(
        "macedonia",
        "Nacionalna Mreža Protiv Homofobija i Transfobija.png",
        {
          name: "National Network Against Homophobia and Transphobia",
          description:
            "NMHT consists of organisations and individuals working to promote, support, and advance the rights of the LGBTI community in North Macedonia.",
          social: {
            facebook: "https://www.facebook.com/lgbtimreza/",
          },
        },
      ),
      memberFromFile("macedonia", "QueerCenterSkopje.png", {
        name: "Skopje Queer Center",
        description:
          "Skopje Queer Center: Offering Free Psychosocial and Legal Support for LGBTI+ Individuals. Engaged in Research, Evidence Gathering, Community Strengthening, Advocacy, and Policy Influence to Advance Human Rights for the LGBTI+ Community in North Macedonia.",
        social: {
          website: "https://skc.mk",
          facebook: "https://www.facebook.com/kvircentar",
          instagram: "https://www.instagram.com/kvircentar",
          twitter: "https://x.com/kvircentar",
          youtube: "https://www.youtube.com/@kvircentar",
        },
      }),
      memberFromFile("macedonia", "Queer Square Skopje.png", {
        name: "Queer Square",
        description:
          "QUEER SQUARE is a non-profit, non-partisan NGO working through cultural and media activism to advance the human rights and social position of LGBTI+ people in North Macedonia.",
        social: {
          website: "https://www.qs.mk",
          instagram: "https://www.instagram.com/queersquaremk/",
          facebook: "https://www.facebook.com/queersquaremk/",
        },
      }),
      memberFromFile("macedonia", "STAR.png", {
        name: "STAR-The First Sex Workers Collective in the Balkans",
        description:
          "The Association for Support of Marginalized Workers STAR-STAR Skopje was founded in 2010 and is in actual fact a form of self-organized sex workers’ community in the Balkans and is one of a kind in the Republic of North Macedonia. Recognized as STAR – The First Sex Workers Collective in the Balkans, for more than 10 years STAR-STAR’s goal is to advocate for and promote sex workers’ rights within the state social, healthcare and legal system.",
        social: {
          website: "https://starsexwork.org/",
          instagram: "https://www.instagram.com/star_mkd/",
          facebook: "https://www.facebook.com/starsexwork",
          youtube: "https://www.youtube.com/@star_mkd",
        },
      }),
      memberFromFile("macedonia", "Transforma.png", {
        name: "TransFormA",
        description:
          "TransFormA is a community-led initiative based in North Macedonia, working to advance the human rights, visibility, and wellbeing of trans and gender diverse people. The initiative provides free legal aid, psychosocial support, and community-based activities, and actively engages in advocacy, education, and cooperation with regional, European, and international partners.",
        social: {
          website: "https://transforma.mk/en/",
          facebook: "https://www.facebook.com/transformamk/",
          instagram: "https://www.instagram.com/___transforma___/?hl=en",
        },
      }),
      memberFromFile("macedonia", "WomensAlliance.png", {
        name: "Women's Alliance",
        description:
          "Women’s Alliance is the first lesbian and feminist NGO dedicated to promoting and protecting the human rights of the LGBTI+ community in North Macedonia, guided by the principles of equality, diversity, and non-discrimination. The organization works to combat hate speech, violence, and discrimination based on sexual orientation, gender identity, and gender expression, while advocating for legal reforms and greater social inclusion of LGBTI+ people.",
        social: {
          website: "https://www.womensalliance.mk",
        },
      }),
    ],
  },
  {
    countryCode: "ME",
    countryName: "Montenegro",
    members: [
      memberFromFile("montenegro", "CeMi.png", {
        name: "Centre for Monitoring and Research",
        description:
          "Centre for Monitoring and Research (CeMI) is an independent, non-partisan, non-profit organization founded in Montenegro in 2000, dedicated to strengthening democracy, the rule of law, and institutional integrity. Through election observation, public policy research, and advocacy in the areas of electoral reform, judicial reform, anti-corruption, human rights and social cohesion, CeMI transforms research and monitoring into concrete recommendations that support democratic reforms and accountable institutions. CeMI is a leading election observation organization in Montenegro and an active member of international and regional networks, cooperating closely with domestic institutions, civil society, and international partners.",
        social: {
          website: "https://cemi.org.me/me",
          instagram: "https://www.instagram.com/cemi_me/",
          facebook: "https://www.facebook.com/CeMIMontenegro/",
          twitter: "https://x.com/CeMI_ME",
          linkedin:
            "https://www.linkedin.com/in/centar-za-monitoring-i-istra%C5%BEivanje-cemi-a79048343/?originalSubdomain=me",
          youtube: "https://www.youtube.com/@CentarZaMonitoring",
          tiktok: "https://www.tiktok.com/@cemi_me?lang=en",
        },
      }),
      memberFromFile("montenegro", "Juventas.png", {
        description:
          "Juventas is a non-governmental organization founded on January 29, 1996, in Podgorica. That year, a group of students funded by the Open Society Institute of Montenegro launched the Juventas Youth Magazine. The goal was to create a media platform dedicated to the ideas, interests, and challenges of young people. Today's Juventas grew out of this initiative and was initially known as the Juventas Youth Cultural Center. By the year 2000, the organization had implemented numerous projects aimed at increasing youth influence on decision-making processes critical to their present and future. Juventas published its own magazine and briefly operated a daily newspaper, as well as radio and TV programs recognized and followed by young people. The organization built a volunteer network and implemented key initiatives in the areas of conflict resolution, dialogue, tolerance, culture, and media. In 2001, Juventas redirected its focus toward a neglected issue in Montenegrin society—sexual and reproductive health of young people. Two years later, it became a member of the Republican HIV Commission. By 2004, sexual and reproductive health workshops had reached 30% of high school classrooms across Montenegro. By 2005, there was a noticeable shift in the awareness and actions of public institutions regarding healthy lifestyles among youth and Juventas began focusing more on socially marginalized groups, offering them direct support: LGBTIQ+ individuals, people in prison and the ones formerly incarcerated, people doing sex work, people who use/inject drugs, Roma and Egyptian community, asylum seekers, and people under international protection, taking special care of the intersectionality. Since 2006, Juventas has been one of the key implementers of HIV/AIDS and other sexually transmitted and blood bourn infections’ programs reaching about 1,500 people on an annual basis. This program is still implemented thanks to  our  continuing efforts to make these services  needs driven and sustainable. In 2016, marking its 20th anniversary, Juventas redefined its mission and vision and restructured its core programs. In the second half of that year, after meeting all the necessary criteria, Juventas obtained its ISO 9001:2015 (QMS) certification. Today, the organization provides direct assistance, works to improve the quality of services, produces and advocates laws/strategies/policy adoption and amendments, builds the capacities of decision-makers and service providers, and empowers its target groups.",
        social: {
          website: "https://juventas.me/",
          twitter: "https://x.com/NVOJuventas",
          facebook: "https://www.facebook.com/nvo.juventas.3",
          instagram: "https://www.instagram.com/nvo.juventas/",
          linkedin: "https://www.linkedin.com/company/juventas/",
        },
      }),
      memberFromFile("montenegro", "QueerMontenegro.png", {
        description:
          "Queer Montenegro is a grassroot and feminist organization dedicated to promoting and protecting the human rights of LGBTIQ+ persons in Montenegro. Through advocacy, education, public events, and direct support services, we work to increase visibility, strengthen community resilience, and advance social and legal equality.",
        social: {
          website: "https://www.queermontenegro.org/?locale=sr",
          instagram: "https://www.instagram.com/queermne/",
          facebook: "https://www.facebook.com/Queer.Montenegro/",
          twitter: "https://x.com/QueerMontenegro",
        },
      }),
      memberFromFile("montenegro", "Spektra.png", {
        name: "Association Spectra",
        description:
          "Association Spectra is a feminist NGO established in 2017 in Podgorica, Montenegro, dedicated to supporting the transgender, gender-diverse, and intersex (TIGV) community. Our mission is to promote gender equality, human rights, and social acceptance for LGBTIQ+ individuals through advocacy, support services, and specialized healthcare access. We also work to raise public awareness and educate institutions and media on the safety and protection of the TIGV community.",
        social: {
          website: "https://www.asocijacijaspektra.org/",
          instagram: "https://www.instagram.com/asocijacija.spektra/",
          facebook:
            "https://www.facebook.com/asocijacija.spektra/?locale=sr_RS",
          twitter: "https://x.com/nvospektra",
        },
      }),
      memberFromFile("montenegro", "Stana.png"),
    ],
  },
  {
    countryCode: "RS",
    countryName: "Serbia",
    members: [
      memberFromFile("serbia", "CRPC.png", {
        name: "Crisis Response and Policy Centre",
        description:
          "The Crisis Response and Policy Centre (CRPC) is a Belgrade-based civil society organization dedicated to protecting human rights and fostering social inclusion for refugees, asylum seekers, LGBTQIA+ persons, and other vulnerable groups. Through direct support, advocacy, education, and community engagement, CRPC promotes equality, dialogue, and inclusive practices across Serbia and the region.",
        social: {
          website: "https://www.crpc.rs",
          facebook: "https://www.facebook.com/CRPCngo/",
          instagram: "https://www.instagram.com/crpc_ckpr/",
        },
      }),
      memberFromFile("serbia", "Crvena linija.png", {
        name: "Red Line",
        description:
          "Crvena linija is a non-govermental organization working with young people, people living with HIV, and same-sex–oriented persons to promote health, human rights, and empowerment. Through its NS CheckPoint Center, it provides free and anonymous HIV and Hepatitis testing, counseling, and education, in close cooperation with health institutions and civil society partners.",
        social: {
          website: "https://www.crvenalinija.org",
          instagram: "https://www.instagram.com/udruzenje_crvenalinija/",
          facebook: "https://www.facebook.com/crvenalinija/",
        },
      }),
      memberFromFile("serbia", "Da se zna.png", {
        name: "Association Da se zna!",
        description:
          "Association Da se zna! is a civil society organization in Serbia dedicated to mapping and documenting hate-motivated incidents against LGBT+ persons, as well as providing legal and psychological support to survivors of such incidents. In addition, Da se zna! implements educational programs aimed at both the queer community and the general public, and works consistently to advocate for improved access to justice and stronger institutional protection of LGBT+ people.",
        social: {
          website: "https://www.dasezna.lgbt/",
          instagram: "https://www.instagram.com/dasezna.lgbt/",
          facebook: "https://www.facebook.com/dasezna.lgbt/",
          twitter: "https://x.com/dasezna?s=20",
          tiktok:
            "https://www.tiktok.com/@dasezna?is_from_webapp=1&sender_device=pc",
        },
      }),
      memberFromFile("serbia", "EGAL.png", {
        description:
          "Egal is an organization dedicated to providing support, protection, and empowerment to LGBTIQ+ persons who have experienced violence and discrimination. The organization works closely with the community to offer psychosocial support and advocacy, while also promoting equality, solidarity, and social inclusion through community-based initiatives.",
        social: {
          facebook: "https://www.facebook.com/EgalBeograd/",
          instagram: "https://www.instagram.com/egal_lgbti/",
          twitter: "https://x.com/egal_nvo",
        },
      }),
      memberFromFile("serbia", "FemSlam.png", {
        name: "FemSlam",
        description:
          "FemSlam is an informal football initiative empowering LBTQ women through sport. As a women’s* football team and collective, it explores the intersections of gender, sport, and LGBTIQ issues through creative and activist approaches.",
        social: {
          facebook: "https://www.facebook.com/FemSlamFootball/",
        },
      }),
      memberFromFile("serbia", "Geten.png", {
        description:
          "Geten was founded in 2001, at a time when there was no LGBTIQ movement but levels of misogyny, homophobia and transphobia in a country torn by the wars and socio-economic crisis were extremely high. Geten appeared as the first and only all-inclusive organization based on intersectional and feminist principles, so the grass roots level, building, mobilizing and empowering the community has been of utmost importance. Geten is the first inclusive organization in Serbia (2001) and has pioneered in the ex-Yugoslavian region in the area of gender identity and advancing especially the rights of trans, intersex and queer/gender non-conforming people and has received 4 international awards for its work. Geten was the first organization in Serbia to create intersectional programs to tackle intersectional issues of racism and homo/bi/transphobia – Roma LGBTIQ. Our work has been designed as multi-leveled, intersectional and holistic, encompassing: providing direct support to community members, free legal and psycho-social support through different services (LGBTIQ SOS Helpline, professional therapy and counselling, support groups), community building, monitoring and reporting violence and discrimination, research, advocacy, campaigning, legal and policy work, media activism, publishing, translating, art and culture. Geten has contributed to various law and legislative changes, including: Law on Prohibition of Discrimination (2009), Law on Health Insurance (significant for trans persons, especially), Law on Police (2016), and 16 more laws and various institutional policies, including creating and advocating for the Model Law on Gender Identity and the Rights of Intersex Persons, based solely on self-determination.",
        social: {
          website: "https://www.transserbia.org",
          facebook: "https://www.facebook.com/GetenLGBTIQA/",
          twitter: "https://twitter.com/GetenLGBTIQA",
          instagram: "https://www.instagram.com/geten_lgbtiqa/",
          youtube: "https://www.youtube.com/channel/UCV_ibxU772Uu0BLXXYAI4vQ",
        },
      }),
      memberFromFile("serbia", "GLIC.png", {
        name: "Gay Lesbian Info Center",
        description:
          "Strengthening and building the LGBT community through information, creating LGBT media and organizing cultural and artistic events.",
        social: {
          website: "https://gayecho.com",
        },
      }),
      memberFromFile("serbia", "Izađi.png", {
        name: "Group COME OUT",
        description:
          "The Group COME OUT is an organization dedicated to supporting LGBTI+ people, with a primary focus on youth, their families, close social circles, and professionals working with youth.Since its founding in 2010, formal registration in 2013, and the opening of its first community center in 2018, the organization has developed four core program areas: work with LGBTI + youth, psychological counseling, education for inclusion and work with LGBTI + adults.Today, Group 'COME OUT' operates its own community center open from Wednesday to Saturday from 5PM till 10 PM and runs a psychological counseling service for LGBTI + youth supported by 35 volunteer counselors, for now.",
        social: {
          website: "https://izadji.rs/",
          instagram: "https://www.instagram.com/grupaizadji/",
          facebook: "https://www.facebook.com/grupaIZADJI/",
          linkedin:
            "https://www.linkedin.com/company/grupaizadji/posts/?feedView=all",
        },
      }),
      memberFromFile("serbia", "Labris.png", {
        name: "Labris - Lesbian Human Rights Organization",
        description:
          "Labris is a lesbian feminist non-profit civil society organization, founded with the aim of promoting lesbian human rights and lesbian visibility in society. Labris is an organization that considers the right to a diverse sexual orientation to be one of the fundamental human rights and works toward the elimination of all forms of violence and discrimination against lesbians.",
        social: {
          instagram: "https://www.instagram.com/labris_beograd/",
          facebook: "https://www.facebook.com/labris.beograd/",
          linkedin:
            "https://www.linkedin.com/company/labris-org-rs/posts/?feedView=all",
        },
      }),
      memberFromFile("serbia", "LCommunio.png", {
        name: "L*-Communio",
        description:
          "L*Communio is non-profit NGO working on improving human rights and focused on promoting and protecting the rights of lesbians, bisexual women, trans women, non-binary and intersex persons. Our vision emphasizes equal participation in all segments of society, raising the visibility of LBTIQ women (lesbians*), strengthening and networking with organizations similar to ours in Serbia and abroad in order to create a united front with sister organizations in advocating for our rights and affect the decision making processes.",
        social: {
          instagram: "https://www.instagram.com/l_communio/",
          facebook: "https://www.facebook.com/share/1Liq6b466X",
        },
      }),
      memberFromFile("serbia", "Potent.png", {
        name: "National Center for Sexual and Reproductive Health - Potent",
        description:
          "Potent is a Serbian NGO working to advance sexual and reproductive health and HIV prevention through community-based services, education, and advocacy. The organization focuses on improving access to testing, prevention tools, and stigma-free healthcare for LGBTQI+ people and other marginalized communities.",
        social: {
          website: "https://potent.org.rs/",
          instagram: "https://www.instagram.com/potent_rs/",
          tiktok: "https://www.tiktok.com/@potent_rs/",
          facebook: "https://www.facebook.com/potent.udruzenje/",
        },
      }),
      memberFromFile("serbia", "Praxis.png", {
        name: "NGO Praxis",
        description:
          "Praxis is a national non-governmental organization based in Belgrade, Serbia, dedicated to protecting and promoting human rights. Since 2004, Praxis has provided free legal aid, conducted research, and advocated for systemic changes to ensure equal access to rights for marginalized and socially excluded communities. Through its work in the fields of status and socioeconomic rights, anti-discrimination, gender equality, migration, and child rights, Praxis empowers individuals and strengthens civil society.",
        social: {
          website: "https://www.praxis.org.rs",
          instagram: "https://www.instagram.com/ngopraxis/",
          facebook: "https://www.facebook.com/ngopraxis/",
          twitter: "https://x.com/NGO_Praxis/",
          linkedin: "https://www.linkedin.com/company/ngo-praxis-serbia/",
          youtube: "https://www.youtube.com/user/praxisyt/",
        },
      }),
      memberFromFile("serbia", "PRIMUS.png", {
        description:
          "PRIMUS's core mission is the promotion of human rights, health care, and social services for LGBTIQ+ people, and multiple vulnerable populations including people living with HIV/AIDS, users of psychoactive substances, and sex workers. This is achieved through reducing violence and discrimination and providing education and support.",
        social: {
          website: "https://www.primus.org.rs",
          instagram: "https://www.instagram.com/primus.rs/",
          facebook: "https://www.facebook.com/primusrazvojnicentar/",
          twitter: "https://x.com/PrimusCentar/",
        },
      }),
      memberFromFile("serbia", "RainbowIgnite.png", {
        name: "Rainbow Ignite",
        description:
          "Rainbow Ignite is a civil society organization based in Serbia that empowers LGBTIQ+ communities through advocacy, research, education, cultural initiatives, and community-led action. We work to strengthen political participation, economic inclusion, gender equality, and the preservation of queer history, advancing a more just, inclusive, and equitable society.",
        social: {
          website: "https://www.rainbowignite.org",
          instagram: "https://www.instagram.com/rainbow_ignite/",
          facebook: "https://www.facebook.com/rainbow.ignite",
        },
      }),
      memberFromFile("serbia", "reGeneracija.png", {
        name: "NGO Re Generation",
        description:
          "NGO Re Generation is primarily working in the field of harm reduction in the nightlife settings, tackling issues of safer drug use, safety, chemsex and peer to peer counceling related to drug use, gender based violence and chemsex.",
        social: {
          website: "https://www.regeneracija.org",
          instagram: "https://www.instagram.com/ngo_regeneration/",
          facebook: "https://www.facebook.com/NVOReGeneration/",
        },
      }),
      memberFromFile("serbia", "RromnjakoIlo.png", {
        name: "Rromnjako Ilo",
        description:
          "We brake sexual taboos among Roma women and supports them to come out and accept their sexuality and identities. We build their resilience to exclusion, discrimination and violence to fullfill the mission: Roma women of different sexual orientation and identities are recognized in the community and the society.",
        social: {
          website: "https://rromnjakoilo.org.rs/",
          instagram: "https://www.instagram.com/romnjako_ilo2007/",
        },
      }),
      memberFromFile("serbia", "TalasTIRV.png", {
        description:
          "Kolektiv Talas TIRV (eng. Collective Wave TIGV) started as an informal group in mid-2020, and we have been formally registered since July 2021. We are the only trans-led organization in Serbia.  Our mission is to build a strong, organized, empowered, and inclusive TIGV community in Serbia because we firmly believe that only a movement that is rooted in the community can sustainably provide psychological, social, legal, economic, and educational support to its members, as well as successfully fight and resist the growing transphobia. We are addressing the problems of the TIGV community using a broader intersectional-feminist approach and by applying mechanisms that protect gender equality, and respect different identities and their freedom of expression.",
        social: {
          website: "https://talas.org.rs",
          instagram: "https://www.instagram.com/talas.tirv/",
          facebook: "https://www.facebook.com/talas.tirv/",
        },
      }),
      memberFromFile("serbia", "XY Spectrum.png", {
        description:
          "XY Spectrum was founded in 2017 in Belgrade. It is committed to promote the rights of intersex and trans people and their families, improving their position and quality of life.",
        social: {
          website: "https://www.xyspectrum.org",
          linkedin:
            "https://www.linkedin.com/company/xy-spectrum/?original_referer=https%3A%2F%2Fmail.google.com%2F",
          instagram: "https://www.instagram.com/xy.spectrum/",
          facebook: "https://www.facebook.com/xyspectrum ",
          youtube: "https://www.youtube.com/channel/UChZwErtvGLaG6mTtS7pGeFg",
        },
      }),
    ],
  },
  {
    countryCode: "SI",
    countryName: "Slovenia",
    members: [
      memberFromFile("slovenia", "DrustvoDIH.png", {
        name: "Association DIH - Equal Under the Rainbow",
        description:
          "DIH – Equal Under the Rainbow is a Slovenian non-profit organisation working to empower queer individuals and communities through advocacy, education, community-based programmes, and the promotion of safe sex practices. We promote equality, inclusion, and well-being across generations by creating safe spaces, strengthening visibility, and advancing queer rights at local, national, and European levels.",
        social: {
          website: "https://dih.si/",
          instagram: "https://www.instagram.com/drustvodih/",
          facebook: "https://www.facebook.com/drustvodih/?locale=sl_SI",
        },
      }),
      memberFromFile("slovenia", "LEGEBITRA.png", {
        name: "Legebitra Association",
        description:
          "By continuously providing accessible, confidential and professional services, we provide support and empowerment for individuals, LGBT community, and people with HIV. Through advocacy, we contribute to improving legal protection, to increasing the visibility of LGBT people and understanding the position of people with HIV. By raising awareness of the general and professional public, we contribute to changing of attitudes towards our target groups. With all our activities, we are building a society where every identity is legitimate.",
        social: {
          website: "https://legebitra.si/",
          instagram: "https://www.instagram.com/drustvo.legebitra/",
          facebook: "https://www.facebook.com/Legebitra",
          linkedin: "https://www.linkedin.com/company/legebitra/",
          bluesky: "https://bsky.app/profile/legebitra.bsky.social",
        },
      }),
      memberFromFile("slovenia", "Moja Mavrica.png", {
        name: "Moja mavrica Institute",
        description:
          "The Moja mavrica Institute is a non-governmental, non-profit organization that focuses on community support for marginalised individuals (specifically LGBTQ+ people, people who struggle with mental health, neurodiverse people and the intersections of those groups) through psychosocial and peer counseling, career orientation, street campaigns and field work, addressing safety in public spaces, intercultural activities, non-formal learning, healthy lifestyle, ecofeminism, suicide prevention and the organization of volunteer work. We operate on the principles of social work and regularly collaborate with the University of Ljubljana as well as civil society organisations from Slovenia and abroad. Through our comprehensive approach (combining direct community engagement, educational initiatives, research, and advocacy) we provide a structured, supportive, and evidence-based environment that promotes the resilience and mental well-being of our target groups.",
        social: {
          website: "https://mojamavrica.si/",
          instagram: "https://www.instagram.com/mojamavrica/",
        },
      }),
      memberFromFile("slovenia", "SkucLL.jpg", {
        name: "Lesbian Section ŠKUC-LL ",
        description:
          "ŠKUC LL is the only lesbian organization in Slovenia and one of the oldest in Europe, founded in 1987. A grassroots NGO, it advances lesbian, feminist, and queer politics through cultural production, activism, publishing, media, and community spaces, playing a key role in shaping LGBTIQ culture, visibility, and rights in Slovenia.",
        social: {
          website: "https://skuc-ll.si/about/english/",
          facebook:
            "https://www.facebook.com/p/Sekcija-ŠKUC-LL-100064511027345",
        },
      }),
      memberFromFile("slovenia", "SkucMagnus.png", {
        name: "ŠKUC Magnus",
        description:
          "MAGNUS is a gay section at ŠKUC (Students Cultural Centre). It was founded in 1984 as the Cultural Organisation for Socialisation of Homosexuality. Its first and most important roles were organising the MAGNUS Festival with a wide variety of activities to make an acceptable homosexual lifestyle.",
        social: {
          facebook: "https://www.facebook.com/MagnusSKUC/",
        },
      }),
      memberFromFile("slovenia", "TransAkcija.png", {
        name: "Transfeminist Initiative TransAkcija",
        description:
          "Transfeminist Initiative TransAkcija is a non-governmental organization that works to support trans+ people in Slovenia. The organization is based in Ljubljana. In addition to its monthly activities, TransAkcija also offers support services for trans+ and gender-diverse people, and educational programs for professionals. TransAkcija also strives for systemic changes in the field of human rights for trans+ and gender-diverse people in Slovenia, with an emphasis on regulating legal gender recognition and ensuring adequate healthcare.",
        social: {
          website: "https://transakcija.si",
          instagram: "https://www.instagram.com/transakcija",
          facebook: "https://www.facebook.com/transakcija",
          linktr: "https://linktr.ee/transakcija",
        },
      }),
    ],
  },
  {
    countryCode: "TR",
    countryName: "Türkiye",
    members: [
      memberFromFile("turkey", "7 Renk.png"),
      memberFromFile("turkey", "FreeColors.png", {
        name: "Free Colors Association",
        description:
          "The Free Colours Association is an LGBTI+ organisation that carries out its work through four main programmes: Support/Empowerment, Advocacy, Culture-Arts, and Capacity Building. The association provides counselling services to LGBTI+ individuals living in Bursa and surrounding provinces; it conducts monitoring and advocacy work at the local level. It also aims to strengthen the expressive spaces of LGBTI+ individuals through art and to support inclusive cultural production. The association's sphere of influence is continuously being developed through its work focused on institutional sustainability.",
        social: {
          website: "https://www.ozgurrenklerizler.org/",
          facebook: "https://www.facebook.com/ozgurrenklerdernegi",
          instagram: "https://www.instagram.com/ozgurrenkler",
          twitter: "https://x.com/ozgurrenkler",
          linkedin: "https://www.linkedin.com/company/ozgurrenkler/",
        },
      }),
      memberFromFile("turkey", "Galader.png", {
        name: "Ankara Rainbow Families Association",
        description:
          "GALADER is an association established to foster solidarity among parents and relatives of LGBT+ individuals and to raise awareness about LGBT+ issues within society.",
        social: {
          website: "https://www.galader.org",
          twitter: "https://x.com/galadernegi",
          instagram: "https://www.instagram.com/galadernegi",
        },
      }),
      memberFromFile("turkey", "Genc.png", {
        name: "Young LGBTI+ Association",
        description:
          "Young Lesbian Gay Bisexual Trans Intersex Youth Studies and Solidarity Association (short name Young LGBTI+ Association) was established in İzmir in 2016 with the aim of researching the problems of LGBTI+ youth, bringing these problems to the agenda, offering solutions and opening spaces for LGBTI+ youth to express themselves. Works for the right to access basic needs such as shelter, education and health, youth rights, sexual rights, social activities, rights advocacy, fight against hate crimes and peer support define the basic field of activity of the association. Although LGBTI+ Youth constitute the primary working area of ​​the association, issues related to the LGBTI+ movement are also included in its working area, and people of all age groups can take part in the activities of the association and benefit from the services of the association.",
        social: {
          website: "https://genclgbti.org/en/",
          instagram: "https://www.instagram.com/genclgbti/",
          facebook: "https://www.facebook.com/genclgbti/",
        },
      }),
      memberFromFile("turkey", "HEVİ LGBTİ.png", {
        name: "Association of Lesbian, Gay, Bisexual, Transsexual and Intersexual for Justice, Equality and Existence",
        description:
          "Our mission is to defend the right to life and the human rights of minority, Kurdish, and refugee LGBTIQ+ persons and to advocate for their equal and fair access to social rights. We focus on addressing the intersecting issues of class, ethnicity, sexism, migrant and refugee rights, and broader freedoms. HEVI is a self-organization that emerged from the grassroots, bringing together diverse LGBTIQ+ voices—Kurdish, Armenian, Arab, Turkish, Roma, Alevi, Christian, and many more—and producing policies that address their unique needs and experiences.",
        social: {
          website: "https://hevilgbti.org/",
          twitter: "https://x.com/HeviLgbt",
          instagram: "https://www.instagram.com/hevilgbti/",
          linkedin:
            "https://www.linkedin.com/company/hevi%CC%87-lgbti%CC%87-derne%C4%9Fi/",
        },
      }),
      memberFromFile("turkey", "Istanbul Pride.png", {
        description:
          "Istanbul Pride is a volunteer-led collective organizing Pride Week and the Pride March in Türkiye. Since 2015, despite bans, detentions, and increasing state pressure, Istanbul Pride has continued to organize peacefully, asserting the right to assembly and visibility for LGBTI+ communities. Through Pride Week events and the annual march, Istanbul Pride creates spaces for resistance, solidarity, joy, and collective care.",
        social: {
          instagram: "https://www.instagram.com/istanbulpride/",
        },
      }),
      memberFromFile("turkey", "İnter Dayanışma.png", {
        name: "Inter Solidarity",
        description:
          "İnter Dayanışma is the primary advocacy organization in Turkey dedicated to the human rights and bodily integrity of intersex individuals. The organization works to end non-consensual medical interventions on intersex children while providing peer support, legal advocacy, and educational resources to increase intersex visibility and social acceptance. Through community empowerment and policy reform, they strive to ensure a life of dignity and self-determination for all intersex people.",
        social: {
          website: "https://interdayanisma.org",
          instagram: "https://www.instagram.com/interdayanisma/",
        },
      }),
      memberFromFile("turkey", "Kaos.png", {
        name: "Kaos GL",
        description:
          "Kaos GL works with the slogan of “LGBTI+ (lesbian, gay, bisexual, trans, intersex and other identities) rights are fundamental human rights” and develops policies accordingly. By reporting and doing advocacy particularly in the field of hate crimes and anti-discrimination law to eliminate discrimination against LGBTI+s, to prevent human rights violations and to promote equality.",
        social: {
          website: "https://kaosgldernegi.org/",
          instagram: "https://www.instagram.com/kaosglhaber/@kaosgldernegi",
          facebook: "https://www.facebook.com/share/1FaBDFN4Ys/",
          twitter: "https://www.x.com/Kaos GL @kaosgl.org",
        },
      }),
      memberFromFile("turkey", "Lambdaistanbul.png"),
      memberFromFile("turkey", "Listag.png", {
        name: "Association of Lesbian, Gay, Bisexual, Transgender and Intersex Individuals’ Families and Allies",
        description:
          "LISTAG (LGBTI+ Families and Allies Association) is a civil society organization in Türkiye founded by families and relatives of LGBTI+ individuals. The association aims to strengthen social acceptance and contribute to the realization of equal citizenship rights through family-based support mechanisms, advocacy, and awareness-raising activities. It works to combat discrimination based on sexual orientation, gender identity, and sex characteristics.",
        social: {
          website: "https://www.listag.org /",
          instagram: "https://www.instagram.com/listagdernegi",
          facebook: "https://www.facebook.com/listagdernegi",
          twitter: "https://www.x.com/listagdernegi",
          linkedin: "https://www.linkedin.com/listagdernegi",
          bluesky: "https://bsky.app/profile/listagdernegi.bsky.social",
        },
      }),
      memberFromFile("turkey", "May17.png", {
        name: "May 17 Association",
        description:
          "The 17 May Association is a civil society organisation working to strengthen LGBTI+ people’s equal and dignified access to human rights in Türkiye. The Association provides psychosocial and legal support services, monitors and documents human rights violations, and carries out advocacy and capacity-building activities. Adopting a community-based approach, it works in close collaboration with various communities and initiatives such as 40+ Lubunya, Positive Space, Çankaya Girls, Inter Solidarity, the Poverty Working Group, and the Addiction Working Group, with the aim of expanding LGBTI+ people’s access to safe, inclusive, and solidarity-based spaces.",
        social: {
          website: "https://www.17mayis.org / en",
          facebook: "https://www.facebook.com/17mayis",
          instagram: "https://www.intagram.com/17mayisdernegi",
          twitter: "https://www.x.com/17mayisdernegi",
        },
      }),
      memberFromFile("turkey", "Muamma.png", {
        name: "Muamma Lesbian, Gay, Bisexual, Trans, Intersex Plus Education Research and Solidarity Association",
        description:
          "Muamma LGBTI+ Association is a community-based organization working to protect and support the rights, well-being, and resilience of LGBTI+ individuals in Turkey. The association provides psychosocial and peer support, combats discrimination, and strengthens community solidarity. The association focuses particularly on trans+ individuals and those facing intersecting vulnerabilities.",
        social: {
          website: "https://muammalgbti.org/",
          instagram: "https://www.instagram.com/muammalgbti",
          facebook: "https://www.facebook.com/muammalgbti",
          twitter: "https://x.com/muammaIgbti",
          linkedin:
            "https://www.linkedin.com/company/muamma-lgbti-dernefi/posts/?feedView=all",
        },
      }),
      memberFromFile("turkey", "PembeHayat.png", {
        name: "Pink Life LGBTI+ Solidarity Association",
        description:
          "Pink Life LGBTI+ Solidarity Association is Türkiye’s first trans rights and trans-led organisation, founded in 2006. Pink Life exists to combat discrimination, hate crimes, violence, and social exclusion targeting LGBTI+ people with a special focus on trans identities. Its mission is to defend trans rights through direct support, community building and advocacy, and to strengthen a movement rooted in solidarity, resilience and collective care.",
        social: {
          website: "https://www.pembehayat.org",
          instagram: "https://www.instagram.com/pembehayatlgbti",
          facebook: "https://www.facebook.com/pembehayatlgbti",
          twitter: "https://x.com/pembehayatlgbti",
          linkedin:
            "https://www.linkedin.com/company/pembehayat/posts/?feedView=all",
        },
      }),
      memberFromFile("turkey", "RedUmbrella.png", {
        name: "Red Umbrella Sexual Health and Human Rights Association",
        description:
          "Red Umbrella Sexual Health and Human Rights Association is a rights-based organization dedicated to advocating for the human rights and sexual health of sex workers in Türkiye. The association works to prevent discrimination and gender inequality while strengthening access to justice and social policies for vulnerable groups. Through advocacy, capacity building, and legal support, Red Umbrella strives to combat stigma and improve the living and working conditions of sex workers.",
        social: {
          website: "https://kirmizisemsiye.org",
          instagram: "https://www.instagram.com/kirmizisemsiyedernegi",
          facebook:
            "https://www.facebook.com/KirmiziSemsiyeCinselSaglikVeInsanHaklariDernegi",
          twitter: "https://x.com/KirmiziSemsiyeD",
          linkedin: "https://www.linkedin.com/company/kirmizisemsiye",
        },
      }),
      memberFromFile("turkey", "SPoD.png", {
        name: "Social Policy, Gender Identity and Sexual Orientation Studies Association",
        description:
          "Founded in 2011 with the dream of a fair, equal, and free world under the rainbow, SPoD provides legal, social, and psychological counseling to LGBTI+ people. In addition to running campaigns and following up cases, SPoD continues to train institutions and municipalities, mental health experts and lawyers. As SPoD, we have been conducting academic research, organizing seminars and panel discussions. We are working on election campaigns together with schools of politics and activism. We also organize advocacy meetings by forming support groups. SPoD has a dedicated network of professional staff, volunteers, and experts to carry out all these activities.",
        social: {
          website: "https://spod.org.tr",
          instagram: "https://www.instagram.com/spodlgbti",
          twitter: "https://x.com/spodlgbti",
          linkedin: "https://www.linkedin.com/company/spodlgbti",
        },
      }),
      memberFromFile("turkey", "Unikuir.png", {
        name: "University Queer Research and LGBTI+ Solidarity Association ",
        description:
          "UniKuir is a youth-led LGBTI+ civil society organisation based in Türkiye, working to make universities safer, more equal and inclusive for LGBTI+ students and youth. UniKuir monitors human rights violations in universities and carries out advocacy at both national and international levels. Through media work, legal and academic support, and capacity-building for LGBTI+ student clubs, UniKuir amplifies the voices of LGBTI+ university students and strengthens their participation.",
        social: {
          website: "https://www.unikuir.org",
          instagram: "https://www.instagram.com/unikuir",
        },
      }),
    ],
  },
];

/**
 * Resolve a public file path for next/image href (encode each segment).
 */
export function encodePublicImagePath(path) {
  if (!path || typeof path !== "string") return path;
  return `/${path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

export function getMemberWithCountryById(id) {
  for (const country of membersByCountry) {
    const member = country.members.find((m) => m.id === id);
    if (member) {
      return {
        member,
        countryName: country.countryName,
        countryCode: country.countryCode,
      };
    }
  }
  return null;
}

export function getAllMemberIds() {
  return membersByCountry.flatMap((c) => c.members.map((m) => m.id));
}
