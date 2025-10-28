import { z } from 'zod';

// ============================================================================
// FORM SCHEMAS
// ============================================================================

export const ContactFormDataSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
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

export const SanityImageAssetSchema = z.object({
  _ref: z.string(),
  _type: z.literal('reference'),
});

export const SanityImageSchema = z.object({
  asset: SanityImageAssetSchema,
  _type: z.literal('image'),
});

export const SanitySlugSchema = z.object({
  current: z.string(),
  _type: z.literal('slug'),
});

export const SanityReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.literal('reference'),
});

export const SanityMarkDefSchema = z
  .object({
    _key: z.string(),
    _type: z.string(),
  })
  .passthrough();

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
  profileUrl: z.string().url(),
  profilePhotoUrl: z.string().url(),
  displayName: z.string(),
});

export const GoogleReviewSchema = z.object({
  id: z.string(),
  url: z.string().url(),
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
// SANITY API RESPONSE SCHEMAS
// ============================================================================

export const SanityApiResponseSchema = z.object({
  result: z.array(z.unknown()),
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

export const TeamMemberSchema = z.object({
  _type: z.literal('teamMember'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  name: z.string(),
  role: z.string(),
  avatar: SanityImageSchema,
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

export const TestimonialSchema = z.object({
  _type: z.literal('testimonial'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  fullName: z.string(),
  comment: z.string(),
  rating: z.number().min(1).max(5),
  profileImgUrl: z.string().optional(),
  date: z.string().optional(),
  reviewUrl: z.string().optional(),
});

export const ShowcaseSchema = z.object({
  _type: z.literal('showcase'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  title: z.string(),
  photo: SanityImageSchema,
  featured: z.boolean().optional(),
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
  linkToReadMore: z.boolean().optional(),
  icon: IconSchema,
  showcase: z.array(SanityReferenceSchema).optional(),
  content: SanityPortableTextSchema.optional(),
});

export const BlogPostSchema = z.object({
  _type: z.literal('blog-post'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  title: z.string(),
  description: z.string(),
  slug: SanitySlugSchema,
  photo: SanityImageSchema,
  publishedAt: z.string(),
  tags: z.array(z.string()),
  body: SanityPortableTextSchema,
});

export const TermsAndConditionsSchema = z.object({
  _type: z.literal('terms-and-conditions'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  terms: SanityPortableTextSchema,
});

export const HomepageSchema = z.object({
  _type: z.literal('homepage'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  companyName: z.string(),
  companyLogo: SanityImageSchema,
  mainHeading: z.string().optional(),
  subHeading: z.string().optional(),
  shortTitle: z.string(),
  about: z.array(z.string()).optional(),
  baseUrl: z.string().url(),
  contact: z.object({
    blurbs: z.array(z.string()).optional(),
    callBack: z.string().optional(),
    phone: z.string(),
  }),
  googleMapsLocation: z.string().url().optional(),
  googleMapsLocationPlaceUrl: z.string().url().optional(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  socialMedia: z
    .object({
      facebook: z.string().url().optional(),
      linkedIn: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
  services: z.object({
    blurbs: z.array(z.string()).optional(),
    items: z.array(SanityReferenceSchema),
  }),
  team: z.object({
    blurbs: z.array(z.string()).optional(),
    members: z.array(SanityReferenceSchema),
  }),
  training: z.array(SanityReferenceSchema),
  testimonials: z.array(SanityReferenceSchema),
});

// ============================================================================
// SANITY ASSET SCHEMAS
// ============================================================================

export const SanityImageAssetDocumentSchema = z.object({
  _type: z.literal('sanity.imageAsset'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  url: z.string().url(),
  originalFilename: z.string().optional(),
  size: z.number().optional(),
  metadata: z
    .object({
      dimensions: z
        .object({
          width: z.number(),
          height: z.number(),
        })
        .optional(),
    })
    .optional(),
});

// ============================================================================
// UNION SCHEMA FOR ALL DOCUMENTS
// ============================================================================

export const SanityDocumentSchema = z.union([
  FAQSchema,
  TeamMemberSchema,
  TrainingSchema,
  TestimonialSchema,
  ShowcaseSchema,
  ServiceSchema,
  BlogPostSchema,
  TermsAndConditionsSchema,
  HomepageSchema,
  SanityImageAssetDocumentSchema,
]);

// ============================================================================
// PROCESSED/MAPPED SCHEMAS (for frontend use)
// ============================================================================

export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const SocialSchema = z.object({
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedIn: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

export const MetaSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const ContactSchema = z.object({
  phone: z.string(),
  email: z.string().email().optional(),
  blurbs: z.array(z.string()).optional(),
  callBack: z.string().optional(),
});

export const ProcessedTeamMemberSchema = z.object({
  avatar: z.string().url(),
  fullName: z.string(),
  role: z.string(),
});

export const ProcessedTrainingSchema = z.object({
  trainingTitle: z.string(),
  icon: IconSchema,
});

export const ProcessedTestimonialSchema = z.object({
  date: z.string(),
  comment: z.string(),
  starRating: z.number().min(1).max(5),
  reviewer: z.object({
    profilePhotoUrl: z.string().url().optional(),
    profileUrl: z.string().url().optional(),
    displayName: z.string(),
  }),
  url: z.string().url().optional(),
});

export const ProcessedServiceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  blurb: z.string(),
  description: z.string(),
  slug: z.string(),
  linkToReadMore: z.boolean().optional(),
  icon: IconSchema,
  featuredImage: z
    .object({
      src: z.string().url(),
      alt: z.string(),
    })
    .optional(),
  imageGallery: z
    .array(
      z.object({
        src: z.string().url(),
        alt: z.string(),
      }),
    )
    .optional(),
  content: SanityPortableTextSchema.optional(),
});

export const ProcessedServiceListSchema = z.object({
  blurbs: z.array(z.string()).optional(),
  items: z.array(ProcessedServiceItemSchema),
});

export const ProcessedTeamSchema = z.object({
  blurbs: z.array(z.string()).optional(),
  members: z.array(ProcessedTeamMemberSchema),
});

export const ProcessedBlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  photo: z.string().url(),
  publishedAt: z.string(),
  tags: z.array(z.string()),
  body: SanityPortableTextSchema,
});

export const LayoutContentSchema = z.object({
  companyName: z.string(),
  companyLogo: z.string().url(),
  contact: ContactSchema,
  meta: MetaSchema,
  services: ProcessedServiceListSchema,
  shortTitle: z.string(),
  social: SocialSchema,
});

export const BasePagePropsSchema = z.object({
  pageUrl: z.string(),
  publicConfig: z.object({
    sanityProjectId: z.string(),
    sanityDataset: z.string(),
  }),
  content: z.unknown(),
});

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
export type SanityReference = z.infer<typeof SanityReferenceSchema>;
export type SanityBlock = z.infer<typeof SanityBlockSchema>;
export type SanityPortableText = z.infer<typeof SanityPortableTextSchema>;
export type SanityMarkDef = z.infer<typeof SanityMarkDefSchema>;
export type SanityApiResponse = z.infer<typeof SanityApiResponseSchema>;

export type GoogleReviewer = z.infer<typeof GoogleReviewerSchema>;
export type GoogleReview = z.infer<typeof GoogleReviewSchema>;
export type GoogleReviews = z.infer<typeof GoogleReviewsSchema>;

export type FAQ = z.infer<typeof FAQSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type Training = z.infer<typeof TrainingSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Showcase = z.infer<typeof ShowcaseSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type TermsAndConditions = z.infer<typeof TermsAndConditionsSchema>;
export type Homepage = z.infer<typeof HomepageSchema>;
export type SanityImageAssetDocument = z.infer<typeof SanityImageAssetDocumentSchema>;
export type SanityDocument = z.infer<typeof SanityDocumentSchema>;

export type Image = z.infer<typeof ImageSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type ProcessedTeamMember = z.infer<typeof ProcessedTeamMemberSchema>;
export type ProcessedTraining = z.infer<typeof ProcessedTrainingSchema>;
export type ProcessedTestimonial = z.infer<typeof ProcessedTestimonialSchema>;
export type ProcessedServiceItem = z.infer<typeof ProcessedServiceItemSchema>;
export type ProcessedServiceList = z.infer<typeof ProcessedServiceListSchema>;
export type ProcessedTeam = z.infer<typeof ProcessedTeamSchema>;
export type ProcessedBlogPost = z.infer<typeof ProcessedBlogPostSchema>;
export type LayoutContent = z.infer<typeof LayoutContentSchema>;
export type BasePageProps = z.infer<typeof BasePagePropsSchema>;

// Legacy interfaces for backward compatibility - aligned with ProcessedServiceItem
export interface ServiceItem {
  id: string;
  name: string;
  blurb: string;
  description: string;
  slug: string;
  linkToReadMore?: boolean;
  icon: Icon;
  featuredImage?: {
    src: string;
    alt: string;
  };
  imageGallery?: {
    src: string;
    alt: string;
  }[];
  content?: SanityPortableText;
}

export interface ServiceList {
  blurbs?: string[];
  items: ServiceItem[];
}
