import { z } from 'zod';
import type {
  BlogPost as SanityBlogPostDoc,
  Faq as SanityFaqDoc,
  Homepage as SanityHomepageDoc,
  LocationPage as SanityLocationPageDoc,
  Service as SanityServiceDoc,
  ServicesHub as SanityServicesHubDoc,
  Showcase as SanityShowcaseDoc,
  SiteSettings as SanitySiteSettingsDoc,
  Slug as SanitySlugDoc,
  TeamMember as SanityTeamMemberDoc,
  TermsAndConditions as SanityTermsAndConditionsDoc,
  Training as SanityTrainingDoc,
  SanityImageAsset,
} from '@/sanity/sanity.types';

// ============================================================================
// FORM SCHEMAS
// ============================================================================

export const ContactFormDataSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email({ message: 'Please enter a valid email' }),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
  address: z.string().min(1, 'Address is required'),
  recaptchaToken: z.string().optional(),
});

export const FeedbackFormDataSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  comment: z.string().min(1, 'Comment is required'),
  rating: z.number().min(1).max(5),
  recaptchaToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormDataSchema>;
export type FeedbackFormData = z.infer<typeof FeedbackFormDataSchema>;

// ============================================================================
// COMMON SCHEMAS
//
// Icon is a superset of the options Sanity's `icon` field allows (it also
// covers UI-only icons like nav/trust badges that aren't stored in Sanity),
// so it stays hand-maintained rather than importing the generated field type.
// ============================================================================

export const IconSchema = z.enum([
  'air',
  'badge',
  'bars-staggered',
  'bolt',
  'clock',
  'facebook',
  'height',
  'light',
  'linked-in',
  'mobile',
  'phone',
  'plug',
  'power',
  'recycle',
  'shield',
  'space',
  'star',
  'tick-circle',
  'signal-tower',
  'wrench',
  'warning',
  'x',
]);

// Repeated identity fields shared by every Sanity document schema below.
const sanityDocumentFieldsValue = {
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
};

type SanityImageAssetRef = Partial<Pick<SanityImageAsset, '_id'>> & Required<Pick<SanityImageAsset, 'url'>>;

export type SanityImage = {
  _type: 'image';
  asset: SanityImageAssetRef;
};

export const SanityImageSchema: z.ZodType<SanityImage> = z.object({
  _type: z.literal('image'),
  asset: z.object({
    _id: z.string().optional(),
    url: z.url(),
  }),
});

export type SanitySlug = Pick<SanitySlugDoc, '_type'> & Required<Pick<SanitySlugDoc, 'current'>>;

export const SanitySlugSchema: z.ZodType<SanitySlug> = z.object({
  current: z.string(),
  _type: z.literal('slug'),
});

export const SanityMarkDefSchema = z.object({
  _key: z.string(),
  _type: z.string(),
});

export const SanityBlockSchema = z.object({
  _type: z.literal('block'),
  _key: z.string(),
  children: z.array(
    z.object({
      _type: z.literal('span'),
      _key: z.string(),
      text: z.string(),
      marks: z.array(z.string()).optional(),
    }),
  ),
  markDefs: z.array(SanityMarkDefSchema).optional(),
  style: z.string().optional(),
  level: z.number().optional(),
  listItem: z.string().optional(),
});

export const SanityPortableTextSchema = z.array(z.union([SanityBlockSchema, SanityImageSchema]));

// ============================================================================
// GOOGLE REVIEWS SCHEMAS
// ============================================================================

export const GoogleReviewerSchema = z.object({
  profileUrl: z.url(),
  profilePhotoUrl: z.url(),
  displayName: z.string(),
});

export const GoogleReviewSchema = z.object({
  id: z.string(),
  url: z.url(),
  reviewer: GoogleReviewerSchema,
  comment: z.string(),
  starRating: z.number().min(1).max(5),
  date: z.string(),
});

export const GoogleReviewsSchema = z.object({
  overallRatingValue: z.string(),
  numberOfReviews: z.string(),
  reviews: z.array(GoogleReviewSchema),
});

// ============================================================================
// DOCUMENT SCHEMAS (tied to generated Sanity schema types where practical)
// ============================================================================

export type FAQ = Pick<SanityFaqDoc, '_id' | '_type'> & Required<Pick<SanityFaqDoc, 'question' | 'answer'>>;

export const FAQSchema: z.ZodType<FAQ> = z.object({
  _type: z.literal('faq'),
  _id: z.string(),
  ...sanityDocumentFieldsValue,
  question: z.string(),
  answer: z.string(),
});

