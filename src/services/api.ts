// API service layer for handling HTTP requests
import { PujaCard, User, BlogPost, Plan, BlogCategory, Chadawa, BookingResponse, Temple, BackendProduct, BackendProductDetail, BackendProductCategory } from '@/types';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.33kotidham.in';

// Define the backend puja structure based on the new API response
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

interface BackendPuja {
  id: number;
  name: string;
  sub_heading: string;
  description: string;
  date: string | null;
  time: string | null;
  temple_image_url: string | null;
  temple_address: string | null;
  temple_description: string | null;
  prasad_price: number;
  is_prasad_active: boolean;
  dakshina_prices_inr: string | null;
  dakshina_prices_usd: string | null;
  is_dakshina_active: boolean;
  manokamna_prices_inr: string | null;
  manokamna_prices_usd: string | null;
  is_manokamna_active: boolean;
  category: string;
  created_at: string;
  updated_at: string;
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
  plan_ids: number[];
  chadawas?: BackendChadawa[];
}

// Extended PujaCard interface to include benefits and multiple images
interface ExtendedPujaCard extends PujaCard {
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
  chadawas?: BackendChadawa[];
  temple_description?: string;
  temple_image_url?: string;
  prasad_price?: number;
  is_prasad_active?: boolean;
  dakshina_prices_inr?: string;
  dakshina_prices_usd?: string;
  is_dakshina_active?: boolean;
  manokamna_prices_inr?: string;
  manokamna_prices_usd?: string;
  is_manokamna_active?: boolean;
  plan_ids?: number[];
  selectedPlans?: Plan[];
  created_at?: string; // Add created_at field
  time?: string; // Add time field,
  sub_heading?: string;
}

// Define the backend plan structure based on the API response
interface BackendPlan {
  id: number;
  name: string;
  description: string;
  image_url: string;
  actual_price: string;
  discounted_price: string;
  created_at: string;
}

// Define interfaces for the registerWithOtp and requestOtp response types
interface RegisterWithOtpResponse {
  message: string;
  requires_registration?: boolean;
  mobile?: string;
}

interface RequestOtpResponse {
  message: string;
  requires_registration?: boolean;
  mobile?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Get auth token from localStorage or cookies if available
    let authHeader = null;
    if (typeof window !== 'undefined') {
      // Try localStorage first
      const token = localStorage.getItem('auth_token');
      const tokenType = localStorage.getItem('token_type') || 'Bearer';
      if (token) {
        authHeader = `${tokenType} ${token}`;
      }
    } else {
      // For server-side rendering, try cookies
      const cookies = parseCookies();
      const token = cookies.auth_token;
      const tokenType = cookies.token_type || 'Bearer';
      if (token) {
        authHeader = `${tokenType} ${token}`;
      }
    }

