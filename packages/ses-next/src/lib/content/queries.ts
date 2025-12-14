// ============================================================================
// GROQ QUERIES
// ============================================================================

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  companyName,
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
  socialMedia
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
  icon,
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
