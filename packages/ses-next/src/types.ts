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
  baseUrl: z.url(),
  contact: z.object({
    blurbs: z.array(z.string()).optional(),
    callBack: z.string().optional(),
    phone: z.string(),
  }),
  googleMapsLocation: z.url().optional(),
  googleMapsLocationPlaceUrl: z.url().optional(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  socialMedia: z
    .object({
      facebook: z.url().optional(),
      linkedIn: z.url().optional(),
      instagram: z.url().optional(),
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

export const SiteSettingsSchema = z.object({
  _type: z.literal('siteSettings'),
  _id: z.string(),
  _rev: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  companyName: z.string(),
  companyLogo: SanityImageSchema,
  shortTitle: z.string(),
  baseUrl: z.url(),
  googleMapsLocation: z.url().optional(),
  googleMapsLocationPlaceUrl: z.url().optional(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  socialMedia: z
    .object({
      facebook: z.url().optional(),
      linkedIn: z.url().optional(),
      instagram: z.url().optional(),
    })
    .optional(),
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
  url: z.url(),
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
  SiteSettingsSchema,
  SanityImageAssetDocumentSchema,
]);

// ============================================================================
// CONTENT MODEL SCHEMAS (GROQ query results with resolved references)
// ============================================================================

const SanityAssetSchema = z.object({
  url: z.string().url(),
});

export const ShowcaseContentModelSchema = z
  .object({
    _id: z.string(),
    _type: z.literal('showcase'),
    title: z.string(),
    featured: z.boolean().nullable(),
    photo: z.object({
      asset: SanityAssetSchema,
    }),
  })
  .passthrough();

export const ServiceContentModelSchema = z
  .object({
    _id: z.string(),
    _type: z.literal('service'),
    name: z.string(),
    description: z.string(),
    blurb: z.string(),
    slug: SanitySlugSchema,
    linkToReadMore: z.boolean().nullable(),
    icon: IconSchema,
    content: SanityPortableTextSchema.nullable(),
    showcase: z.array(ShowcaseContentModelSchema).nullable(),
  })
  .passthrough();

export const TeamMemberContentModelSchema = z
  .object({
    _id: z.string(),
    _type: z.literal('teamMember'),
    name: z.string(),
    role: z.string(),
    avatar: z.object({
      asset: SanityAssetSchema,
    }),
  })
  .passthrough();

export const BlogPostContentModelSchema = z
  .object({
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
  })
  .passthrough();

export const TrainingContentModelSchema = TrainingSchema;
export const TestimonialContentModelSchema = TestimonialSchema;

export const SiteSettingsContentModelSchema = z
  .object({
    _id: z.string(),
    _type: z.literal('siteSettings'),
    companyName: z.string(),
    companyLogo: z.object({
      asset: SanityAssetSchema,
    }),
    shortTitle: z.string(),
    baseUrl: z.string().url(),
    googleMapsLocation: z.string().url().nullable(),
    googleMapsLocationPlaceUrl: z.string().url().nullable(),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    socialMedia: z
      .object({
        facebook: z.string().url().nullable(),
        linkedIn: z.string().url().nullable(),
        instagram: z.string().url().nullable(),
      })
      .nullable(),
  })
  .passthrough();

export const HomepageContentModelSchema = z
  .object({
    _id: z.string(),
    _type: z.literal('homepage'),
    companyName: z.string(),
    companyLogo: z.object({
      asset: SanityAssetSchema,
    }),
    mainHeading: z.string().nullable(),
    subHeading: z.string().nullable(),
    shortTitle: z.string(),
    baseUrl: z.string().url(),
    contact: z.object({
      blurbs: z.array(z.string()).nullable(),
      callBack: z.string().nullable(),
      phone: z.string(),
    }),
    googleMapsLocation: z.string().url().nullable(),
    googleMapsLocationPlaceUrl: z.string().url().nullable(),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    socialMedia: z
      .object({
        facebook: z.string().url().nullable(),
        linkedIn: z.string().url().nullable(),
        instagram: z.string().url().nullable(),
      })
      .nullable(),
    services: z.object({
      blurbs: z.array(z.string()).nullable(),
      items: z.array(ServiceContentModelSchema),
    }),
    team: z.object({
      blurbs: z.array(z.string()).nullable(),
      members: z.array(TeamMemberContentModelSchema),
    }),
    training: z.array(TrainingContentModelSchema),
  })
  .passthrough();

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

export const ContactSchema = z.object({
  phone: z.string(),
  email: z.email().nullable(),
  blurbs: z.array(z.string()).nullable(),
  callBack: z.string().nullable(),
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

export type ServiceList = {
  blurbs: string[] | null;
  items: ServiceItem[];
};

export type Team = {
  blurbs: string[] | null;
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
  contact: {
    phone: string;
    blurbs: string[] | null;
    callBack: string | null;
  };
  services: ServiceList;
};

export type LayoutContent = {
  companyName: string;
  companyLogo: string;
  contact: {
    phone: string;
    blurbs: string[] | null;
    callBack: string | null;
  };
  meta: Meta;
  services: ServiceList;
  shortTitle: string;
  social: Social;
};

export type BasePageProps = {
  pageUrl: string;
  publicConfig: {
    sanityProjectId: string;
    sanityDataset: string;
  };
  content: SiteSettings;
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

// Common types
export type Icon = z.infer<typeof IconSchema>;
export type SanityImage = z.infer<typeof SanityImageSchema>;
export type SanitySlug = z.infer<typeof SanitySlugSchema>;
export type SanityReference = z.infer<typeof SanityReferenceSchema>;
export type SanityBlock = z.infer<typeof SanityBlockSchema>;
export type SanityPortableText = z.infer<typeof SanityPortableTextSchema>;
export type SanityMarkDef = z.infer<typeof SanityMarkDefSchema>;
export type SanityApiResponse = z.infer<typeof SanityApiResponseSchema>;

// Google Reviews types
export type GoogleReviewer = z.infer<typeof GoogleReviewerSchema>;
export type GoogleReview = z.infer<typeof GoogleReviewSchema>;
export type GoogleReviews = z.infer<typeof GoogleReviewsSchema>;

// Raw Sanity document types (with Sanity prefix to avoid conflicts)
export type SanityFAQ = z.infer<typeof FAQSchema>;
export type SanityTeamMember = z.infer<typeof TeamMemberSchema>;
export type SanityTraining = z.infer<typeof TrainingSchema>;
export type SanityTestimonial = z.infer<typeof TestimonialSchema>;
export type SanityShowcase = z.infer<typeof ShowcaseSchema>;
export type SanityService = z.infer<typeof ServiceSchema>;
export type SanityBlogPost = z.infer<typeof BlogPostSchema>;
export type SanityTermsAndConditions = z.infer<typeof TermsAndConditionsSchema>;
export type SanityHomepage = z.infer<typeof HomepageSchema>;
export type SanitySiteSettings = z.infer<typeof SiteSettingsSchema>;
export type SanityImageAssetDocument = z.infer<typeof SanityImageAssetDocumentSchema>;
export type SanityDocument = z.infer<typeof SanityDocumentSchema>;

// ContentModel types (GROQ query results with resolved references)
export type ShowcaseContentModel = z.infer<typeof ShowcaseContentModelSchema>;
export type ServiceContentModel = z.infer<typeof ServiceContentModelSchema>;
export type TeamMemberContentModel = z.infer<typeof TeamMemberContentModelSchema>;
export type BlogPostContentModel = z.infer<typeof BlogPostContentModelSchema>;
export type TrainingContentModel = z.infer<typeof TrainingContentModelSchema>;
export type SiteSettingsContentModel = z.infer<typeof SiteSettingsContentModelSchema>;
export type HomepageContentModel = z.infer<typeof HomepageContentModelSchema>;

// Other helper types
export type Image = z.infer<typeof ImageSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Contact = z.infer<typeof ContactSchema>;

// Mapped types (BlogPost, ServiceItem, ServiceList, Team, TeamMember, Training)
// and LayoutContent, BasePageProps are defined above as plain TypeScript types (no schemas)
