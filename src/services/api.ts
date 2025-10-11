// API service layer for handling HTTP requests
import { PujaCard, User, BlogPost, BlogCategory } from '@/types';

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
}

// Extended PujaCard interface to include benefits and multiple images
interface ExtendedPujaCard extends PujaCard {
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Get auth token from localStorage if available
    let authHeader = null;
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const tokenType = localStorage.getItem('token_type') || 'Bearer';
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

  // OTP-based authentication methods
  async registerWithOtp(name: string, mobile: string): Promise<any> {
    // Register with name and mobile, send OTP
    return this.request<any>('/api/v1/auth/register-with-otp', {
      method: 'POST',
      body: JSON.stringify({ name, mobile, role: 'user' }),
    });
  }

  async requestOtp(mobile: string): Promise<any> {
    return this.request<any>('/api/v1/auth/request-otp', {
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
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path, construct the full URL using the production API domain
    if (imagePath && !imagePath.startsWith('http')) {
      try {
        const trimmedPath = imagePath.trim();
        if (trimmedPath && !trimmedPath.includes(' ') && !trimmedPath.includes('\\') && 
            !trimmedPath.includes('..') && trimmedPath.length > 3) {
          // Use the production API domain as specified
          const baseUrl = 'https://api.33kotidham.com';
          const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
          return fullPath;
        }
      } catch (error) {
        console.warn('Error constructing full image URL:', error);
      }
    }
    
    // Fallback to placeholder
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

  // Transform backend puja to frontend PujaCard
  private transformPuja(backendPuja: BackendPuja): ExtendedPujaCard {
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

    // Format the date - if null, use today's date
    const formattedDate = backendPuja.date || new Date().toISOString().split('T')[0];

    return {
      id: backendPuja.id.toString(),
      image: imageUrl, // Use the constructed image URL
      title: backendPuja.name,
      temple: backendPuja.temple_address || 'Temple Address',
      description: backendPuja.description,
      date: formattedDate,
      benefits: backendPuja.benefits || [],
      images: backendPuja.images || [],
      isNew: false, // We can set this based on created_at if needed
    };
  }

  // Puja API methods - Updated to match admin panel endpoints
  async getPujas(): Promise<ExtendedPujaCard[]> {
    const backendPujas = await this.request<BackendPuja[]>('/api/v1/pujas');
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
}

export const apiService = new ApiService();