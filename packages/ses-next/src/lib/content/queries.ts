// ============================================================================
// GROQ QUERIES
// ============================================================================

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  companyName,
  alternateName,
  companyLogo {
    _type,
    asset -> {
      _type,
      _id,
      url
    }
  },
  shortTitle,
  baseUrl,
  phone,
  googleMapsLocation,
  googleMapsLocationPlaceUrl,
  meta,
  socialMedia,
  mobile,
  email,
  address,
  abn,
  recLicence,
  businessHours,
  owner
}`;

export const homepageQuery = `*[_type == "homepage"][0]{
  _id,
  _type,
  mainHeading,
  subHeading,
  about,
  contact,
  services {
    blurbs,
  },
  team {
    blurbs,
    members[] -> {
      _id,
      _type,
      name,
      role,
      avatar{
        asset->{
          _type,
          _id,
          url
        }
      }
    }
  },
  training[]->{
    _id,
    _type,
    trainingTitle,
    icon
  },
}`;

export const servicesQuery = `*[_type == "service"]{
  _id,
  _type,
  name,
  description,
  blurb,
  slug,
  linkToReadMore,
  showOnHomepage,
  icon,
  seoTitle,
  seoDescription,
  serviceType,
  showcase[] -> {
    _id,
    _type,
    title,
    photo {
      _type,
      asset->{
        _id,
        _type,
        url
      }
    },
    featured
  },
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _type,
        _id,
        url
      }
    }
  },
  "faqs": coalesce(faqs[]{ question, answer }, null),
  parentService -> {
    name,
    slug
  }
}`;

export const allBlogPostsQuery = `*[_type == "blog-post"] | order(publishedAt desc){
  _id,
  _type,
  title,
  description,
  slug,
  photo {
    _type,
    asset -> {
      _type,
      _id,
      url
    }
  },
  publishedAt,
  tags,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _type,
        _id,
        url
      }
    }
  }
}`;

export const blogPostBySlugQuery = `*[_type == "blog-post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  description,
  slug,
  photo {
    _type,
    asset->{
      _type,
      _id,
      url
    }
  },
  publishedAt,
  tags,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _type,
        _id,
        url
      }
    }
  }
}`;

export const allFaqsQuery = `*[_type == "faq"]{
  _id,
  _type,
  question,
  answer
}`;

export const servicesHubQuery = `*[_type == "servicesHub"][0]{
  _id,
  _type,
  pageTitle,
  pageDescription,
  heading,
  intro
}`;

export const allLocationPagesQuery = `*[_type == "locationPage"]{
  _id,
  _type,
  suburb,
  slug,
  isHub
}`;

export const locationPageBySlugQuery = `*[_type == "locationPage" && slug.current == $slug][0]{
  _id,
  _type,
  suburb,
  slug,
  isHub,
  heroImage {
    _type,
    asset->{
      _type,
      _id,
      url
    }
  },
  intro[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _type,
        _id,
        url
      }
    }
  },
  services[]->{
    _id,
    _type,
    name,
    blurb,
    slug,
    icon,
    parentService->{
      name,
      slug
    }
  },
  nearbySuburbs[]->{
    _id,
    _type,
    suburb,
    slug
  },
  "faqs": coalesce(faqs[]{ _key, question, answer }, []),
  seoTitle,
  seoDescription
}`;

export const locationPagesByServiceSlugsQuery = `*[_type == "locationPage" && count(services[@->slug.current in $serviceSlugs]) > 0] | order(suburb asc){
  _id,
  _type,
  suburb,
  slug
}`;

export const termsAndConditionsQuery = `*[_type == "terms-and-conditions"]{
  _id,
  _type,
  terms[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _type,
        _id,
        url
      }
    }
  }
}`;
