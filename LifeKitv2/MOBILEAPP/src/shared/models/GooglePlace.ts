
  export class AddressComponent {
    long_name: string="";
    short_name: string="";
    types: string[];
  }

  export class Location {
    lat: number;
    lng: number;
  }

  export class Northeast {
    lat: number;
    lng: number;
  }

  export class Southwest {
    lat: number;
    lng: number;
  }

  export class Viewport {
    northeast: Northeast;
    southwest: Southwest;
  }

  export class Geometry {
    location: Location;
    viewport: Viewport;
  }

  export class Close {
    day: number;
    time: string;
  }

  export class Open {
    day: number;
    time: string;
  }

  export class Period {
    close: Close;
    open: Open;
  }

  export class OpeningHours {
    exceptional_date: any[];
    open_now: boolean;
    periods: Period[];
    weekday_text: string[];
  }

  export class Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }

  export class Aspect {
    rating: number;
    type: string;
  }

  export class Review {
    aspects: Aspect[];
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }

  export class GooglePlace {
    address_components: AddressComponent[];
    adr_address: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: Geometry;
    icon: string;
    id: string;
    international_phone_number: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    rating: number;
    reference: string;
    reviews: Review[];
    scope: string;
    types: string[];
    url: string;
    utc_offset: number;
    vicinity: string;
    website: string;
  }




