import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Chadawa } from '@/types';
import { apiService } from '@/services/api';

interface ChadawaState {
  chadawas: Chadawa[];
  selectedChadawa: Chadawa | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChadawaState = {
  chadawas: [],
  selectedChadawa: null,
  isLoading: false,
  error: null,
};

// Define a type for the error
interface ApiError {
  message: string;
}

// Async thunk for fetching all chadawas
export const fetchChadawas = createAsyncThunk(
  'chadawa/fetchChadawas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getChadawas();
      return response;
    } catch (error: unknown) {
      // Type guard to check if error has a message property
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as ApiError).message || 'Failed to fetch chadawas');
      }
      return rejectWithValue('Failed to fetch chadawas');
    }
  }
);

// Async thunk for fetching a single chadawa by ID
export const fetchChadawaById = createAsyncThunk(
  'chadawa/fetchChadawaById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiService.getChadawaById(id);
      return response;
    } catch (error: unknown) {
      // Type guard to check if error has a message property
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as ApiError).message || 'Failed to fetch chadawa');
      }
      return rejectWithValue('Failed to fetch chadawa');
    }
  }
);



const chadawaSlice = createSlice({
  name: 'chadawa',
  initialState,
  reducers: {
    setChadawas: (state, action: PayloadAction<Chadawa[]>) => {
      state.chadawas = action.payload;
    },
    setSelectedChadawa: (state, action: PayloadAction<Chadawa | null>) => {
      state.selectedChadawa = action.payload;
    },
    addChadawa: (state, action: PayloadAction<Chadawa>) => {
      state.chadawas.push(action.payload);
    },
    updateChadawa: (state, action: PayloadAction<Chadawa>) => {
      const index = state.chadawas.findIndex(chadawa => chadawa.id === action.payload.id);
      if (index !== -1) {
        state.chadawas[index] = action.payload;
      }
    },
    deleteChadawa: (state, action: PayloadAction<number>) => {
      state.chadawas = state.chadawas.filter(chadawa => chadawa.id !== action.payload);
    },
    setChadawaLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setChadawaError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch chadawas cases
    builder
      .addCase(fetchChadawas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChadawas.fulfilled, (state, action: PayloadAction<Chadawa[]>) => {
        state.isLoading = false;
        state.chadawas = action.payload;
        state.error = null;
      })
      .addCase(fetchChadawas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch chadawa by ID cases
      .addCase(fetchChadawaById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChadawaById.fulfilled, (state, action: PayloadAction<Chadawa>) => {
        state.isLoading = false;
        state.selectedChadawa = action.payload;
        state.error = null;
      })
      .addCase(fetchChadawaById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

  },
});

export const {
  setChadawas,
  setSelectedChadawa,
  addChadawa,
  updateChadawa,
  deleteChadawa,
  setChadawaLoading,
  setChadawaError,
} = chadawaSlice.actions;

export default chadawaSlice.reducer;