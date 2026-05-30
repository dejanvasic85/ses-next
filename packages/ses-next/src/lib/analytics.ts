type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

export function pushEvent(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
