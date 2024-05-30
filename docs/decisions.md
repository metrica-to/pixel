### Design Decisions

> Using Image (1x1 pixel) to run tracking functionality?

There's 3 ways to perform an HTTP request:

1. `XMLHttpRequest` which is old
2. Loading an image
3. Newer `fetch` API

KISS — since option 1 is archaic, we consider options between 2 and 3.

For option 3:

- we'd need to do a POST request to our back-end server
- adds more complexity, more lines of code
  - doing an HTTP POST from code that's not part of the same origin as the back-end server will need the back-end to deal with cross-origin resource issues to allow external domains or such requests
  - the above is not \*_really_ an issue to configure, but there exists the simpler option 2 and we can solve things using just an HTTP GET

For option 2:

- loading an image on a page is an http GET request
- simple and quick to do
  - use querystring of the image/url to pass data
- we don't necessarily need a POST request on every operation for this type of tracking application since this data is not private
- avoid CORS issues
- less lines of code to maintain
- one trade-off is if there are errors, they will appear in the console, but the same happens for fetch

When we hit the back-end, we retrieve the bytes for the image (1 by 1 pixel)

We will base64 encode the data for transmission, just like e-mail attachments.
There technically is no limit to the data-length in a query string, but for performance and use-case, we can adhere to a max data length in the querty strings of `4096`, or 2^11.

We deserialize the base64 date on the server and get the tracking info.
