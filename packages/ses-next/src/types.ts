import { z } from 'zod';

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
// ============================================================================

export const IconSchema = z.enum([
  'air',
  'bars-staggered',
  'bolt',
  'facebook',
  'height',
  'light',
  'linked-in',
  'mobile',
  'phone',
  'plug',
  'power',
  'recycle',
  'space',
  'tick-circle',
  'signal-tower',
  'wrench',
  'warning',
  'x',
]);

export const SanityImageSchema = z.object({
  _type: z.literal('image'),
  asset: z.object({
    _id: z.string().optional(),
    url: z.url(),
  }),
});

export const SanitySlugSchema = z.object({
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
// DOCUMENT SCHEMAS (Based on Sanity schemas)
// ============================================================================

export const FAQSchema = z.object({
  _type: z.literal('faq'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  question: z.string(),
  answer: z.string(),
});

export const TrainingSchema = z.object({
  _type: z.literal('training'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  trainingTitle: z.string(),
  icon: IconSchema,
});

export const ShowcaseSchema = z.object({
  _type: z.literal('showcase'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  title: z.string(),
  photo: SanityImageSchema,
  featured: z.boolean().nullable(),
});

export const ServiceSchema = z.object({
  _type: z.literal('service'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  name: z.string(),
  description: z.string(),
  blurb: z.string(),
  slug: SanitySlugSchema,
  linkToReadMore: z.boolean().nullable(),
  icon: IconSchema,
  showcase: z.array(ShowcaseSchema).nullable(),
  content: SanityPortableTextSchema.nullable(),
});

export const TermsAndConditionsSchema = z.object({
  _type: z.literal('terms-and-conditions'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  terms: SanityPortableTextSchema,
});

export const ContactSchema = z.object({
  phone: z.string(),
  blurbs: z.array(z.string()).nullable(),
  callBack: z.string().nullable(),
});

// ============================================================================
// CONTENT MODEL SCHEMAS (GROQ query results with resolved references)
// ============================================================================

const SanityAssetSchema = z.object({
  url: z.url(),
});

export const TeamMemberSchema = z.object({
  _id: z.string(),
  _type: z.literal('teamMember'),
  name: z.string(),
  role: z.string(),
  avatar: z.object({
    asset: SanityAssetSchema,
  }),
});

export const BlogPostSchema = z.object({
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

export const SiteSettingsSchema = z.object({
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
  socialMedia: z
    .object({
      facebook: z.url().nullable(),
      linkedIn: z.url().nullable(),
      instagram: z.url().nullable(),
    })
    .nullable(),
});

export const HomepageSchema = z.object({
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
});

// ============================================================================
// MAPPED TYPES (for frontend use - no schemas needed, manually constructed)
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
  icon: Icon;
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
  companyLogo: string;
  shortTitle: string;
  baseUrl: string;
  googleMapsLocation: string | null;
  googleMapsLocationPlaceUrl: string | null;
  meta: Meta;
  social: Social;
  phone: string;
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

export type HomePageContent = {
  contact: ContactContentModel;
  services: {
    blurbs: string[] | null;
  };
  mainHeading: string | null;
  subHeading: string | null;
  team: Team;
  training: Training[];
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
export type SanityImage = z.infer<typeof SanityImageSchema>;
export type SanitySlug = z.infer<typeof SanitySlugSchema>;
export type SanityBlock = z.infer<typeof SanityBlockSchema>;
export type SanityPortableText = z.infer<typeof SanityPortableTextSchema>;
export type SanityMarkDef = z.infer<typeof SanityMarkDefSchema>;

export type GoogleReviewer = z.infer<typeof GoogleReviewerSchema>;
export type GoogleReview = z.infer<typeof GoogleReviewSchema>;
export type GoogleReviews = z.infer<typeof GoogleReviewsSchema>;

export type FAQ = z.infer<typeof FAQSchema>;
export type SanityTermsAndConditions = z.infer<typeof TermsAndConditionsSchema>;

export type ShowcaseContentModel = z.infer<typeof ShowcaseSchema>;
export type ServiceContentModel = z.infer<typeof ServiceSchema>;
export type TeamMemberContentModel = z.infer<typeof TeamMemberSchema>;
export type BlogPostContentModel = z.infer<typeof BlogPostSchema>;
export type TrainingContentModel = z.infer<typeof TrainingSchema>;
export type SiteSettingsContentModel = z.infer<typeof SiteSettingsSchema>;
export type HomepageContentModel = z.infer<typeof HomepageSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type ContactContentModel = z.infer<typeof ContactSchema>;