    // If no token found in localStorage, try to get from cookies (client-side)
    if (!authHeader && typeof window !== 'undefined') {
      const cookies = parseCookies();
      const token = cookies.auth_token;
      const tokenType = cookies.token_type || 'Bearer';
      if (token) {
        authHeader = `${tokenType} ${token}`;
      }
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { 'Authorization': authHeader } : {}),
        ...options?.headers,
      },
      ...options,
    };

    console.log(`Making API request to: ${url}`);
    if (authHeader) {
      console.log('Using authorization header');
    }

    try {
      const response = await fetch(url, config);

      // Even for successful responses, check if it contains requires_registration
      const responseText = await response.text();
      console.log('API Response Text:', responseText);

      // If response is empty, return empty object
      if (!responseText) {
        return {} as T;
      }

      try {
        // Try to parse as JSON first
        const responseData = JSON.parse(responseText);
        console.log('API Response Data:', responseData);

        // Check for the exact response structure you specified:
        // { "message": "User not found. Please register first.", "requires_registration": true, "mobile": "7858855555" }
        if (responseData.requires_registration === true) {
          // Return the response data instead of throwing an error
          // This allows the frontend to handle the registration flow properly
          return responseData as T;
        }

        if (!response.ok) {
          // Handle other error responses
          let errorMessage = `API Error: ${response.status} ${response.statusText}`;
          if (responseData.message) {
            errorMessage = responseData.message;
          } else if (responseData.detail) {
            errorMessage = responseData.detail;
          } else {
            // If parsing fails, use the raw error text if available
            if (responseText) errorMessage += ` - ${responseText}`;
          }
          throw new Error(errorMessage);
        }

        return responseData;
      } catch (parseError) {
        // If parsing fails but response is OK, return the raw text or empty object
        // For OTP requests, we often expect an empty successful response
        if (response.status === 200 || response.status === 201 || response.status === 204) {
          try {
            // Try to parse as JSON one more time, but don't throw if it fails
            return JSON.parse(responseText) as T;
          } catch {
            // If it's not valid JSON, return empty object for successful responses
            return {} as T;
          }
        }

        // For non-OK responses that aren't JSON, throw a generic error
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // For other cases, re-throw the parsing error
        throw parseError;
      }
    } catch (error) {
      // Handle network errors or other fetch issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection and try again.');
      }
      throw error;
    }
  }

  // Auth API methods
  async login(email: string, password: string, clientId: string = '', clientSecret: string = ''): Promise<User> {
    const loginUrl = `${API_BASE_URL.replace(/\/api$/, '')}/auth/token`;

    // Create form data for OAuth2 token request
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('scope', '');
    formData.append('client_id', clientId); // Add client ID if provided
    formData.append('client_secret', clientSecret); // Add client secret if provided

    console.log('Login URL:', loginUrl);
    console.log('Form data:', formData.toString());

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Login failed: ${response.status} ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorData.error_description || errorData.error || errorMessage;
        } catch {
          // If parsing fails, use the raw error text
          if (errorText) errorMessage += ` - ${errorText}`;
        }
        throw new Error(errorMessage);
      }

      const tokenData = await response.json();
      console.log('Token response:', JSON.stringify(tokenData, null, 2));

      // Return a minimal user object with the token
      return {
        id: 0, // Placeholder ID
        email,
        name: email.split('@')[0], // Use email username as display name
        isAuthenticated: true,
        access_token: tokenData.access_token,
        token_type: tokenData.token_type || 'Bearer',
      } as User;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(name: string, email: string, mobile: string, password: string, role: string = 'user'): Promise<User> {
    return this.request<User>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, mobile, password, role }),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Add new method to fetch user information
  async getUserInfo(): Promise<User> {
    return this.request<User>('/api/v1/auth/me');
  }

  // Add new method to update user information
  async updateUserInfo(userData: Partial<User>): Promise<User> {
    return this.request<User>('/api/v1/auth/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // OTP-based authentication methods
  async registerWithOtp(name: string, mobile: string): Promise<RegisterWithOtpResponse> {
    // Register with name and mobile, send OTP
    return this.request<RegisterWithOtpResponse>('/api/v1/auth/register-with-otp', {
      method: 'POST',
      body: JSON.stringify({ name, mobile, role: 'user' }),
    });
  }

  async requestOtp(mobile: string): Promise<RequestOtpResponse> {
    return this.request<RequestOtpResponse>('/api/v1/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
    });
  }

  async verifyOtp(mobile: string, otpCode: string): Promise<{ access_token: string; token_type: string }> {
    return this.request<{ access_token: string; token_type: string }>('/api/v1/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp_code: otpCode }),
    });
  }

  // Helper function to validate image URLs
  private isValidImageUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      // Check if it's a valid HTTP/HTTPS URL with a proper hostname
      const isValidProtocol = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
      const hasValidHostname = parsedUrl.hostname && parsedUrl.hostname.length > 0 &&
        !parsedUrl.hostname.includes(' ') && parsedUrl.hostname !== '.';

      // For localhost URLs, we'll be more permissive but still validate basic structure
      if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1') {
        return isValidProtocol && !!hasValidHostname && !!parsedUrl.port && parsedUrl.port.length > 0;
      }

      return isValidProtocol && !!hasValidHostname;
    } catch {
      return false;
    }
  }

  // Helper function to construct full image URL
  private constructImageUrl(imagePath: string): string {
    console.log('API Service - Constructing image URL for:', imagePath);
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      console.log('API Service - Returning full URL as is:', imagePath);
      return imagePath;
    }

    // If it's a relative path, construct the full URL using the production API domain
    if (imagePath && !imagePath.startsWith('http')) {
      try {
        const trimmedPath = imagePath.trim();
        console.log('API Service - Trimmed path:', trimmedPath);
        if (trimmedPath && trimmedPath.length > 0) {
          // Use the production API domain as specified
          const baseUrl = 'https://api.33kotidham.com';
          const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
          console.log('API Service - Constructed full path:', fullPath);
          return fullPath;
        }
      } catch (error) {
        console.warn('Error constructing full image URL:', error);
      }
    }

    // Fallback to placeholder
    console.log('API Service - Returning placeholder for:', imagePath);
    return '/placeholder.jpg';
  }

  // Blog API methods
  async getAllBlogs(skip: number = 0, limit: number = 100, featuredOnly: boolean = false, categoryId: number | null = null): Promise<BlogPost[]> {
    let url = `/api/v1/blogs/?skip=${skip}&limit=${limit}&featured_only=${featuredOnly}`;
    if (categoryId !== null) {
      url += `&category_id=${categoryId}`;
    }
    return this.request<BlogPost[]>(url);
  }

  async searchBlogs(query: string, skip: number = 0, limit: number = 100): Promise<BlogPost[]> {
    return this.request<BlogPost[]>(`/api/v1/blogs/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`);
  }

  async getFeaturedBlogs(limit: number = 10): Promise<BlogPost[]> {
    return this.request<BlogPost[]>(`/api/v1/blogs/featured?limit=${limit}`);
  }

  async getBlogById(blogId: number): Promise<BlogPost> {
    return this.request<BlogPost>(`/api/v1/blogs/${blogId}`);
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    return this.request<BlogCategory[]>('/api/v1/blogs/categories/?skip=0&limit=50&active_only=true');
  }

  // Transform backend puja to frontend PujaCard
  private transformPuja(backendPuja: BackendPuja): ExtendedPujaCard {
    console.log('Backend puja data:', backendPuja);
    // Get the first valid image URL if available, otherwise use temple_image_url
    let imageUrl = '';

    // Try to get image from the images array first (this is the primary source as per project specifications)
    if (backendPuja.images && backendPuja.images.length > 0) {
      // Look for the first valid image URL
      for (const image of backendPuja.images) {
        if (image.image_url) {
          // Use the first image from the images array
          imageUrl = this.constructImageUrl(image.image_url);
          break; // Use the first valid image
        }
      }
    }

    // If no valid image from images array, try temple_image_url
    if (!imageUrl && backendPuja.temple_image_url) {
      imageUrl = this.constructImageUrl(backendPuja.temple_image_url);
    }

    console.log('Temple image URL from backend:', backendPuja.temple_image_url);
    console.log('Constructed temple image URL:', this.constructImageUrl(backendPuja.temple_image_url || ''));

    // Format the date - if null, use today's date
    const formattedDate = backendPuja.date || new Date().toISOString().split('T')[0];

    const result = {
      id: backendPuja.id.toString(),
      image: imageUrl, // Use the constructed image URL,
      sub_heading: backendPuja.sub_heading,
      title: backendPuja.name,
      temple: backendPuja.temple_address || 'Temple Address',
      description: backendPuja.description,
      date: formattedDate,
      time: backendPuja.time || undefined, // Add time field
      benefits: backendPuja.benefits || [],
      images: backendPuja.images || [],
      temple_description: backendPuja.temple_description || undefined,
      temple_image_url: backendPuja.temple_image_url || undefined,
      prasad_price: backendPuja.prasad_price,
      is_prasad_active: backendPuja.is_prasad_active,
      dakshina_prices_inr: backendPuja.dakshina_prices_inr || undefined,
      dakshina_prices_usd: backendPuja.dakshina_prices_usd || undefined,
      is_dakshina_active: backendPuja.is_dakshina_active,
      manokamna_prices_inr: backendPuja.manokamna_prices_inr || undefined,
      manokamna_prices_usd: backendPuja.manokamna_prices_usd || undefined,
      is_manokamna_active: backendPuja.is_manokamna_active,
      plan_ids: backendPuja.plan_ids,
      chadawas: backendPuja.chadawas || [], // Add chadawas field
      isNew: false, // We can set this based on created_at if needed
      created_at: backendPuja.created_at, // Add created_at field
    };

    console.log('Transformed puja result:', result);
    return result;
  }

  // Puja API methods - Updated to match admin panel endpoints
  async getPujas(): Promise<ExtendedPujaCard[]> {
    const backendPujas = await this.request<BackendPuja[]>('/api/v1/pujas?is_active=true');
    // Transform the backend data to match PujaCard interface
    return backendPujas.map(this.transformPuja.bind(this));
  }

  async getPujaById(id: string): Promise<ExtendedPujaCard> {
    const backendPuja = await this.request<BackendPuja>(`/api/v1/pujas/${id}`);
    // Transform the backend data to match PujaCard interface
    return this.transformPuja(backendPuja);
  }

  async createPuja(puja: Omit<ExtendedPujaCard, 'id'>): Promise<ExtendedPujaCard> {
    // For now, we'll keep the existing implementation
    return this.request<ExtendedPujaCard>('/api/v1/pujas', {
      method: 'POST',
      body: JSON.stringify(puja),
    });
  }

  async updatePuja(id: string, puja: Partial<ExtendedPujaCard>): Promise<ExtendedPujaCard> {
    // For now, we'll keep the existing implementation
    return this.request<ExtendedPujaCard>(`/api/v1/pujas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(puja),
    });
  }

  async deletePuja(id: string): Promise<void> {
    return this.request<void>(`/api/v1/pujas/${id}`, {
      method: 'DELETE',
    });
  }

  // Transform backend plan to frontend Plan
  private transformPlan(backendPlan: BackendPlan): Plan {
    return {
      id: backendPlan.id.toString(),
      name: backendPlan.name,
      price: parseFloat(backendPlan.discounted_price),
      image: this.constructImageUrl(backendPlan.image_url),
      category: 'Normal', // Default category, can be updated if needed
      description: {
        feature1: backendPlan.description,
        feature2: '',
        feature3: '',
        feature4: ''
      },
      isActive: true,
      createdDate: backendPlan.created_at,
      actualPrice: parseFloat(backendPlan.actual_price),
      discountedPrice: parseFloat(backendPlan.discounted_price)
    };
  }

  // Chadawa API methods
  async getChadawas(skip: number = 0, limit: number = 100): Promise<Chadawa[]> {
    return this.request<Chadawa[]>(`/api/v1/chadawas/?skip=${skip}&limit=${limit}`);
  }

  async getChadawaById(id: number): Promise<Chadawa> {
    return this.request<Chadawa>(`/api/v1/chadawas/${id}`);
  }

  // Plan API methods
  async getPlanById(id: number): Promise<Plan> {
    const backendPlan = await this.request<BackendPlan>(`/api/v1/plans/${id}`);
    return this.transformPlan(backendPlan);
  }

  // Booking API methods
  async createRazorpayBooking(bookingData: {
    puja_id: number;
    plan_id: number;
    booking_date: string;
    mobile_number: string;
    whatsapp_number: string;
    gotra: string;
    chadawas: BackendChadawa[];
    chadawa_ids: number[];
  }): Promise<{ razorpay_order_id: string; razorpay_order: { amount: number; currency: string }; booking: { id: number } }> {
    return this.request<{ razorpay_order_id: string; razorpay_order: { amount: number; currency: string }; booking: { id: number } }>('/api/v1/bookings/razorpay-booking', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async verifyPayment(params: {
    booking_id: number;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ success: boolean; message: string }> {
    const { booking_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
    return this.request<{ success: boolean; message: string }>(
      `/api/v1/bookings/verify-payment?booking_id=${booking_id}&razorpay_order_id=${razorpay_order_id}&razorpay_payment_id=${razorpay_payment_id}&razorpay_signature=${razorpay_signature}`,
      {
        method: 'POST',
      }
    );
  }

  async getBookingById(bookingId: number): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/api/v1/bookings/${bookingId}`);
  }

  // User Bookings API methods
  async getMyBookings(skip: number = 0, limit: number = 100): Promise<BookingResponse[]> {
    return this.request<BookingResponse[]>(`/api/v1/bookings/my?skip=${skip}&limit=${limit}`);
  }

  // Temple API methods
  async getTemples(skip: number = 0, limit: number = 100): Promise<Temple[]> {
    return this.request<Temple[]>(`/api/v1/temples/?skip=${skip}&limit=${limit}`);
  }

  async getTempleById(id: number): Promise<Temple> {
    return this.request<Temple>(`/api/v1/temples/${id}`);
  }

  // Product API methods
  async getProducts(skip: number = 0, limit: number = 100, categoryId?: number, isActive?: boolean, isFeatured?: boolean, search?: string): Promise<BackendProduct[]> {
    let url = `/api/v1/products/?skip=${skip}&limit=${limit}`;

    if (categoryId !== undefined) {
      url += `&category_id=${categoryId}`;
    }

    if (isActive !== undefined) {
      url += `&is_active=${isActive}`;
    }

    if (isFeatured !== undefined) {
      url += `&is_featured=${isFeatured}`;
    }

    if (search !== undefined) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return this.request<BackendProduct[]>(url);
  }

  async getProductById(productId: number): Promise<BackendProductDetail> {
    return this.request<BackendProductDetail>(`/api/v1/products/${productId}`);
  }

  // Add method for fetching product categories
  async getProductCategories(skip: number = 0, limit: number = 100, isActive?: boolean): Promise<BackendProductCategory[]> {
    let url = `/api/v1/products/categories?skip=${skip}&limit=${limit}`;

    if (isActive !== undefined) {
      url += `&is_active=${isActive}`;
    }

    return this.request<BackendProductCategory[]>(url);
  }

  // Store Order API methods
  async createOrder(orderData: {
    shipping_name: string;
    shipping_mobile: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_pincode: string;
    notes: string;
    items: Array<{ product_id: number; quantity: number }>;
    promo_code?: string;
    payment_method: 'online' | 'cod';
  }): Promise<import('@/types').OrderResponse> {
    return this.request<import('@/types').OrderResponse>('/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async createRazorpayOrderPayment(orderId: number): Promise<import('@/types').RazorpayOrderResponse> {
    return this.request<import('@/types').RazorpayOrderResponse>(`/api/v1/order-payments/create-razorpay-order?order_id=${orderId}`, {
      method: 'POST',
      body: '',
    });
  }

  async verifyOrderPayment(params: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ success: boolean; message: string }> {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
    return this.request<{ success: boolean; message: string }>(
      `/api/v1/order-payments/verify-payment?razorpay_order_id=${razorpay_order_id}&razorpay_payment_id=${razorpay_payment_id}&razorpay_signature=${razorpay_signature}`,
      {
        method: 'POST',
      }
    );
  }

  // Panchang API method - Using Next.js API route (server-side)
  async fetchBasicPanchang(params: {
    date: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    timezone: number;
    time?: string;
    [key: string]: string | number | { latitude: number; longitude: number } | undefined; // Allow additional parameters
  }): Promise<{
    day: string;
    tithi: string;
    yog: string;
    nakshatra: string;
    karan: string;
    sunrise: string;
    sunset: string;
  }> {
    try {
      // Call our Next.js API route
      const response = await fetch('/api/panchang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Panchang data:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();