import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { apiService } from '@/services/api';
import { storeAuthToken, clearAuthToken, getAuthToken } from '@/utils/auth';

// Initialize state with stored auth token if available
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const { token } = getAuthToken();
    if (token) {
      // User has a token, mark as authenticated but will fetch full user info
      return {
        user: {
          id: 0,
          name: '',
          email: '',
          isAuthenticated: true,
        },
        isLoading: false,
        error: null,
      };
    }
  }
  return {
    user: null,
    isLoading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, mobile }: { name: string; mobile: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.registerWithOtp(name, mobile);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

export const registerWithOtp = createAsyncThunk(
  'auth/registerWithOtp',
  async ({ name, mobile }: { name: string; mobile: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.registerWithOtp(name, mobile);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (mobile: string, { rejectWithValue }) => {
    try {
      const response = await apiService.requestOtp(mobile);
      // If the response contains requires_registration: true, we should pass it through
      // instead of treating it as an error
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to request OTP');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ mobile, otpCode }: { mobile: string; otpCode: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.verifyOtp(mobile, otpCode);
      // Store the token in both localStorage and cookies
      storeAuthToken(response.access_token, response.token_type);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to verify OTP');
    }
  }
);

// Add new thunk for fetching user information
export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user information');
    }
  }
);

// Add new thunk for updating user information
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiService.updateUserInfo(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user information');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      
      // Store the token if it's in the action payload
      if (action.payload.access_token && action.payload.token_type) {
        storeAuthToken(action.payload.access_token, action.payload.token_type);
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      
      // Clear auth token from localStorage and cookies
      clearAuthToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerWithOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerWithOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerWithOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(requestOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: 0,
          name: 'User',
          email: '',
          mobile: '',
          isAuthenticated: true,
          access_token: action.payload.access_token,
          token_type: action.payload.token_type,
        };
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add cases for fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
          isAuthenticated: true,
        };
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // If fetching user info fails (e.g., invalid token), clear user state
        state.user = null;
        clearAuthToken();
      })
      // Add cases for updateUserInfo
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
          isAuthenticated: true,
        };
        state.error = null;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export default authSlice.reducer;