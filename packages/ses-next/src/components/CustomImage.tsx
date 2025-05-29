import urlBuilder from '@sanity/image-url';

import { useConfig } from '@/hooks/useConfig';
import { useMemo } from 'react';

interface CustomImageProps {
  value: string;
}

export const CustomImage = (props: CustomImageProps) => {
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
