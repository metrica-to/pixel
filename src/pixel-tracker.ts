import { PixelTrackingPayload } from './types';

export default class PixelTracker {
  private trackRequest(payload: PixelTrackingPayload) {
    const stringifiedPayload = JSON.stringify(payload);
    const url = `http://localhost:9876/track?data=${btoa(stringifiedPayload)}`;
    const img = new Image();
    img.src = url;
  }

  track(event: string, category: string) {
    console.log('track', event, category);
    const payload: PixelTrackingPayload = {
      tracking: {
        type: 'event',
        identity: 'sample-user-id',
        event,
        category,
        ua: navigator.userAgent,
        referrer: 'sample-referrer',
      },
      siteId: 'sample-site-id',
    };
    this.trackRequest(payload);
  }

  page(path: string) {
    this.track(path, 'Page View');
  }
}
