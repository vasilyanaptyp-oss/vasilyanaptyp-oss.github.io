/* Work list. Facts only: each entry is a public concept page built from the business's own materials. */
window.WORK = [
  { id: 'fineremont', name: 'Файний Ремонт', place: 'Kyiv, Ukraine', flag: '🇺🇦', craft: 'Apartment renovation', lang: 'Ukrainian', url: 'https://vasilyanaptyp-oss.github.io/fineremont-concept/', tag: '3D gallery, GSAP' },
  { id: 'vartu', name: 'Vārtu pasaule', place: 'Nītaure, Latvia', flag: '🇱🇻', craft: 'Gates & fences', lang: 'Latvian', url: 'https://vasilyanaptyp-oss.github.io/vartu-pasaule-concept/', tag: 'Product catalogue' },
  { id: 'ripex', name: 'RIPEX', place: 'Alytus, Lithuania', flag: '🇱🇹', craft: 'Machinery rental & construction', lang: 'Lithuanian', url: 'https://vasilyanaptyp-oss.github.io/ripex-concept/', tag: 'Rental request form' },
  { id: 'kimela', name: 'Kimela', place: 'Klaipėda, Lithuania', flag: '🇱🇹', craft: 'Truck & tanker wash', lang: 'Lithuanian', url: 'https://vasilyanaptyp-oss.github.io/kimela-concept/', tag: 'Booking by vehicle type' },
  { id: 'sos', name: 'SOS Evakuators', place: 'Daugavpils, Latvia', flag: '🇱🇻', craft: 'Towing 24/7', lang: 'Latvian', url: 'https://autopalidziba.lv/', live: true, tag: 'Live client site' },
  { id: 'tomi', name: 'Tomi Meble', place: 'Radom, Poland', flag: '🇵🇱', craft: 'Fitted kitchens', lang: 'Polish', url: 'https://vasilyanaptyp-oss.github.io/tomi-meble-concept/', tag: 'Two showrooms, six phones' },
  { id: 'lirana', name: 'Lirana', place: 'Šilutė, Lithuania', flag: '🇱🇹', craft: 'Windows, blinds & gates', lang: 'Lithuanian', url: 'https://vasilyanaptyp-oss.github.io/lirana-concept/', tag: 'Model picker' },
  { id: 'dogroom', name: 'DoGroom', place: 'Latvia', flag: '🇱🇻', craft: 'Dog & cat grooming', lang: 'Latvian', url: 'https://vasilyanaptyp-oss.github.io/dogroom-concept/', tag: 'Before/after gallery' },
  { id: 'ards', name: 'ARDS Saldus', place: 'Saldus, Latvia', flag: '🇱🇻', craft: 'Car service', lang: 'Latvian', url: 'https://vasilyanaptyp-oss.github.io/ards-concept/', tag: 'Service finder' },
  { id: 'mebtex', name: 'MEBTEX', place: 'Riga, Latvia', flag: '🇱🇻', craft: 'Carpentry & furniture', lang: 'Latvian', url: 'https://vasilyanaptyp-oss.github.io/mebtex-concept/', tag: 'Work-first homepage' },
  { id: 'magicroof', name: 'Magic Roof', place: 'Linz, Austria', flag: '🇦🇹', craft: 'Roofing & waterproofing', lang: 'German', url: 'https://vasilyanaptyp-oss.github.io/magic-roof-concept/', tag: 'Interactive services' },
  { id: 'mekian', name: 'MEKIAN Bilverkstad', place: 'Täby, Sweden', flag: '🇸🇪', craft: 'Car workshop', lang: 'Swedish', url: 'https://vasilyanaptyp-oss.github.io/mekian-concept/', tag: 'Booking-first' }
];
window.MORE = [
  { id: 'alarm3', name: 'ALARM3', place: 'Riga, Latvia', flag: '🇱🇻', craft: 'Car service', url: 'https://vasilyanaptyp-oss.github.io/alarm3-concept/' },
  { id: 'woodenlays', name: 'Wooden Lays', place: 'Latvia', flag: '🇱🇻', craft: 'Timber houses', url: 'https://vasilyanaptyp-oss.github.io/woodenlays-concept/' },
  { name: 'KARARTI', url: 'https://vasilyanaptyp-oss.github.io/kararti-demo/' },
  { name: 'Baldita', url: 'https://vasilyanaptyp-oss.github.io/baldita-koncept/' },
  { name: 'Pastnieka Māja', url: 'https://vasilyanaptyp-oss.github.io/pastnieka-maja-concept/' },
  { name: 'Szafranowy Dwór', url: 'https://vasilyanaptyp-oss.github.io/szafranowy-dwor-koncept/' },
  { name: 'Sala Finezja', url: 'https://vasilyanaptyp-oss.github.io/finezja-koncept/' }
];
/* Before/after pairs: old site (captured on a phone) vs. the concept. Filled in after capture; ids must have <id>-old-m.webp. */
window.PAIRS = ['ripex', 'fineremont', 'tomi', 'alarm3'];
window.GREET = ['Labdien', 'Sveiki', 'Tere', 'Dzień dobry', 'Доброго дня', 'Guten Tag', 'Hej', 'Hei', 'Goddag', 'Goedendag', 'Bonjour', 'Hello'];

