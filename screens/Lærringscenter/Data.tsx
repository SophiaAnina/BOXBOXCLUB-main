import React from "react"

const Reglerarticles = [
  {
    id: 1,
    title: "Hvad er et Sprint Race i Formel 1?",
    subtitle: "Alt om sprint-formatet i Formel 1", // Added
    sections: [
      {
        id: "hvad-er-sprint",
        subtitle: "Hvad er et sprint race?",
        content: `Sprint-racet er en nyere tilføjelse til Formel 1-kalenderen og fungerer som et supplement til den traditionelle Grand Prix-weekend. Formatet blev introduceret for at tilføje ekstra spænding og konkurrence, og det ændrer strukturen på løbsweekenden markant. Et sprint race (eller "Sprint") er et kortere løb, der normalt afvikles om lørdagen på udvalgte løbsweekender. I modsætning til det almindelige Grand Prix, der typisk varer ca. 305 km, er sprint-løbet kun omkring 100 km langt og varer cirka 30 minutter uden obligatoriske pitstop.`
      },
      {
        id: "format",
        subtitle: "Format for sprint-weekenden",
        content: `En sprint-weekend følger et andet tidsplan end en standard løbsweekend:\n\nFredag\n- Træning 1 (FP1): En enkelt træningssession på 60 minutter.\n- Kvalifikation: Denne kvalifikation afgør startplaceringerne til Grand Prix’et (søndagens løb), ikke til sprinten.\n\nLørdag\n- Sprint Shootout: En kortere kvalifikation, der afgør startplaceringerne til sprint-løbet. Den minder om traditionel kvalifikation, men med kortere sessions:\n  - SQ1: 12 minutter\n  - SQ2: 10 minutter\n  - SQ3: 8 minutter\n- Sprint Race: Et løb på ca. 100 km uden pitstop (medmindre det er nødvendigt). Her gives point til top 8.\n\nSøndag\n- Det almindelige Grand Prix-løb.`
      },
      {
        id: "pointfordeling",
        subtitle: "Pointfordeling i sprinten",
        content: `Sprint-løbet giver færre point end Grand Prix’et, men kan stadig have afgørende betydning i verdensmesterskabet.`
      },
      {
        id: "regler",
        subtitle: "Vigtige regler og detaljer",
        content: `- Dækvalg: Der er specifikke krav til dækvalg under Sprint Shootout (f.eks. medium i SQ1 og SQ2, soft i SQ3).\n- Ingen obligatoriske pitstops: Sprinten er designet som et sprint-løb, så der kræves ikke pitstop.\n- Ingen indflydelse på Grand Prix: Resultatet af sprinten påvirker ikke startplaceringen til søndagens løb – det bestemmes udelukkende af fredagens kvalifikation.\n- Sprint-weekender afvikles kun ved udvalgte Grand Prix'er (typisk 6-8 gange pr. sæson).`
      },
      {
        id: "formaal",
        subtitle: "Formål med sprint-formatet",
        content: `Sprint-formatet er designet til at øge underholdningsværdien og tilføje endnu en konkurrencemæssig dimension til løbsweekenden. Det giver fansne mere action og holdene en ekstra mulighed for at score vigtige point.`
      }
    ]
  },
  {
    id: 2,
    title: "Hvad er DRS i Formel 1?",
    subtitle: "Forklaring af DRS-systemet", // Added
    sections: [
      {
        id: "hvad-er-drs",
        subtitle: "Hvad er DRS?",
        content: `DRS (Drag Reduction System) er et system, der tillader biler at reducere luftmodstanden ved at åbne en klap på bagvingen under visse betingelser.`
      },
      {
        id: "hvordan-fungerer-drs",
        subtitle: "Hvordan fungerer det?",
        content: `Når en bil er inden for én sekund af bilen foran på en DRS-zone, kan føreren aktivere systemet og dermed øge topfarten.`
      },
      {
        id: "regler-for-drs",
        subtitle: "Hvornår må DRS bruges?",
        content: `DRS må kun bruges i definerede zoner på banen og først efter to omgange er kørt i løbet.`
      }
    ]
  },
  {
    id: 3,
    title: "Hvad er Safety Car i Formel 1?",
    subtitle: "Sikkerhedsbilen i Formel 1", // Added
    sections: [
      {
        id: "hvad-er-safety-car",
        subtitle: "Hvad er Safety Car?",
        content: `Safety Car er en bil, der bruges til at neutralisere løbet under farlige forhold, såsom uheld eller dårligt vejr.`
      },
      {
        id: "hvornår-bruges-safety-car",
        subtitle: "Hvornår bruges Safety Car?",
        content: `Safety Car aktiveres, når der er behov for at beskytte førerne og officials på banen. Når den aktiveres, skal alle biler følge den i et kontrolleret tempo.`
      }
    ]
  },
  {
    id: 4,
    title: "Formel 1 Kvalifikation Forklaret",
    subtitle: "Sådan fungerer kvalifikationen", // Added
    sections: [
      {
        id: "format",
        subtitle: "Format",
        content: `Kvalifikationen består af tre sessioner: Q1, Q2 og Q3. Efter hver session elimineres de langsomste biler.`
      },
      {
        id: "startplacering",
        subtitle: "Startplacering",
        content: `Den hurtigste bil i Q3 starter forrest i Grand Prix'et.`
      }
    ]
  },
  {
    id: 5,
    title: "Hvad er Parc Fermé-reglen?",
    subtitle: "Regler for bilindstillinger efter kvalifikation", // Added
    sections: [
      {
        id: "hvad-er-parc-ferme",
        subtitle: "Hvad betyder det?",
        content: `Parc Fermé er en regel, der forhindrer teams i at ændre væsentlige bilindstillinger efter kvalifikationen.`
      },
      {
        id: "regler",
        subtitle: "Hvornår gælder det?",
        content: `Reglen træder i kraft fra kvalifikationens start og gælder frem til løbets start.`
      }
    ]
  },
  {
    id: 6,
    title: "Historien om Formel 1-verdensmesterskabet",
    subtitle: "F1-mesterskabets historie", // Added
    sections: [
      {
        id: "begyndelsen",
        subtitle: "Begyndelsen",
        content: `Det første officielle Formel 1 verdensmesterskab blev afholdt i 1950 på Silverstone-banen.`
      },
      {
        id: "udviklingen",
        subtitle: "Udvikling gennem tiden",
        content: `Sporten har udviklet sig fra farlige løb til en teknologisk avanceret konkurrence med stor global popularitet.`
      }
    ]
  },
  {
    id: 7,
    title: "Banerekorder i Formel 1",
    subtitle: "De hurtigste tider på F1-baner", // Added
    sections: [
      {
        id: "hvad-er-banerekord",
        subtitle: "Hvad er en banerekord?",
        content: `Den hurtigste tid sat på en bestemt bane under officielle løbsforhold.`
      },
      {
        id: "eksempler",
        subtitle: "Eksempler",
        content: `Lewis Hamilton har rekord på Silverstone, mens Max Verstappen har sat flere banerekorder i nyere tid.`
      }
    ]
  },
  {
    id: 8,
    title: "Hvad er en Virtual Safety Car?",
    subtitle: "Virtuel sikkerhedsbil forklaret", // Added
    sections: [
      {
        id: "hvad-er-vsc",
        subtitle: "Forklaring",
        content: `En Virtual Safety Car (VSC) bruges til at neutralisere et løb uden at sende en fysisk safety car på banen.`
      },
      {
        id: "formaal",
        subtitle: "Formål",
        content: `Formålet er at beskytte førere og officials ved uheld uden at afbryde løbet fuldstændigt.`
      }
    ]
  },
  {
    id: 9,
    title: "Formel 1-sæsonens opbygning",
    subtitle: "F1-sæson struktur", // Added
    sections: [
      {
        id: "antal-loeb",
        subtitle: "Antal løb",
        content: `En Formel 1-sæson består typisk af 22-24 Grand Prix-løb fordelt over hele verden.`
      },
      {
        id: "point-system",
        subtitle: "Point system",
        content: `De 10 bedste i hvert løb scorer point, med 25 point til vinderen.`
      }
    ]
  },
  {
    id: 10,
    title: "Hvad er en pitstop-strategi?",
    subtitle: "Strategi bag pitstops i F1", // Added
    sections: [
      {
        id: "pitstop-taktik",
        subtitle: "Pitstop-taktik",
        content: `Holdene planlægger nøje deres pitstop for at optimere dækskifte og undgå trafik.`
      },
      {
        id: "under-safety-car",
        subtitle: "Under Safety Car",
        content: `Pitstop under Safety Car kan give gratis tid, da feltet kører langsommere.`
      }
    ]
  },
];

