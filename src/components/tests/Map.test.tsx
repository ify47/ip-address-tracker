import { Map } from "../Map"; // Import your Map component
import { test, vi } from "vitest";
import { renderWithProviders } from "./utils/test-utils";

// Mock react-leaflet functions
vi.mock("react-leaflet", () => ({
  useMap: () => ({
    flyTo: vi.fn(),
    getZoom: vi.fn(() => 13),
  }),
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Marker: () => <div></div>,
  TileLayer: () => <div></div>,
}));

// Mock redux store
const mockStore = {
  geoData: {
    loading: false,
    data: {
      ip: "", // Mock value
      location: {
        country: "", // Mock value
        region: "", // Mock value
        city: "", // Mock value
        lat: 12.34,
        lng: 56.78,
        postalCode: "", // Mock value
        timezone: "", // Mock value
        geonameId: 0, // Mock value
      },
      domains: [], // Mock value
      as: {
        asn: 0, // Mock value
        name: "", // Mock value
        route: "", // Mock value
        domain: "", // Mock value
        type: "", // Mock value
      },
      isp: "", // Mock value
    },
    dataOne: [], // Mock value or actual mock data if needed
    error: "", // Mock value
  },
};

test("Map renders with initial state", () => {
  renderWithProviders(<Map />, {
    preloadedState: mockStore,
  });
});