export type TrainingContentModel = Pick<SanityTrainingDoc, '_id' | '_type'> &
  Required<Pick<SanityTrainingDoc, 'trainingTitle'>> & {
    icon: Icon;
  };

export const TrainingSchema: z.ZodType<TrainingContentModel> = z.object({
  _type: z.literal('training'),
  _id: z.string(),
  ...sanityDocumentFieldsValue,
  trainingTitle: z.string(),
  icon: IconSchema,
});

export type ShowcaseContentModel = Pick<SanityShowcaseDoc, '_id' | '_type'> &
  Required<Pick<SanityShowcaseDoc, 'title'>> & {
    photo: SanityImage;
    featured: boolean | null;
  };

export const ShowcaseSchema: z.ZodType<ShowcaseContentModel> = z.object({
  _type: z.literal('showcase'),
  _id: z.string(),
  ...sanityDocumentFieldsValue,
  title: z.string(),
  photo: SanityImageSchema,
  featured: z.boolean().nullable(),
});

type SanityServiceFaqItem = NonNullable<SanityServiceDoc['faqs']>[number];

export type ServiceFaq = Required<Pick<SanityServiceFaqItem, 'question' | 'answer'>>;

export const ServiceFaqSchema: z.ZodType<ServiceFaq> = z.object({
  question: z.string(),
  answer: z.string(),
});

export type ServiceParent = Required<Pick<SanityServiceDoc, 'name'>> & { slug: SanitySlug };

export const ServiceParentSchema: z.ZodType<ServiceParent> = z.object({
  name: z.string(),
  slug: SanitySlugSchema,
});

export type ServiceContentModel = Pick<SanityServiceDoc, '_id' | '_type'> &
  Required<Pick<SanityServiceDoc, 'name' | 'description' | 'blurb'>> & {
    slug: SanitySlug;
    linkToReadMore: boolean | null;
    showOnHomepage: boolean | null;
    icon: Icon;
    showcase: ShowcaseContentModel[] | null;
    content: SanityPortableText | null;
    seoTitle: string | null;
    seoDescription: string | null;
    serviceType?: string | null;
    faqs: ServiceFaq[] | null;
    parentService?: ServiceParent | null;
  };

export const ServiceSchema: z.ZodType<ServiceContentModel> = z.object({
  _type: z.literal('service'),
  _id: z.string(),
  ...sanityDocumentFieldsValue,
  name: z.string(),
  description: z.string(),
  blurb: z.string(),
  slug: SanitySlugSchema,
  linkToReadMore: z.boolean().nullable(),
  showOnHomepage: z.boolean().nullable(),
  icon: IconSchema,
  showcase: z.array(ShowcaseSchema).nullable(),
  content: SanityPortableTextSchema.nullable(),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  serviceType: z.string().nullish(),
  faqs: z.array(ServiceFaqSchema).nullable(),
  parentService: ServiceParentSchema.nullish(),
});

// ============================================================================
// LOCATION PAGE SCHEMAS
// ============================================================================

type SanityLocationPageFaqItem = NonNullable<SanityLocationPageDoc['faqs']>[number];

export type LocationPageFaqContentModel = Required<Pick<SanityLocationPageFaqItem, 'question' | 'answer'>>;

export const LocationPageFaqSchema: z.ZodType<LocationPageFaqContentModel> = z.object({
  _key: z.string().optional(),
  question: z.string(),
  answer: z.string(),
});

export type LocationPageServiceRefContentModel = Pick<SanityServiceDoc, '_id'> &
  Required<Pick<SanityServiceDoc, 'name' | 'blurb'>> & {
    slug: SanitySlug;
    icon: Icon;
    parentService?: ServiceParent | null;
  };

export const LocationPageServiceRefSchema: z.ZodType<LocationPageServiceRefContentModel> = z.object({
  _id: z.string(),
  name: z.string(),
  blurb: z.string(),
  slug: SanitySlugSchema,
  icon: IconSchema,
  parentService: ServiceParentSchema.nullish(),
});

export type LocationPageNearbySuburbRefContentModel = Pick<SanityLocationPageDoc, '_id'> &
  Required<Pick<SanityLocationPageDoc, 'suburb'>> & { slug: SanitySlug };

export const LocationPageNearbySuburbRefSchema: z.ZodType<LocationPageNearbySuburbRefContentModel> = z.object({
  _id: z.string(),
  suburb: z.string(),
  slug: SanitySlugSchema,
});

