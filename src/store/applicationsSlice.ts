import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "../types/Application";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";

interface ApplicationsState {
  items: Application[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async () => {
    return await getApplications();
  }
);

export const addApplication = createAsyncThunk(
  "applications/addApplication",
  async (application: CreateApplicationInput) => {
    return await createApplication(application);
  }
);

export const editApplication = createAsyncThunk(
  "applications/editApplication",
  async ({
    id,
    application,
  }: {
    id: string;
    application: UpdateApplicationInput;
  }) => {
    return await updateApplication(id, application);
  }
);

export const removeApplication = createAsyncThunk(
  "applications/removeApplication",
  async (id: string) => {
    await deleteApplication(id);
    return id;
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    clearApplicationsError: (state) => {
      state.error = null;
    },

    setApplications: (
      state,
      action: PayloadAction<Application[]>
    ) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchApplications.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load applications.";
      })

      // Add
      .addCase(addApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(addApplication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to create application.";
      })

      // Edit
      .addCase(editApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editApplication.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(editApplication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to update application.";
      })

      // Delete
      .addCase(removeApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeApplication.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })

      .addCase(removeApplication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to delete application.";
      });
  },
});

export const {
  clearApplicationsError,
  setApplications,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;