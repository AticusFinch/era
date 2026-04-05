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
      "Short description of the organization and its work. Edit this text.",
    website: overrides.website ?? "https://example.org",
  };
}

export const membersByCountry = [
  {
    countryCode: "AL",
    countryName: "Albania",
    members: [
      memberFromFile("albania", "AAPLWHA.jpg"),
      memberFromFile("albania", "Aleanca.png"),
      memberFromFile("albania", "OMSA.png"),
      memberFromFile("albania", "Pink.png"),
      memberFromFile("albania", "ProLGBT.png"),
      memberFromFile("albania", "Streha.png"),
    ],
  },
  {
    countryCode: "BA",
    countryName: "Bosnia and Herzegovina",
    members: [
      memberFromFile("bih", "Cure.png", { name: "Fondacija Cure" }),
      memberFromFile("bih", "TOC.png"),
      memberFromFile("bih", "Wings of Hope.png"),
    ],
  },
  {
    countryCode: "HR",
    countryName: "Croatia",
    members: [
      memberFromFile("croatia", "Domino.png"),
      memberFromFile("croatia", "Dugine obitelji.png"),
      memberFromFile("croatia", "kolekTIRV.png"),
      memberFromFile("croatia", "LGBT Centar Split.png"),
      memberFromFile("croatia", "queerANarchive.png"),
      memberFromFile("croatia", "QueerSport.png"),
      memberFromFile("croatia", "TMB.png"),
      memberFromFile("croatia", "ZagrebPride.png"),
    ],
  },
  {
    countryCode: "KS",
    countryName: "Kosovo",
    members: [
      memberFromFile("kosovo", "CEL Kosova.png"),
      memberFromFile("kosovo", "CSGD.png"),
    ],
  },
  {
    countryCode: "MK",
    countryName: "North Macedonia",
    members: [
      memberFromFile("macedonia", "Egal Skopje.png"),
      memberFromFile("macedonia", "HERA.png"),
      memberFromFile("macedonia", "Helsinki Committee.png"),
      memberFromFile("macedonia", "KoalicijaMargini.png", {
        name: "Coalition Margins",
      }),
      memberFromFile("macedonia", "LGBTI Jadro Strumica.png"),
      memberFromFile("macedonia", "LGBTISupportCentre.png", {
        name: "LGBTI Support Centre",
      }),
      memberFromFile("macedonia", "LGBT United.png"),
      memberFromFile("macedonia", "LezFem.jpg"),
      memberFromFile(
        "macedonia",
        "Nacionalna Mreža Protiv Homofobija i Transfobija.png",
        {
          name: "National Network Against Homophobia and Transphobia",
        },
      ),
      memberFromFile("macedonia", "QueerCenterSkopje.png", {
        name: "Queer Center Skopje",
      }),
      memberFromFile("macedonia", "Queer Square Skopje.png"),
      memberFromFile("macedonia", "STAR.png"),
      memberFromFile("macedonia", "Transforma.png"),
      memberFromFile("macedonia", "WomensAlliance.png", {
        name: "Women's Alliance",
      }),
    ],
  },
  {
    countryCode: "ME",
    countryName: "Montenegro",
    members: [
      memberFromFile("montenegro", "CeMi.png"),
      memberFromFile("montenegro", "Juventas.png"),
      memberFromFile("montenegro", "QueerMontenegro.png", {
        name: "Queer Montenegro",
      }),
      memberFromFile("montenegro", "Spektra.png"),
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
