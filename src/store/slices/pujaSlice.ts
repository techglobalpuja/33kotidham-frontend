import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PujaCard } from '@/types';
import { apiService } from '@/services/api';

interface PujaState {
  pujas: PujaCard[];
  selectedPuja: PujaCard | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PujaState = {
  pujas: [],
  selectedPuja: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching pujas
export const fetchPujas = createAsyncThunk(
  'puja/fetchPujas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getPujas();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch pujas');
    }
  }
);

// Async thunk for fetching a single puja by ID
export const fetchPujaById = createAsyncThunk(
  'puja/fetchPujaById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getPujaById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch puja');
    }
  }
);

const pujaSlice = createSlice({
  name: 'puja',
  initialState,
  reducers: {
    setPujas: (state, action: PayloadAction<PujaCard[]>) => {
      state.pujas = action.payload;
    },
    setSelectedPuja: (state, action: PayloadAction<PujaCard | null>) => {
      state.selectedPuja = action.payload;
    },
    addPuja: (state, action: PayloadAction<PujaCard>) => {
      state.pujas.push(action.payload);
    },
    updatePuja: (state, action: PayloadAction<PujaCard>) => {
      const index = state.pujas.findIndex(puja => puja.id === action.payload.id);
      if (index !== -1) {
        state.pujas[index] = action.payload;
      }
    },
    deletePuja: (state, action: PayloadAction<string>) => {
      state.pujas = state.pujas.filter(puja => puja.id !== action.payload);
    },
    setPujaLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPujaError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch pujas cases
    builder
      .addCase(fetchPujas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPujas.fulfilled, (state, action: PayloadAction<PujaCard[]>) => {
        state.isLoading = false;
        state.pujas = action.payload;
        state.error = null;
      })
      .addCase(fetchPujas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch puja by ID cases
      .addCase(fetchPujaById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPujaById.fulfilled, (state, action: PayloadAction<PujaCard>) => {
        state.isLoading = false;
        state.selectedPuja = action.payload;
        state.error = null;
      })
      .addCase(fetchPujaById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPujas,
  setSelectedPuja,
  addPuja,
  updatePuja,
  deletePuja,
  setPujaLoading,
  setPujaError,
} = pujaSlice.actions;

export default pujaSlice.reducer;