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
      memberFromFile("serbia", "CRPC.png"),
      memberFromFile("serbia", "Crvena linija.png"),
      memberFromFile("serbia", "Da se zna.png"),
      memberFromFile("serbia", "EGAL.png"),
      memberFromFile("serbia", "FemSlam.png"),
      memberFromFile("serbia", "Geten.png"),
      memberFromFile("serbia", "GLIC.png"),
      memberFromFile("serbia", "Izađi.png"),
      memberFromFile("serbia", "Labris.png"),
      memberFromFile("serbia", "LCommunio.png"),
      memberFromFile("serbia", "Potent.png"),
      memberFromFile("serbia", "Praxis.png"),
      memberFromFile("serbia", "PRIMUS.png"),
      memberFromFile("serbia", "RainbowIgnite.png", { name: "Rainbow Ignite" }),
      memberFromFile("serbia", "reGeneracija.png"),
      memberFromFile("serbia", "RromnjakoIlo.png", { name: "Rromnjako Ilo" }),
      memberFromFile("serbia", "TalasTIRV.png"),
      memberFromFile("serbia", "XY Spectrum.png"),
    ],
  },
  {
    countryCode: "SI",
    countryName: "Slovenia",
    members: [
      memberFromFile("slovenia", "DrustvoDIH.png", { name: "Društvo DIH" }),
      memberFromFile("slovenia", "LEGEBITRA.png", { name: "Legebitra" }),
      memberFromFile("slovenia", "Moja Mavrica.png"),
      memberFromFile("slovenia", "SkucLL.jpg", { name: "ŠKUC LL" }),
      memberFromFile("slovenia", "SkucMagnus.png", { name: "ŠKUC Magnus" }),
      memberFromFile("slovenia", "TransAkcija.png"),
    ],
  },
  {
    countryCode: "TR",
    countryName: "Türkiye",
    members: [
      memberFromFile("turkey", "7 Renk.png"),
      memberFromFile("turkey", "FreeColors.png", {
        name: "Özgür Renkler Derneği (Free Colors Association)",
      }),
      memberFromFile("turkey", "Galader.png"),
      memberFromFile("turkey", "Genc.png", { name: "Genc LGBTI" }),
      memberFromFile("turkey", "HEVİ LGBTİ.png", { name: "HEVİ LGBTI+" }),
      memberFromFile("turkey", "Istanbul Pride.png"),
      memberFromFile("turkey", "İnter Dayanışma.png", {
        name: "İnter Dayanışma",
      }),
      memberFromFile("turkey", "Kaos.png", { name: "Kaos GL" }),
      memberFromFile("turkey", "Lambdaistanbul.png"),
      memberFromFile("turkey", "Listag.png"),
      memberFromFile("turkey", "May17.png", { name: "17 Mayıs" }),
      memberFromFile("turkey", "Muamma.png"),
      memberFromFile("turkey", "PembeHayat.png", { name: "Pembe Hayat" }),
      memberFromFile("turkey", "RedUmbrella.png", {
        name: "Kırmızı Şemsiye (Red Umbrella)",
      }),
      memberFromFile("turkey", "SPoD.png"),
      memberFromFile("turkey", "Unikuir.png", { name: "UniKuir" }),
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