export type LocationPageContentModel = Pick<SanityLocationPageDoc, '_id' | '_type'> &
  Required<Pick<SanityLocationPageDoc, 'suburb'>> & {
    slug: SanitySlug;
    isHub?: boolean | null;
    heroImage?: SanityImage | null;
    intro?: SanityPortableText | null;
    services?: LocationPageServiceRefContentModel[] | null;
    nearbySuburbs?: LocationPageNearbySuburbRefContentModel[] | null;
    faqs?: LocationPageFaqContentModel[] | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  };

export const LocationPageSchema: z.ZodType<LocationPageContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('locationPage'),
  suburb: z.string(),
  slug: SanitySlugSchema,
  isHub: z.boolean().nullable().optional(),
  heroImage: SanityImageSchema.nullable().optional(),
  intro: SanityPortableTextSchema.nullable().optional(),
  services: z.array(LocationPageServiceRefSchema).nullable().optional(),
  nearbySuburbs: z.array(LocationPageNearbySuburbRefSchema).nullable().optional(),
  faqs: z.array(LocationPageFaqSchema).nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
});

export type SanityTermsAndConditions = Pick<SanityTermsAndConditionsDoc, '_id' | '_type'> & {
  terms: SanityPortableText;
};

export const TermsAndConditionsSchema: z.ZodType<SanityTermsAndConditions> = z.object({
  _type: z.literal('terms-and-conditions'),
  _id: z.string(),
  ...sanityDocumentFieldsValue,
  terms: SanityPortableTextSchema,
});

type SanityHomepageContact = NonNullable<SanityHomepageDoc['contact']>;

export type ContactContentModel = Required<Pick<SanityHomepageContact, 'phone'>> & {
  blurbs: string[] | null;
  callBack: string | null;
};

export const ContactSchema: z.ZodType<ContactContentModel> = z.object({
  phone: z.string(),
  blurbs: z.array(z.string()).nullable(),
  callBack: z.string().nullable(),
});

// ============================================================================
// CONTENT MODEL SCHEMAS (GROQ query results with resolved references)
// ============================================================================

type SanityImageAssetSlim = Required<Pick<SanityImageAsset, 'url'>>;

const SanityAssetSchema: z.ZodType<SanityImageAssetSlim> = z.object({
  url: z.url(),
});

export type TeamMemberContentModel = Pick<SanityTeamMemberDoc, '_id' | '_type'> &
  Required<Pick<SanityTeamMemberDoc, 'name' | 'role'>> & {
    avatar: { asset: SanityImageAssetSlim };
  };

export const TeamMemberSchema: z.ZodType<TeamMemberContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('teamMember'),
  name: z.string(),
  role: z.string(),
  avatar: z.object({
    asset: SanityAssetSchema,
  }),
});

export type BlogPostContentModel = Pick<SanityBlogPostDoc, '_id' | '_type'> &
  Required<Pick<SanityBlogPostDoc, 'title' | 'description' | 'publishedAt' | 'tags'>> & {
    slug: SanitySlug;
    photo: { asset: SanityImageAssetSlim };
    body: SanityPortableText;
  };

export const BlogPostSchema: z.ZodType<BlogPostContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('blog-post'),
  title: z.string(),
  description: z.string(),
  slug: SanitySlugSchema,
  photo: z.object({
    asset: SanityAssetSchema,
  }),
  publishedAt: z.string(),
  tags: z.array(z.string()),
  body: SanityPortableTextSchema,
});

type SiteSettingsMeta = Required<NonNullable<SanitySiteSettingsDoc['meta']>>;
type SiteSettingsOpeningHours = Required<NonNullable<SanitySiteSettingsDoc['openingHours']>>;
type SiteSettingsOwner = Required<Pick<NonNullable<SanitySiteSettingsDoc['owner']>, 'name' | 'role'>> &
  Pick<NonNullable<SanitySiteSettingsDoc['owner']>, 'accreditations'>;

export type SiteSettingsContentModel = Pick<SanitySiteSettingsDoc, '_id' | '_type'> &
  Required<Pick<SanitySiteSettingsDoc, 'companyName' | 'shortTitle' | 'baseUrl' | 'phone'>> &
  Pick<
    SanitySiteSettingsDoc,
    | 'alternateName'
    | 'mobile'
    | 'email'
    | 'address'
    | 'abn'
    | 'recLicence'
    | 'businessHours'
    | 'establishedYear'
    | 'directorName'
    | 'latitude'
    | 'longitude'
    | 'streetAddress'
    | 'suburb'
    | 'state'
    | 'postcode'
  > & {
    companyLogo: { asset: SanityImageAssetSlim };
    googleMapsLocation: string | null;
    googleMapsLocationPlaceUrl: string | null;
    meta: SiteSettingsMeta;
    socialMedia: {
      facebook: string | null;
      linkedIn: string | null;
      instagram: string | null;
    } | null;
    openingHours?: SiteSettingsOpeningHours;
    owner?: SiteSettingsOwner | null;
  };

