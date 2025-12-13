# TypeScript Improvements - Removal of `any` Types

## Summary

This document outlines the comprehensive TypeScript improvements made to the ses-next project to eliminate all `any` type escape hatches and improve type safety throughout the codebase.

## Motivation

The project had numerous `any` type annotations that reduced type safety and made the codebase more error-prone. By leveraging the well-defined Sanity CMS schemas from the `ses-content` package, we were able to create proper TypeScript types for all data structures.

## Changes Made

### 1. New Type Definitions Added to `types.ts`

#### Google Reviews Types

- `GoogleReviewerSchema` - Schema for Google review author information
- `GoogleReviewSchema` - Schema for individual Google reviews
- `GoogleReviewsSchema` - Schema for the complete Google reviews data structure
- Exported corresponding TypeScript types: `GoogleReviewer`, `GoogleReview`, `GoogleReviews`

#### Sanity API Response Types

- `SanityApiResponseSchema` - Schema for raw Sanity API responses
- `SanityMarkDefSchema` - Schema for Sanity portable text mark definitions
- Exported `SanityApiResponse`, `SanityMarkDef` types

#### Email Template Types

- `ContactEmailData` - Type alias for contact form email data
- `FeedbackEmailData` - Type alias for feedback form email data
- `EmailTemplateData` - Union type for all email template data

### 2. Content API Improvements (`lib/content/contentApi.ts`)

**Before:**

```typescript
export const fetchFromApi = async (url: string): Promise<any> => {
  // ...
  return response.json();
};
```

**After:**

```typescript
export const fetchFromApi = async (url: string): Promise<CacheApiResponse> => {
  // ...
  const rawData = (await response.json()) as SanityApiRawResponse;

  // Validate each document in the result array
  const validatedResult = rawData.result.map((item, index) => {
    try {
      return SanityDocumentSchema.parse(item);
    } catch (error) {
      console.warn(`Invalid document at index ${index}:`, error);
      throw new Error(`Failed to validate Sanity document at index ${index}`);
    }
  });

  return { result: validatedResult };
};
```

**Benefits:**

- Runtime validation of all Sanity data using Zod schemas
- Type-safe API responses
- Clear error messages when data doesn't match expected schema

### 3. Content Service Improvements (`lib/content/contentService.ts`)

**Before:**

```typescript
interface ProcessedTermsAndConditions {
  id: string;
  terms: any; // PortableText content
}

type MapperFunction = (fullContent: SanityDocument[], item: Homepage) => any;
```

**After:**

```typescript
export interface ProcessedTermsAndConditions {
  id: string;
  terms: SanityPortableText;
}

type MapperFunction = (
  fullContent: SanityDocument[],
  item: Homepage,
) => ProcessedServiceList | ProcessedTeam | ProcessedTraining[] | string;
```

**Benefits:**

- Proper typing for Sanity Portable Text content
- Type-safe mapper functions with explicit return types
- Exported interfaces for use in components

### 4. Mail Service Improvements (`lib/mailService.ts`)

**Before:**

```typescript
interface SendEmailParams {
  data: Record<string, any>;
  template: string;
  to?: string;
}

export function send({ data, template, to }: SendEmailParams): Promise<any> {
  // ...
}
```

**After:**

```typescript
type EmailData = ContactFormData | FeedbackFormData;

interface SendEmailParams {
  data: EmailData;
  template: string;
  to?: string;
}

export function send({
  data,
  template,
  to = config.emailTo,
}: SendEmailParams): Promise<SES.Types.SendEmailResponse | void> {
  // ...
  const value = data[curr as keyof EmailData];
  return prev.replace(`{{${curr}}}`, String(value));
}
```

**Benefits:**

- Type-safe email data based on form schemas
- Proper AWS SES types
- Type-safe access to email data properties

### 5. API Route Improvements (`pages/api/contact.ts`)

**Before:**

```typescript
type ApiResponse = {
  message: string;
  contact?: ContactFormData;
  err?: any;
};
```

**After:**

```typescript
type ApiResponse = {
  message: string;
  contact?: ContactFormData;
  err?: Error | unknown;
};
```

**Benefits:**

- More specific error typing
- Maintains flexibility while being more descriptive than `any`

### 6. Page Component Improvements

All page components were updated to use proper types:

#### `pages/index.tsx`

- `content: any` → `content: HomePageContentResult`
- `googleReviews: any` → `googleReviews: GoogleReviews`
- Fixed rating value conversions to proper number types
- Removed references to non-existent `about` property

