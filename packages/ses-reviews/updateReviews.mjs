import fs from 'fs';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = 'ChIJaaS9pMFn1moR6nbln1twd9A'; // Storm Electrical Solutions

const REVIEWS_FILE_PATH = 'data/reviews.json';
const RATING_FILE_PATH = 'data/rating.json';

/**
 * Fetch place details including reviews from Google Places API
 */
async function fetchPlaceDetails() {
  const url = 'https://places.googleapis.com/v1/places/' + PLACE_ID;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask':
        'id,displayName,rating,userRatingCount,reviews.name,reviews.rating,reviews.text,reviews.relativePublishTimeDescription,reviews.publishTime,reviews.authorAttribution',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch place details: ${response.status} ${error}`);
  }

  return response.json();
}

/**
 * Transform Google Places API review format to our internal format
 */
function transformReview(apiReview) {
  return {
    id: apiReview.name, // Use the review resource name as unique ID
    url: apiReview.authorAttribution?.uri || '',
    reviewer: {
      profileUrl: apiReview.authorAttribution?.uri || '',
      profilePhotoUrl: apiReview.authorAttribution?.photoUri || '',
      displayName: apiReview.authorAttribution?.displayName || 'Anonymous',
    },
    comment: apiReview.text?.text || '',
    starRating: apiReview.rating || 0,
    date: apiReview.relativePublishTimeDescription || '',
    publishTime: apiReview.publishTime || null, // ISO 8601 timestamp for sorting
  };
}

/**
 * Load existing reviews from file
 */
function loadExistingReviews() {
  try {
    if (fs.existsSync(REVIEWS_FILE_PATH)) {
      const data = fs.readFileSync(REVIEWS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.reviews || [];
    }
  } catch (err) {
    console.warn('Could not load existing reviews:', err.message);
  }
  return [];
}

/**
 * Merge new reviews with existing ones, avoiding duplicates
 */
function mergeReviews(existingReviews, newReviews) {
  const existingIds = new Set(existingReviews.map((r) => r.id));
  const uniqueNewReviews = newReviews.filter((r) => !existingIds.has(r.id));

  console.log(`Existing reviews: ${existingReviews.length}`);
  console.log(`New reviews from API: ${newReviews.length}`);
  console.log(`Unique new reviews to add: ${uniqueNewReviews.length}`);

  return [...existingReviews, ...uniqueNewReviews];
}

/**
 * Sort reviews by publish time (newest first)
 */
function sortReviewsByDate(reviews) {
  return reviews.sort((a, b) => {
    const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
    const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
    return timeB - timeA; // Descending order (newest first)
  });
}

/**
 * Save reviews to file
 */
function saveReviews(reviews) {
  const data = { reviews };
  fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(data, null, 2));
  console.log(`Saved ${reviews.length} total reviews to ${REVIEWS_FILE_PATH}`);
}

/**
 * Save rating data to file
 */
function saveRating(placeData) {
  const ratingData = {
    overallRatingValue: String(placeData.rating || 0),
    numberOfReviews: `${placeData.userRatingCount || 0} reviews`,
  };
  fs.writeFileSync(RATING_FILE_PATH, JSON.stringify(ratingData, null, 2));
  console.log(`Saved rating data to ${RATING_FILE_PATH}`);
}

/**
 * Main execution
 */
(async () => {
  console.log('Starting Google Places API fetch...');

  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Error: GOOGLE_PLACES_API_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    // Fetch place details from Google Places API
    const placeData = await fetchPlaceDetails();
    console.log(`Fetched data for: ${placeData.displayName?.text || 'Unknown'}`);
    console.log(`Rating: ${placeData.rating} (${placeData.userRatingCount} reviews)`);

    // Save rating data
    saveRating(placeData);

    // Transform API reviews to our format
    const apiReviews = placeData.reviews || [];
    const transformedReviews = apiReviews.map(transformReview);

    // Load existing reviews and merge
    const existingReviews = loadExistingReviews();
    const mergedReviews = mergeReviews(existingReviews, transformedReviews);

    // Sort reviews by date (newest first)
    const sortedReviews = sortReviewsByDate(mergedReviews);

    // Save merged reviews
    saveReviews(sortedReviews);

    console.log('Successfully updated reviews and rating data');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
