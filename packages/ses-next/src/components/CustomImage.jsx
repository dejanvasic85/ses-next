import urlBuilder from '@sanity/image-url';

import { useConfig } from '@/src/hooks/useConfig';
import { useMemo } from 'react';

export const CustomImage = (props) => {
  const { sanityDataset, sanityProjectId } = useConfig();
  const builder = useMemo(
    () =>
      urlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      }),
    [sanityDataset, sanityProjectId],
  );

  const src = builder.image(props.value).url();
  return <img src={src} alt="inline image" />;
};
