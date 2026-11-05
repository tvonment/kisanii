// Public widget app_id (also embedded in Bandsintown's own widget code), safe for client use.
export const BANDSINTOWN_APP_ID = '1e90c7cd885464d4ded21a456a7b7641';
export const BANDSINTOWN_ARTIST_ID = '15570479';
export const BANDSINTOWN_ARTIST_NAME = 'Kisanii';
export const BANDSINTOWN_ARTIST_URL = `https://www.bandsintown.com/a/${BANDSINTOWN_ARTIST_ID}-kisanii`;
export const BANDSINTOWN_EVENTS_URL = `https://rest.bandsintown.com/artists/id_${BANDSINTOWN_ARTIST_ID}/events?app_id=${BANDSINTOWN_APP_ID}&date=all`;

export type BandsintownEvent = {
  id: string;
  datetime: string; // local venue time, e.g. 2026-11-06T20:30:00
  title: string;
  lineup: string[];
  venue: { name: string; city: string };
  offers: { type: string; status: string; url: string }[];
};
