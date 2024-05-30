import { PixelTrackingPayload } from './types';

export default class PixelTracker {
  private id: string = '';
  private siteId: string = '';
  private referrer: string = '';
  private isTouch: boolean = false;

  constructor(siteId: string, ref: string) {
    this.siteId = siteId;
    this.referrer = ref;
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const customId = this.getSession('id');
    if (customId) {
      this.id = customId;
    }
  }

  private getSession(key: string) {
    key = `__mtr_${key}__`;

    const s = localStorage.getItem(key);
    if (!s) return null;
    return JSON.parse(s);
  }

  private setSession(key: string, value: any) {
    key = `__mtr_${key}__`;
    localStorage.setItem(key, JSON.stringify(value));
  }

  identify(customId: string) {
    this.id = customId;
    this.setSession('id', customId);
  }

  private trackRequest(payload: PixelTrackingPayload) {
    const stringifiedPayload = JSON.stringify(payload);
    const url = `http://localhost:9876/track?data=${btoa(stringifiedPayload)}`;
    const img = new Image();
    img.src = url;
  }

  track(event: string, category: string) {
    const payload: PixelTrackingPayload = {
      tracking: {
        type: category == 'Page View' ? 'page' : 'event',
        identity: this.id,
        ua: navigator.userAgent,
        event: event,
        category: category,
        referrer: this.referrer,
        isTouchDevice: this.isTouch,
      },
      siteId: this.siteId,
    };
    this.trackRequest(payload);
  }

  page(path: string) {
    this.track(path, 'Page View');
  }
}
