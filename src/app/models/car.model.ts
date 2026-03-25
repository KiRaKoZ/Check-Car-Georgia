export interface LocalizedText {
  geo: string;
  eng: string;
  rus: string;
}

export interface Car {
  id: number;
  slug: string;
  brand: string;
  name: string;
  fullName: string;
  shortInfo: string;
  description: string;
  type: string;
  typeKey: string;
  price: string;
  priceValue: number;
  currency: 'GEL' | 'USD';
  per: string;
  fuel: string;
  fuelKey: string;
  transmission: string;
  transmissionKey: string;
  year: number;
  engine: string;
  consumption?: string;
  seats: number;
  doors: number;
  location: string;
  available: boolean;
  featured: boolean;
  image: string;
  images: string[];
  features: string[];
  featureKeys?: string[];
  video?: string;
  raw?: any;
}