export const SiteSettingsSchema: z.ZodType<SiteSettingsContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('siteSettings'),
  companyName: z.string(),
  companyLogo: z.object({
    asset: SanityAssetSchema,
  }),
  shortTitle: z.string(),
  baseUrl: z.url(),
  phone: z.string(),
  googleMapsLocation: z.url().nullable(),
  googleMapsLocationPlaceUrl: z.url().nullable(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  alternateName: z.string().optional(),
  socialMedia: z
    .object({
      facebook: z.url().nullable(),
      linkedIn: z.url().nullable(),
      instagram: z.url().nullable(),
    })
    .nullable(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  abn: z.string().optional(),
  recLicence: z.string().optional(),
  businessHours: z.string().optional(),
  establishedYear: z.number().optional(),
  directorName: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  streetAddress: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  openingHours: z
    .object({
      daysOfWeek: z.array(z.string()),
      opensAt: z.string(),
      closesAt: z.string(),
    })
    .optional(),
  owner: z
    .object({
      name: z.string(),
      role: z.string(),
      accreditations: z.array(z.string()).optional(),
    })
    .nullish(),
});

export type ServicesHubContentModel = Pick<SanityServicesHubDoc, '_id' | '_type'> & {
  pageTitle: string | null;
  pageDescription: string | null;
  heading: string | null;
  intro: string[] | null;
};

export const ServicesHubSchema: z.ZodType<ServicesHubContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('servicesHub'),
  pageTitle: z.string().nullable(),
  pageDescription: z.string().nullable(),
  heading: z.string().nullable(),
  intro: z.array(z.string()).nullable(),
});

type SanityTrustSignalItem = NonNullable<SanityHomepageDoc['trustSignals']>[number];

export type TrustSignalContentModel = Required<Pick<SanityTrustSignalItem, 'value' | 'label'>> & { icon: Icon };

export const TrustSignalSchema: z.ZodType<TrustSignalContentModel> = z.object({
  value: z.string(),
  label: z.string(),
  icon: IconSchema,
});

export type ServiceAreaRefContentModel = Pick<SanityLocationPageDoc, '_id'> &
  Required<Pick<SanityLocationPageDoc, 'suburb'>> & { slug: SanitySlug };

export const ServiceAreaRefSchema: z.ZodType<ServiceAreaRefContentModel> = z.object({
  _id: z.string(),
  suburb: z.string(),
  slug: SanitySlugSchema,
});

export type HomepageContentModel = Pick<SanityHomepageDoc, '_id' | '_type'> & {
  mainHeading: string | null;
  subHeading: string | null;
  about?: string[] | null;
  contact: ContactContentModel;
  services: {
    blurbs: string[] | null;
  };
  team: {
    blurbs: string[] | null;
    members: TeamMemberContentModel[];
  };
  training: TrainingContentModel[];
  trustSignals?: TrustSignalContentModel[] | null;
  serviceAreas?: ServiceAreaRefContentModel[] | null;
};

export const HomepageSchema: z.ZodType<HomepageContentModel> = z.object({
  _id: z.string(),
  _type: z.literal('homepage'),
  mainHeading: z.string().nullable(),
  subHeading: z.string().nullable(),
  about: z.array(z.string()).nullable().optional(),
  contact: ContactSchema,
  services: z.object({
    blurbs: z.array(z.string()).nullable(),
  }),
  team: z.object({
    blurbs: z.array(z.string()).nullable(),
    members: z.array(TeamMemberSchema),
  }),
  training: z.array(TrainingSchema),
  trustSignals: z.array(TrustSignalSchema).nullable().optional(),
  serviceAreas: z.array(ServiceAreaRefSchema).nullable().optional(),
});

// ============================================================================
// MAPPED TYPES (for frontend use - repo-owned, no Sanity generated equivalent)
// ============================================================================

