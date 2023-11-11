import { HttpResponse, delay, http } from "msw";
import { setupServer } from "msw/node";

export const posts = {
  ip: "8.8.8.8",
  location: {
    country: "US",
    region: "California",
    city: "Mountain View",
    lat: 37.40599,
    lng: -122.078514,
    postalCode: "94043",
    timezone: "-07:00",
    geonameId: 5375481,
  },
  domains: [
    "0d2.net",
    "003725.com",
    "0f6.b0094c.cn",
    "007515.com",
    "0guhi.jocose.cn",
  ],
  as: {
    asn: 15169,
    name: "Google LLC",
    route: "8.8.8.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
};

// We use msw to intercept the network request during the test,
// and return the response  after 150ms
// when receiving a get request to the `geo/ipify` endpoint

export const handlers = [
  http.get("https://geo.ipify.org/api/v2/country,city", async ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get("ipAddress");

    if (!productId) {
      return new HttpResponse(null, { status: 404 });
    }

    await delay(150);
    return HttpResponse.json(posts, { status: 200 });
  }),
];

export const server = setupServer(...handlers);
