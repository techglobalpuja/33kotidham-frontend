import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PujaCard, Plan } from '@/types';
import { apiService } from '@/services/api';

// Extended PujaCard interface to include benefits and multiple images
interface BackendPujaBenefit {
  id: number;
  benefit_title: string;
  benefit_description: string;
  puja_id: number;
  created_at: string;
}

interface BackendPujaImage {
  id: number;
  image_url: string;
}

interface BackendChadawa {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  requires_note: boolean;
}

interface ExtendedPujaCard extends PujaCard {
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
  chadawas?: BackendChadawa[];
  temple_image_url?: string;
  plan_ids?: number[];
  selectedPlans?: Plan[];
  created_at?: string; 
  time?: string; 
}

interface PujaState {
  pujas: ExtendedPujaCard[];
  selectedPuja: ExtendedPujaCard | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PujaState = {
  pujas: [],
  selectedPuja: null,
  isLoading: false,
  error: null,
};

// Define a type for the error
interface ApiError {
  message: string;
}

// Async thunk for fetching pujas
export const fetchPujas = createAsyncThunk(
  'puja/fetchPujas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getPujas();
      return response;
    } catch (error: unknown) {
      // Type guard to check if error has a message property
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as ApiError).message || 'Failed to fetch pujas');
      }
      return rejectWithValue('Failed to fetch pujas');
    }
  }
);

// Async thunk for fetching a single puja by ID
export const fetchPujaById = createAsyncThunk(
  'puja/fetchPujaById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getPujaById(id);
      console.log("response----",response);
      return response;
    } catch (error: unknown) {
      // Type guard to check if error has a message property
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as ApiError).message || 'Failed to fetch puja');
      }
      return rejectWithValue('Failed to fetch puja');
    }
  }
);

const pujaSlice = createSlice({
  name: 'puja',
  initialState,
  reducers: {
    setPujas: (state, action: PayloadAction<ExtendedPujaCard[]>) => {
      state.pujas = action.payload;
    },
    setSelectedPuja: (state, action: PayloadAction<ExtendedPujaCard | null>) => {
      state.selectedPuja = action.payload;
    },
    addPuja: (state, action: PayloadAction<ExtendedPujaCard>) => {
      state.pujas.push(action.payload);
    },
    updatePuja: (state, action: PayloadAction<ExtendedPujaCard>) => {
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
      .addCase(fetchPujas.fulfilled, (state, action: PayloadAction<ExtendedPujaCard[]>) => {
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
      .addCase(fetchPujaById.fulfilled, (state, action: PayloadAction<ExtendedPujaCard>) => {
        console.log("action.payload",action.payload);
        console.log("temple_image_url in payload:", action.payload.temple_image_url);
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