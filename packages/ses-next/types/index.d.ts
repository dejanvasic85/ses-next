export interface Social {
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface Image {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  message: string;
  recaptchaToken?: string;
}

export interface Meta {
  title: string;
  description: string;
}

export interface Contact {
  phone: string;
  email?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  name?: string;
  linkToReadMore?: boolean;
}

export interface ServiceList {
  items: ServiceItem[];
}

export interface LayoutContent {
  companyName: string;
  companyLogo: string;
  contact: Contact;
  meta: Meta;
  services: ServiceList;
  shortTitle: string;
  social: Social;
}
