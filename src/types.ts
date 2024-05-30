export interface PixelTrackingData {
  type: 'event' | 'page';
  identity: string;
  ua: string;
  event: string;
  category: string;
  referrer: string;
  isTouchDevice: boolean;
}

export interface PixelTrackingPayload {
  tracking: PixelTrackingData;
  siteId: string;
}
