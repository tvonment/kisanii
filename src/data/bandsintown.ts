// Public widget app_id (also embedded in Bandsintown's own widget code), safe for client use.
export const BANDSINTOWN_APP_ID = '1e90c7cd885464d4ded21a456a7b7641';
export const BANDSINTOWN_ARTIST_ID = '15570479';
export const BANDSINTOWN_ARTIST_NAME = 'Kisanii';
export const BANDSINTOWN_ARTIST_URL = `https://www.bandsintown.com/a/${BANDSINTOWN_ARTIST_ID}-kisanii`;
export const BANDSINTOWN_EVENTS_URL = `https://rest.bandsintown.com/artists/id_${BANDSINTOWN_ARTIST_ID}/events?app_id=${BANDSINTOWN_APP_ID}&date=all`;
// With "Event Listings: Event Name" the default API overwrites venue.name with the event title; V4 keeps the real venue.
export const BANDSINTOWN_EVENTS_V4_URL = `https://rest.bandsintown.com/V4/artists/id_${BANDSINTOWN_ARTIST_ID}/events/?app_id=${BANDSINTOWN_APP_ID}&date=all`;

// Same follow link the Bandsintown widget builds. The signature is "ZZ" + sha256("<artistId>--opt--<spn>")
// with spn = false (artist doesn't collect phone numbers).
const FOLLOW_SIGNATURE = 'ZZ13924dd5e8c9bed6c1afb66721203e3454a6859a1bc2c760d8e816d0e73ef74b';

export function bandsintownFollowUrl(lang: 'de' | 'en'): string {
  const params = [
    'play-my-city=false',
    `app_id=${BANDSINTOWN_APP_ID}`,
    'came_from=700',
    'utm_campaign=track',
    'utm_medium=web',
    'utm_source=widget',
    'spn=false',
    `signature=${FOLLOW_SIGNATURE}`,
  ].join('&');
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return `https://www.bandsintown.com${prefix}/artist-subscribe/${BANDSINTOWN_ARTIST_ID}-kisanii?${params}`;
}

export type BandsintownEvent = {
  id: string;
  datetime: string; // local venue time, e.g. 2026-11-06T20:30:00
  title: string;
  url: string; // event page on bandsintown.com
  lineup: string[];
  venue: { name: string; city: string; street_address: string };
  offers: { type: string; status: string; url: string }[];
};
