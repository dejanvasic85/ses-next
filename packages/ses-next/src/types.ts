export interface BasePageProps {
  pageUrl: string;
  publicConfig: {
    sanityProjectId: string;
    sanityDataset: string;
  };
  content: Record<string, unknown>;
}