#### `pages/faq.tsx`

- `content: any` → `content: HomePageContentResult`
- `googleReviews: any` → `googleReviews: GoogleReviews`
- Removed `any` from map callback types

#### `pages/blog/index.tsx` and `pages/blog/tag/[tag].tsx`

- `content: any` → `content: HomePageContentResult`
- `googleReviews: any` → `googleReviews: GoogleReviews`
- `blogPosts: any[]` → `blogPosts: ProcessedBlogPost[]`

#### `pages/blog/[slug].tsx`

- `content: any` → `content: HomePageContentResult`
- `post: any` → `post: ProcessedBlogPost`

#### `pages/services/[id].tsx`

- `content: any` → `content: HomePageContentResult`
- `service: any` → `service: ProcessedServiceItem`
- `blogPosts: any[]` → `blogPosts: ProcessedBlogPost[]`
- Added proper null checks for optional service content

#### `pages/terms/index.tsx`

- `content: any` → `content: HomePageContentResult`
- `googleReviews: any` → `googleReviews: GoogleReviews`
- `termsContent: any` → `termsContent: ProcessedTermsAndConditions`

#### `pages/sitemap.xml.tsx`

- Properly typed `content` and `blogPosts` parameters
- Removed `any` from map callbacks

### 7. Component Improvements

#### `components/Services.tsx`

- Made `blurbs` optional in `ServicesData` interface
- Made `linkToReadMore` and `featuredImage` optional in `ServiceItem` interface
- Added null checks for optional properties

#### `components/Hero.tsx`

- Made `mainHeading`, `subHeading`, and `googleReviewsUrl` optional

#### `components/About.tsx`

- Made `googleReviewsUrl` optional

#### `components/Contact.tsx`

- Made `location` optional

### 8. Schema Improvements (`types.ts`)

Updated Portable Text content types:

- `ProcessedServiceItemSchema.content` - Changed from `z.any()` to `SanityPortableTextSchema`
- `ProcessedBlogPostSchema.body` - Changed from `z.any()` to `SanityPortableTextSchema`
- `SanityBlockSchema.markDefs` - Changed from `z.array(z.any())` to `z.array(SanityMarkDefSchema)`

## Results

### Type Safety Improvements

- ✅ Zero `any` types remaining in the codebase
- ✅ All TypeScript checks passing (`npm run type:check`)
- ✅ All linting checks passing (`npm run lint`)
- ✅ Code properly formatted

### Benefits Achieved

1. **Better IDE Support**: Full autocomplete and type inference throughout the codebase
2. **Compile-Time Safety**: Catch type errors during development instead of at runtime
3. **Better Documentation**: Types serve as inline documentation for data structures
4. **Refactoring Confidence**: TypeScript will catch breaking changes when refactoring
5. **Runtime Validation**: Zod schemas provide both compile-time types and runtime validation
6. **Schema-Driven Development**: All types derived from Sanity CMS schemas ensure consistency

## Migration Notes

### For Future Development

1. **Never use `any`**: If you're tempted to use `any`, create a proper type or use `unknown` instead
2. **Use Zod schemas**: For external data, create Zod schemas that provide both types and validation
3. **Keep types in sync**: When updating Sanity schemas, update corresponding TypeScript types
4. **Optional vs Required**: Be explicit about optional fields to avoid runtime errors
5. **Type assertions**: Avoid type assertions (`as`) unless absolutely necessary; prefer type guards

### Common Patterns Established

```typescript
// ✅ Good: Proper typing with optional handling
const service = content.services.items.find(item => item.slug === slug);
if (service?.content) {
  return <PortableText value={service.content} />;
}

// ❌ Bad: Using any
const service = content.services.items.find((item: any) => item.slug === slug);
return <PortableText value={service.content} />;

// ✅ Good: Union types for email data
type EmailData = ContactFormData | FeedbackFormData;

// ❌ Bad: Loose typing
interface SendEmailParams {
  data: Record<string, any>;
}

// ✅ Good: Validated API responses
const rawData = await response.json();
const validatedData = SanityDocumentSchema.parse(rawData);

// ❌ Bad: Unvalidated any
const data: any = await response.json();
```

## Testing

All existing tests continue to pass with the improved types. The type system now provides an additional layer of testing by catching type errors at compile time.

## Conclusion

The removal of `any` types from the ses-next project has significantly improved code quality, developer experience, and runtime safety. The types are now derived directly from the Sanity CMS schemas, ensuring consistency between the content model and the frontend application.
