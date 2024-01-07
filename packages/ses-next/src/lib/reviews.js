import fs from 'fs/promises';

export async function getReviews() {
  return fs.readFile('./data/reviews.json', 'utf8').then(JSON.parse);
}