export const ImageSchema = z.object({
  url: z.url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const SocialSchema = z.object({
  facebook: z.url().nullable(),
  instagram: z.url().nullable(),
  linkedIn: z.url().nullable(),
  twitter: z.url().nullable(),
});

export const MetaSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// Mapped types as plain TypeScript types (no zod schemas needed)
export type TeamMember = {
  avatar: string;
  fullName: string;
  role: string;
};

export type Training = {
  trainingTitle: string;
  icon: Icon;
};

export type Testimonial = {
  date: string;
  comment: string;
  starRating: number;
  reviewer: {
    profilePhotoUrl: string | null;
    profileUrl: string | null;
    displayName: string;
  };
  url: string | null;
};

export type ServiceItem = {
  id: string;
  name: string;
  blurb: string;
  description: string;
  slug: string;
  linkToReadMore: boolean | null;
  showOnHomepage: boolean | null;
  icon: Icon;
  parentService: { name: string; slug: string } | null;
  featuredImage: {
    src: string;
    alt: string;
  } | null;
  imageGallery:
    | {
        src: string;
        alt: string;
      }[]
    | null;
  content: SanityPortableText | null;
  seoTitle: string | null;
  seoDescription: string | null;
  serviceType: string | null;
  faqs: ServiceFaq[] | null;
};

export type Team = {
  blurbs: string[];
  members: TeamMember[];
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  photo: string;
  publishedAt: string;
  tags: string[];
  body: SanityPortableText;
};

export type SiteSettings = {
  companyName: string;
  alternateName?: string;
  companyLogo: string;
  shortTitle: string;
  baseUrl: string;
  googleMapsLocation: string | null;
  googleMapsLocationPlaceUrl: string | null;
  meta: Meta;
  social: Social;
  phone: string;
  mobile?: string;
  email?: string;
  address?: string;
  abn?: string;
  recLicence?: string;
  businessHours?: string;
  establishedYear?: number;
  directorName?: string;
  latitude?: number;
  longitude?: number;
  streetAddress?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  openingHours?: {
    daysOfWeek: string[];
    opensAt: string;
    closesAt: string;
  };
  owner?: {
    name: string;
    role: string;
    accreditations?: string[];
  };
};

export type LocationPageFaq = {
  question: string;
  answer: string;
};

export type LocationPageServiceRef = {
  id: string;
  name: string;
  blurb: string;
  slug: string;
  icon: Icon;
  parentService: { name: string; slug: string } | null;
};

export type LocationPageNearbySuburbRef = {
  id: string;
  suburb: string;
  slug: string;
};

export type LocationPage = {
  id: string;
  suburb: string;
  slug: string;
  isHub: boolean;
  heroImage: string | null;
  intro: SanityPortableText | null;
  services: LocationPageServiceRef[];
  nearbySuburbs: LocationPageNearbySuburbRef[];
  faqs: LocationPageFaq[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type BasePageProps = {
  pageUrl: string;
  publicConfig: {
    sanityProjectId: string;
    sanityDataset: string;
  };
  siteSettings: SiteSettings;
  services: ServiceItem[];
};

export type ServicesHubContent = {
  pageTitle: string | null;
  pageDescription: string | null;
  heading: string | null;
  intro: string[] | null;
};

export type TrustSignal = {
  value: string;
  label: string;
  icon: Icon;
};

export type ServiceAreaRef = {
  id: string;
  suburb: string;
  slug: string;
};

export type HomePageContent = {
  contact: ContactContentModel;
  services: {
    blurbs: string[] | null;
  };
  mainHeading: string | null;
  subHeading: string | null;
  team: Team;
  training: Training[];
  trustSignals: TrustSignal[];
  serviceAreas: ServiceAreaRef[];
};

export type TermsAndConditionsContent = {
  id: string;
  terms: SanityPortableText;
};

// ============================================================================
// EMAIL TEMPLATE TYPES
// ============================================================================

export type ContactEmailData = ContactFormData;
export type FeedbackEmailData = FeedbackFormData;
export type EmailTemplateData = ContactEmailData | FeedbackEmailData;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Icon = z.infer<typeof IconSchema>;
export type SanityBlock = z.infer<typeof SanityBlockSchema>;
export type SanityPortableText = z.infer<typeof SanityPortableTextSchema>;
export type SanityMarkDef = z.infer<typeof SanityMarkDefSchema>;

export type GoogleReviewer = z.infer<typeof GoogleReviewerSchema>;
export type GoogleReview = z.infer<typeof GoogleReviewSchema>;
export type GoogleReviews = z.infer<typeof GoogleReviewsSchema>;

export type Image = z.infer<typeof ImageSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type Meta = z.infer<typeof MetaSchema>;
