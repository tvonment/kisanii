export type Concert = {
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  venue: string;
  city: string;
  status: 'upcoming' | 'past';
  ticketUrl?: string;
};

export const concerts: Concert[] = [
  // ── Upcoming ──────────────────────────────────────────────────────────────
  {
    title: 'Wohnzimmerkonzert @ Presswerk Arbon',
    date: '2025-10-08',
    venue: 'Presswerk Arbon',
    city: 'Arbon',
    status: 'upcoming',
  },

  // ── Past (newest first) ───────────────────────────────────────────────────
  {
    title: 'Kisanii live @Kultling Kreuzlingen',
    date: '2025-08-09',
    venue: 'Kultling Kreuzlingen',
    city: 'Kreuzlingen',
    status: 'past',
  },
  {
    title: 'Chapella Openair',
    date: '2025-08-02',
    venue: 'Capella Openair',
    city: 'Arbon',
    status: 'past',
  },
  {
    title: 'Release Konzert im Leibacher',
    date: '2025-04-04',
    venue: 'Atelier Leibacher',
    city: 'Stein am Rhein',
    status: 'past',
  },
  {
    title: 'Support für «Four Disturbed Civillians»',
    date: '2025-01-31',
    venue: 'Photobastei',
    city: 'Zürich',
    status: 'past',
  },
  {
    title: 'Konzert im 3. Stock (Releasetour)',
    date: '2025-03-22',
    venue: 'dä 3. Stock',
    city: 'Herisau',
    status: 'past',
  },
  {
    title: 'EP Release Konzert',
    date: '2025-03-14',
    venue: 'zum hinteren Hecht',
    city: 'Winterthur',
    status: 'past',
  },
  {
    title: 'Wohnzimmerkonzert im Presswerk Arbon',
    date: '2025-02-05',
    venue: 'Presswerk Arbon',
    city: 'Arbon',
    status: 'past',
  },
  {
    title: 'Benefizkonzert in der RAB BAR Trogen',
    date: '2024-12-06',
    venue: 'RAB BAR',
    city: 'Trogen',
    status: 'past',
  },
  {
    title: 'Duo im Kafi Zytlos',
    date: '2024-11-29',
    venue: 'Kafi Zytlos',
    city: 'Zürich',
    status: 'past',
  },
  {
    title: 'Kreiselfest @ Herisau',
    date: '2024-08-10',
    venue: 'Treffpunkt Herisau',
    city: 'Herisau',
    status: 'past',
  },
  {
    title: 'Clanx Openair Appenzell',
    date: '2024-08-24',
    venue: 'Clanx Openair',
    city: 'Appenzell',
    status: 'past',
  },
  {
    title: 'Musig uf de Gass',
    date: '2024-06-01',
    venue: 'Flon',
    city: 'St. Gallen',
    status: 'past',
  },
  {
    title: 'Kulturbrunch Herisau',
    date: '2024-05-26',
    venue: 'TanzRaum Herisau',
    city: 'Herisau',
    status: 'past',
  },
  {
    title: 'Physical Album Release',
    date: '2024-04-18',
    venue: 'Werk 21 Dynamo',
    city: 'Zürich',
    status: 'past',
  },
  {
    title: 'Musikvideo «Victress in the Sky» Premiere',
    date: '2024-04-14',
    venue: 'Ref. Kirche',
    city: 'Oberrieden',
    status: 'past',
  },
  {
    title: 'Kisanii Live am Honkytonk',
    date: '2024-04-27',
    venue: 'Schutzengelkapelle',
    city: 'St. Gallen',
    status: 'past',
  },
  {
    title: 'Solo am Mittag',
    date: '2024-09-13',
    venue: 'Wasserkirche',
    city: 'Zürich',
    status: 'past',
  },
  {
    title: 'Radio Meltdown Jubiläumsfeier',
    date: '2023-12-23',
    venue: 'Zeughaus',
    city: 'Herisau',
    status: 'past',
  },
  {
    title: 'Bachelorkonzert',
    date: '2023-05-30',
    venue: 'Mehrspur',
    city: 'Zürich',
    status: 'past',
  },
  {
    title: 'Finale BandXOst',
    date: '2022-11-26',
    venue: 'Grabenhalle',
    city: 'St. Gallen',
    status: 'past',
  },
  {
    title: 'Qualifikation BandXOst',
    date: '2022-10-08',
    venue: 'Treppenhaus',
    city: 'Rorschach',
    status: 'past',
  },
  {
    title: 'Feministischer Streik',
    date: '2022-06-14',
    venue: 'Stadtgebiet',
    city: 'St. Gallen',
    status: 'past',
  },
  {
    title: 'Four Disturbed Covillians – Plattentaufe',
    date: '2020-01-31',
    venue: 'Photobastei',
    city: 'Zürich',
    status: 'past',
  },
];

export const upcomingConcerts = concerts
  .filter((c) => c.date >= new Date().toISOString().slice(0, 10))
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastConcerts = concerts
  .filter((c) => c.date < new Date().toISOString().slice(0, 10))
  .sort((a, b) => b.date.localeCompare(a.date));
