import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
type DataTypes = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
};

type InitialStateProps = {
  loading: boolean;
  data: DataTypes | null;
  error: string;
};

export const initialState: InitialStateProps = {
  loading: false,
  data: null,
  error: "",
};

export const fetchIp = createAsyncThunk("geo/fetchIp", async (ip: string) => {
  const response = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${
      import.meta.env.VITE_API_KEY
    }&ipAddress=${ip}`
  );
  return response.data;
});

export const fetchAddress = createAsyncThunk(
  "geo/fetchAddress",
  async (address: string) => {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_API_KEY
      }&domain=${address}`
    );
    return response.data;
  }
);

const geoApi = createSlice({
  name: "ip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchIp.fulfilled,
      (state, action: PayloadAction<DataTypes>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchIp.rejected, (state) => {
      state.loading = false;
      state.data = null;
      state.error = "Not Found";
    });
    builder.addCase(fetchAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAddress.fulfilled,
      (state, action: PayloadAction<DataTypes>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchAddress.rejected, (state) => {
      state.loading = false;
      state.data = null;
      state.error = "Not Found";
    });
  },
});

export default geoApi.reducer;
