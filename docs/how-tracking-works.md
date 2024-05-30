### How Tracking works?

1. Track page views for active page
2. Handle `history.pushState` changes for a site
   - Capture the original `pushState` function part of the history object and override it to call the original + our functionality
   - needs to play nice with arbitrary embedding of the pixel script
   - SPA is loaded once so we would capture only a single page-view
3. Handle the older `hashChanged` for the site.
   - this enables us to deal with the SPA scenarios
   - add an event-listener for the `hashchange` [event](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)
   -

```js
addEventListener(type, listener, useCapture);
```

We leverage this `useCapture` param to see events bubble up (bottom-to-top).
Example, if you have a div and a child button:

```html
<div>
  <button />
</div>
```

and you have `onClick` listeners for both, if we clicked the button, then it would activate the onclick on the div as well.
