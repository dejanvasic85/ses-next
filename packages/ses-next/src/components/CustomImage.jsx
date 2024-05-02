import urlBuilder from '@sanity/image-url';

import { config } from '../lib/config';

const builder = urlBuilder({
  projectId: config.sanityProjectId,
  dataset: config.sanityDataset,
});

export const CustomImage = (props) => {
  const src = builder.image(props.value).url();
  return <img src={src} alt="inline image" />;
};
