import { createImageUrlBuilder } from '@sanity/image-url';
import Image from 'next/image';

import { useConfig } from '@/hooks/useConfig';
import { useMemo } from 'react';

interface CustomImageProps {
  value: string;
}

export const CustomImage = (props: CustomImageProps) => {
  const { sanityDataset, sanityProjectId } = useConfig();
  const builder = useMemo(
    () =>
      createImageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      }),
    [sanityDataset, sanityProjectId],
  );

  const src = builder.image(props.value).url();
  return (
    <Image
      src={src}
      alt="inline image"
      width={800}
      height={600}
      className="w-full h-auto"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  );
};