/* The hero pitch in the languages I write to clients in. Auto-selected from the browser language. */
window.PITCH = {
  en: { name: 'English',    text: 'Gates, kitchens, roofs, renovations, car workshops, truck washes. I find small craft businesses that are invisible online, build them a homepage concept for free, and charge a flat <b>300&nbsp;€</b> only if they say yes.' },
  lv: { name: 'Latviešu',   text: 'Vārti, virtuves, jumti, remonti, autoservisi, kravas auto mazgātavas. Es atrodu mazus amatnieku uzņēmumus, kurus internetā nevar atrast, bez maksas uztaisu sākumlapas variantu un prasu <b>300&nbsp;€</b> tikai tad, ja jums patīk.' },
  lt: { name: 'Lietuvių',   text: 'Vartai, virtuvės, stogai, remontas, autoservisai, sunkvežimių plovyklos. Surandu mažas amatininkų įmones, kurių internete nematyti, nemokamai paruošiu pagrindinio puslapio variantą ir prašau <b>300&nbsp;€</b> tik tada, jei jums patinka.' },
  et: { name: 'Eesti',      text: 'Väravad, köögid, katused, remont, autotöökojad, veokipesulad. Leian väikesed käsitööettevõtted, keda internetis ei näe, teen tasuta avalehe kavandi ja küsin <b>300&nbsp;€</b> ainult siis, kui see teile meeldib.' },
  pl: { name: 'Polski',     text: 'Bramy, kuchnie, dachy, remonty, warsztaty, myjnie ciężarówek. Znajduję małe firmy rzemieślnicze, których nie widać w internecie, robię im za darmo koncepcję strony głównej i biorę <b>300&nbsp;€</b> tylko wtedy, gdy powiedzą tak.' },
  uk: { name: 'Українська', text: 'Ворота, кухні, дахи, ремонти, автосервіси, мийки вантажівок. Я знаходжу малі майстерні, яких не видно в інтернеті, безкоштовно роблю їм концепт головної сторінки і беру <b>300&nbsp;€</b> лише тоді, коли вони кажуть «так».' },
  de: { name: 'Deutsch',    text: 'Tore, Küchen, Dächer, Renovierungen, Werkstätten, Lkw-Waschanlagen. Ich finde kleine Handwerksbetriebe, die online unsichtbar sind, baue ihnen kostenlos ein Startseiten-Konzept und berechne pauschal <b>300&nbsp;€</b>, nur wenn sie Ja sagen.' },
  sv: { name: 'Svenska',    text: 'Grindar, kök, tak, renoveringar, bilverkstäder, lastbilstvättar. Jag hittar små hantverksföretag som är osynliga på nätet, bygger ett startsidekoncept gratis och tar <b>300&nbsp;€</b> bara om de säger ja.' },
  fi: { name: 'Suomi',      text: 'Portit, keittiöt, katot, remontit, autokorjaamot, rekkapesulat. Etsin pieniä käsityöyrityksiä, joita ei löydy netistä, teen etusivun luonnoksen ilmaiseksi ja veloitan <b>300&nbsp;€</b> vain, jos sanotte kyllä.' },
  da: { name: 'Dansk',      text: 'Porte, køkkener, tage, renoveringer, autoværksteder, lastbilvask. Jeg finder små håndværksvirksomheder, der er usynlige online, laver et gratis forslag til forsiden og tager <b>300&nbsp;€</b>, kun hvis de siger ja.' },
  nl: { name: 'Nederlands', text: 'Poorten, keukens, daken, renovaties, garages, truckwasstraten. Ik vind kleine ambachtelijke bedrijven die online onzichtbaar zijn, maak gratis een concept voor hun homepage en reken <b>300&nbsp;€</b> alleen als ze ja zeggen.' },
  fr: { name: 'Français',   text: 'Portails, cuisines, toitures, rénovations, garages, lavage de camions. Je trouve de petites entreprises artisanales invisibles en ligne, je leur construis gratuitement un concept de page d’accueil et je facture <b>300&nbsp;€</b> seulement si elles disent oui.' }
};
