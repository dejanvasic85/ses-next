import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = 'ChIJaaS9pMFn1moR6nbln1twd9A'; // Storm Electrical Solutions
const RATING_FILE_PATH = 'data/rating.json';

/**
 * Fetch place details from Google Places API
 */
async function fetchPlaceDetails() {
  const url = 'https://places.googleapis.com/v1/places/' + PLACE_ID;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch place details: ${response.status} ${error}`);
  }

  return response.json();
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
  console.log(`Rating: ${ratingData.overallRatingValue} (${ratingData.numberOfReviews})`);
}

/**
 * Main execution
 */
(async () => {
  console.log('Starting Google rating update...');

  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Error: GOOGLE_PLACES_API_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    const placeData = await fetchPlaceDetails();
    console.log(`Fetched data for: ${placeData.displayName?.text || 'Unknown'}`);

    saveRating(placeData);

    console.log('Successfully updated rating data');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
