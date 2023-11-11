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

type FakeProps = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

// type Twoprops = {
//   id: number;
//   name: string;
// };s

type InitialStateProps = {
  loading: boolean;
  data: DataTypes | null;
  dataOne: Array<FakeProps>;
  error: string;
};

export const initialState: InitialStateProps = {
  loading: false,
  data: null,
  dataOne: [],
  error: "",
};

export const fetchIp = createAsyncThunk("geo/fetchIp", async (ip: string) => {
  const response = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_o2oFIVIC0sDawmgVdW6qsFSA6iGyn&ipAddress=${ip}`
  );
  return response.data;
});

export const fetchAddress = createAsyncThunk(
  "geo/fetchAddress",
  async (address: string) => {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_o2oFIVIC0sDawmgVdW6qsFSA6iGyn&domain=${address}`
    );
    return response.data;
  }
);
export const fetchUsers = createAsyncThunk("geo/fetchUsers", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  return response.data;
});

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
      state.error = "Not Found" || "something";
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
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<Array<FakeProps>>) => {
        state.dataOne = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state) => {
      state.dataOne = [];
      state.error = "Not Found";
    });
  },
});

export default geoApi.reducer;
