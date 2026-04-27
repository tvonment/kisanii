export type Lang = 'de' | 'en';

export const ui = {
  de: {
    'nav.home': 'Start',
    'nav.news': 'Aktuelles',
    'nav.live': 'Live',
    'nav.contact': 'Kontakt',
    'nav.epk': 'EPK',
    'nav.menu': 'Menü',
    'nav.close': 'Schliessen',

    'section.news': 'Aktuelles',
    'section.live': 'Live',
    'section.pastconcerts': 'Vergangene Konzerte',
    'section.contact': 'Kontakt',
    'section.newsletter': 'Newsletter abonnieren',
    'section.social': 'Social Media',

    'section.bio': 'Über mich',

    'bio.tagline': 'Verletzlich. Authentisch. Unaufhaltsam ehrlich.',
    'bio.text':
      'Kisanii ist verletzlich, authentisch und unaufhaltsam ehrlich. Mit viel Platz für eigene Gedanken nimmt sie ihre Hörerschaft mit auf eine Reise in emotionale Abgründe und berauschende Höhenflüge. Ihre starke Stimme lässt Herzen höher schlagen. Musikalisch überrascht sie mit mutigen Wendungen und einem Sound, der Genre-Grenzen spielerisch hinter sich lässt.',

    'news.readmore': 'Mehr lesen',
    'news.view': 'Ansehen',
    'news.seeall': 'Alle anzeigen',
    'news.back': '← Zurück',
    'news.external': 'Extern ansehen →',

    'concert.upcoming': 'Bevorstehende Konzerte',
    'concert.past': 'Vergangene Konzerte',
    'concert.noupcoming': 'Aktuell sind keine Konzerte geplant.',
    'concert.tickets': 'Tickets',
    'concerts.upcoming': 'Bevorstehende Konzerte',
    'concerts.past': 'Vergangene Konzerte',
    'concerts.none': 'Aktuell sind keine Konzerte geplant.',

    'contact.booking': 'Buchung',
    'contact.email': 'booking@kisanii.ch',
    'contact.followon': 'Folge mir auf',
    'contact.bookingdesc': 'Für Buchungsanfragen und weitere Informationen.',

    'newsletter.intro': 'Bleib auf dem Laufenden über neue Musik, Konzerte und mehr.',
    'newsletter.desc': 'Bleib auf dem Laufenden über neue Musik, Konzerte und mehr.',
    'newsletter.subscribe': 'Abonnieren',
    'newsletter.cta': 'Newsletter abonnieren',
    'newsletter.email': 'E-Mail-Adresse',

    'epk.title': 'Electronic Press Kit',
    'epk.subtitle': 'Biografie, Musik und Booking – für Veranstalter und Medien.',
    'epk.description': 'Kisanii Electronic Press Kit – Biografie, Musik, Booking und Pressematerial.',
    'epk.bio': 'Über Kisanii',
    'epk.streaming': 'Streaming',
    'epk.presskit': 'Pressematerial',
    'epk.presskit.download': 'Presskit herunterladen',
    'epk.presskit.placeholder': 'Pressematerial in Kürze verfügbar.',
    'epk.booking': 'Buchung & Kontakt',
    'epk.unmute': 'Ton an',
    'epk.mute': 'Ton aus',

    'footer.copyright': '© Kisanii',
    'footer.madewithlove': 'Mit ♥ gemacht',

    'lang.switch': 'EN',
    'lang.switchlabel': 'Switch to English',

    'meta.description':
      'Kisanii – Schweizer Singer-Songwriterin. Verletzlich, authentisch und unaufhaltsam ehrlich.',
    'meta.epk.description':
      'Kisanii Electronic Press Kit – Biografie, Musik, Booking und Pressematerial.',
  },
  en: {
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.live': 'Live',
    'nav.contact': 'Contact',
    'nav.epk': 'EPK',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    'section.news': 'News',
    'section.live': 'Live',
    'section.pastconcerts': 'Past Concerts',
    'section.contact': 'Contact',
    'section.newsletter': 'Subscribe to Newsletter',
    'section.social': 'Social Media',

    'section.bio': 'About',

    'bio.tagline': 'Vulnerable. Authentic. Relentlessly honest.',
    'bio.text':
      'Kisanii is vulnerable, authentic, and relentlessly honest. Leaving plenty of room for personal reflection, she takes her audience on a journey through emotional depths and intoxicating highs. Her powerful voice sets hearts racing. Musically, she surprises with bold turns and a sound that playfully transcends genre boundaries.',

    'news.readmore': 'Read more',
    'news.view': 'View',
    'news.seeall': 'See all',
    'news.back': '← Back',
    'news.external': 'View externally →',

    'concert.upcoming': 'Upcoming Shows',
    'concert.past': 'Past Concerts',
    'concert.noupcoming': 'No upcoming shows at the moment.',
    'concert.tickets': 'Tickets',
    'concerts.upcoming': 'Upcoming Shows',
    'concerts.past': 'Past Concerts',
    'concerts.none': 'No upcoming shows at the moment.',

    'contact.booking': 'Booking',
    'contact.email': 'booking@kisanii.ch',
    'contact.followon': 'Follow me on',
    'contact.bookingdesc': 'For booking enquiries and further information.',

    'newsletter.intro': 'Stay up to date on new music, shows, and more.',
    'newsletter.desc': 'Stay up to date on new music, shows, and more.',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.cta': 'Subscribe to newsletter',
    'newsletter.email': 'Email address',

    'epk.title': 'Electronic Press Kit',
    'epk.subtitle': 'Biography, music and booking – for promoters and media.',
    'epk.description': 'Kisanii Electronic Press Kit – biography, music, booking, and press material.',
    'epk.bio': 'About Kisanii',
    'epk.streaming': 'Streaming',
    'epk.presskit': 'Press Material',
    'epk.presskit.download': 'Download Press Kit',
    'epk.presskit.placeholder': 'Press material coming soon.',
    'epk.booking': 'Booking & Contact',
    'epk.unmute': 'Unmute',
    'epk.mute': 'Mute',

    'footer.copyright': '© Kisanii',
    'footer.madewithlove': 'Made with ♥',

    'lang.switch': 'DE',
    'lang.switchlabel': 'Auf Deutsch wechseln',

    'meta.description':
      'Kisanii – Swiss singer-songwriter. Vulnerable, authentic, and relentlessly honest.',
    'meta.epk.description':
      'Kisanii Electronic Press Kit – biography, music, booking, and press material.',
  },
} as const;

export type UIKey = keyof (typeof ui)['de'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key];
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}

export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname =
    base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) || '/' : url.pathname;
  const [, lang] = pathname.split('/');
  if (lang === 'en') return 'en';
  return 'de';
}

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path =
    base && currentPath.startsWith(base) ? currentPath.slice(base.length) || '/' : currentPath;
  let result: string;
  if (targetLang === 'en') {
    result = path.startsWith('/en') ? path : `/en${path}`;
  } else {
    result = path.startsWith('/en') ? path.replace(/^\/en/, '') || '/' : path;
  }
  return base + result;
}