const DataArticles = [
  {
    id: 1,
    title: "Hurtigste Banerekorder i Formel 1",
    subtitle: "De hurtigste omgange i F1-historien", // Added
    sections: [
      {
        id: "definition",
        subtitle: "Hvad er en banerekord?",
        content: `En banerekord er den hurtigste omgangstid nogensinde sat på en bane under et Formel 1-løb.`
      },
      {
        id: "eksempler",
        subtitle: "Eksempler",
        content: `Lewis Hamilton satte i 2020 banerekorden på Silverstone med 1:24.303, mens Max Verstappen slog banen i Abu Dhabi med 1:26.103 i 2021.`
      }
    ]
  },
  {
    id: 2,
    title: "Flest Grand Prix-sejre i historien",
    subtitle: "Førere med flest sejre", // Added
    sections: [
      {
        id: "rekordholdere",
        subtitle: "Rekordholdere",
        content: `Lewis Hamilton og Michael Schumacher deler rekorden for flest Grand Prix-sejre med hver 91 sejre.`
      },
      {
        id: "aktive-foerere",
        subtitle: "Aktive førere med flest sejre",
        content: `Max Verstappen, Fernando Alonso og Charles Leclerc er blandt de mest vindende aktive førere.`
      }
    ]
  },
  {
    id: 3,
    title: "De Mest Legendariske Formel 1-baner",
    subtitle: "Ikoniske F1-baner", // Added
    sections: [
      {
        id: "monaco",
        subtitle: "Monaco Grand Prix",
        content: `Det mest ikoniske løb, afholdt siden 1929 gennem Monacos gader med minimal plads og høj risiko.`
      },
      {
        id: "spa",
        subtitle: "Spa-Francorchamps",
        content: `Belgisk bane kendt for Eau Rouge og Raidillon — en af de mest udfordrende sektioner i motorsport.`
      },
      {
        id: "monza",
        subtitle: "Monza",
        content: `Italiens tempel for fart, med banerekorder og topfarter over 360 km/t.`
      }
    ]
  },
  {
    id: 4,
    title: "Tophastigheder i Formel 1",
    subtitle: "De højeste hastigheder i sporten", // Added
    sections: [
      {
        id: "hastighedsrekord",
        subtitle: "Højeste målte hastighed",
        content: `Valtteri Bottas nåede 372.5 km/t under kvalifikationen til 2016 Mexican Grand Prix.`
      },
      {
        id: "nutidige-topfarter",
        subtitle: "Topfarter i dag",
        content: `Moderne biler rammer typisk 330-350 km/t på langsider som Monza og Baku.`
      }
    ]
  },
  {

    id: 5,
    title: "Mest Vindende Konstruktorer",
    subtitle: "De mest succesfulde teams", // Added
    sections: [
      {
        id: "historisk-top",
        subtitle: "Historisk top 3",
        content: `1. Ferrari (over 240 sejre)\n2. McLaren (180+)\n3. Mercedes (mere end 125 sejre siden 2010).`
      },
      {
        id: "dominante-perioder",
        subtitle: "Dominante perioder",
        content: `Mercedes dominerede mellem 2014-2020, mens Ferrari havde stærke år i 2000'erne.`
      }
    ]
  },
  {
    id: 6,
    title: "Flest Verdensmesterskaber",
    subtitle: "Førere med flest titler", // Added
    sections: [
      {
        id: "foerere",
        subtitle: "Førere med flest titler",
        content: `Lewis Hamilton og Michael Schumacher har begge vundet verdensmesterskabet 7 gange.`
      },
      {
        id: "aktive",
        subtitle: "Aktuelle mestre",
        content: `Max Verstappen har vundet tre titler i træk fra 2021-2023.`
      }
    ]
  },
  {
    id: 7,
    title: "Længste Formel 1-løb",
    subtitle: "De længste løb i tid og distance", // Added
    sections: [
      {
        id: "tid",
        subtitle: "Længste løb i tid",
        content: `2021 Belgian Grand Prix blev det længste i historien med over 3 timer grundet regn og forsinkelser.`
      },
      {
        id: "afstand",
        subtitle: "Længste distance",
        content: `Indianapolis 500, da det var en del af F1-kalenderen (1950-1960), havde længste distance på over 804 km.`
      }
    ]
  },
  {
    id: 8,
    title: "Flest Pole Positions",
    subtitle: "Førere med flest pole positions", // Added
    sections: [
      {
        id: "rekordholder",
        subtitle: "Rekordholder",
        content: `Lewis Hamilton har rekorden med over 104 pole positions i karrieren.`
      },
      {
        id: "klassiske-navne",
        subtitle: "Legendariske navne",
        content: `Ayrton Senna var kendt for sine kvalifikationer og satte 65 pole positions.`
      }
    ]
  },
  {
    id: 9,
    title: "Største Formel 1-rivaliseringer",
    subtitle: "De mest intense rivaliseringer", // Added
    sections: [
      {
        id: "senna-prost",
        subtitle: "Senna vs Prost",
        content: `En intens rivalisering fra 1988-1993 mellem Ayrton Senna og Alain Prost.`
      },
      {
        id: "hamilton-verstappen",
        subtitle: "Hamilton vs Verstappen",
        content: `Dramatisk VM-duel i 2021-sæsonen kulminerede med et kontroversielt løb i Abu Dhabi.`
      }
    ]
  },
  {
    id: 10,
    title: "Formel 1’s Ældste Aktive Bane",
    subtitle: "De ældste baner i F1", // Added
    sections: [
      {
        id: "monaco",
        subtitle: "Monaco Grand Prix",
        content: `Monaco har været på kalenderen siden 1950 og er den ældste kontinuerligt afholdte bane.`
      },
      {
        id: "spa",
        subtitle: "Spa-Francorchamps",
        content: `Spa er blandt de ældste, oprindeligt åbnet i 1921 og en fast del af Formel 1 siden 1950.`
      }
    ]
  }
];
const F1DriverArticles = [
  {
    id: 1,
    title: "Lewis Hamilton: En Formel 1-legende",
    subtitle: "Historien om Lewis Hamilton", // Added
    sections: [
      {
        id: "begyndelsen",
        subtitle: "Tidlige år",
        content: `Lewis Hamilton begyndte at køre gokart som otteårig og blev hurtigt bemærket af McLaren. I 2007 debuterede han i Formel 1 og imponerede med en andenplads i mesterskabet allerede i sin første sæson.`
      },
      {
        id: "meritter",
        subtitle: "Titler og rekorder",
        content: `Hamilton har vundet 7 verdensmesterskaber og har flest Grand Prix-sejre og pole positions nogensinde. Han er kendt for sin evne i regnvejrsløb og stærke kvalifikationer.`
      }
    ]
  },
  {
    id: 2,
    title: "Max Verstappen: Den Nye Konge af Formel 1",
    subtitle: "Historien om Max Verstappen", // Added
    sections: [
      {
        id: "tidlig-karriere",
        subtitle: "Rekordtidlig debut",
        content: `Max Verstappen debuterede som 17-årig i Formel 1 i 2015 og blev den yngste løbsvinder i historien ved Spaniens Grand Prix 2016.`
      },
      {
        id: "dominans",
        subtitle: "Ny dominans",
        content: `Verstappen har domineret sporten siden 2021 og vundet tre verdensmesterskaber i træk. Han er kendt for sin aggressive kørestil og uovertrufne kontrol.`
      }
    ]
  },
  {
    id: 3,
    title: "Fernando Alonso: Mesterens Comeback",
    subtitle: "Historien om Fernando Alonso", // Added
    sections: [
      {
        id: "karriere",
        subtitle: "Tidlige triumfer",
        content: `Alonso blev verdensmester i 2005 og 2006 med Renault og brød dermed Michael Schumachers dominans.`
      },
      {
        id: "come-back",
        subtitle: "Comeback og nutid",
        content: `Efter en pause fra sporten vendte Alonso tilbage i 2021 og kører nu for Aston Martin, hvor han stadig viser storform.`
      }
    ]
  }
];


const F1NewsArticles = [
  {
    id: 1,
    title: "Red Bull forlænger med Verstappen til 2028",
    subtitle: "Verstappen fortsætter hos Red Bull", // Added
    date: "2025-05-20",
    summary: "Red Bull Racing har annonceret, at Max Verstappen har forlænget sin kontrakt til og med 2028-sæsonen.",
    content: `Red Bull Racing og Max Verstappen har indgået en ny aftale, der sikrer hollænderen i teamet frem til 2028. Teamchef Christian Horner udtaler, at samarbejdet er nøglen til fortsat succes.`
  },
  {
    id: 2,
    title: "Ferrari introducerer opgraderinger til Monacos Grand Prix",
    subtitle: "Ferrari med nye opgraderinger i Monaco", // Added
    date: "2025-05-18",
    summary: "Ferrari har medbragt en række aerodynamiske opgraderinger til det ikoniske løb i Monaco.",
    content: `Ferrari håber at udfordre Red Bull og Mercedes med nye opgraderinger på SF-25'eren. Charles Leclerc ser frem til at køre foran hjemmepublikummet.`
  },
  {
    id: 3,
    title: "Ny sprint-weekend bekræftet for 2025-sæsonen",
    subtitle: "Flere sprint-weekender i 2025", // Added
    date: "2025-05-15",
    summary: "FIA har offentliggjort, at der vil være otte sprint-weekender i 2025.",
    content: `Sprint-formatet fortsætter med endnu flere weekender næste år. Flere teams og førere har udtrykt begejstring for det ekstra konkurrenceelement.`
  },
  {
    id: 4,
    title: "Mercedes afslører ny motoropgradering",
    subtitle: "Mercedes med ny motoropgradering", // Added
    date: "2025-05-10",
    summary: "Mercedes har præsenteret en ny motoropgradering for at forbedre deres præstationer i resten af sæsonen.",
    content: `Mercedes håber, at den nye motoropgradering vil bringe dem tættere på Red Bull og Ferrari i kampen om verdensmesterskabet.`
  },
  {
    id: 5,
    title: "McLaren sikrer stor sponsor-aftale",
    subtitle: "Ny hovedsponsor til McLaren", // Added
    date: "2025-05-08",
    summary: "McLaren har indgået en flerårig aftale med en ny hovedsponsor.",
    content: `Den nye sponsor skal styrke McLarens økonomiske fundament og give teamet mulighed for yderligere udvikling af bilen.`
  },
  {
    id: 6,
    title: "Ny regnvejsdæk-test i Barcelona",
    subtitle: "Pirelli tester nye regnvejrsdæk", // Added
    date: "2025-05-05",
    summary: "Pirelli tester nye regnvejrsdæk under træningen i Barcelona.",
    content: `Formålet med testen er at forbedre dækkets ydeevne og sikkerhed under våde forhold. Flere teams deltager aktivt i udviklingen.`
  },
  {
    id: 7,
    title: "Fernando Alonso fejrer 400 Grand Prix-starter",
    subtitle: "Alonso runder 400 starter", // Added
    date: "2025-05-01",
    summary: "Alonso markerer en milepæl med sit 400. Grand Prix i Formel 1.",
    content: `Fernando Alonso bliver kun den anden fører i historien til at nå 400 starter og hyldes af kolleger og fans.`
  },
  {
    id: 8,
    title: "FIA undersøger track limits i Imola",
    subtitle: "Track limits under lup i Imola", // Added
    date: "2025-04-28",
    summary: "FIA har indledt en undersøgelse af track limits efter flere overtrædelser i Imola.",
    content: `Flere førere fik slettet omgangstider under kvalifikationen, og FIA overvejer nu ændringer til banens layout.`
  },
  {
    id: 9,
    title: "Williams annoncerer nyt talentprogram",
    subtitle: "Williams lancerer talentprogram", // Added
    date: "2025-04-25",
    summary: "Williams lancerer et nyt program for unge talenter i motorsport.",
    content: `Programmet skal hjælpe unge kørere med at udvikle sig og potentielt sikre en plads i Formel 1 i fremtiden.`
  },
  {
    id: 10,
    title: "Formel 1 planlægger løb i Sydafrika",
    subtitle: "F1 kan vende tilbage til Sydafrika", // Added
    date: "2025-04-20",
    summary: "F1-organisationen arbejder på at bringe et Grand Prix tilbage til Sydafrika.",
    content: `Forhandlinger er i gang om at afholde et løb på Kyalami-banen, hvilket vil markere sportens tilbagevenden til kontinentet efter flere årtiers fravær.`
  }
];

export default Reglerarticles;
export { DataArticles, F1DriverArticles, F1NewsArticles };
