// API service layer for handling HTTP requests
import { PujaCard, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.33kotidham.in';

// Define the backend puja structure
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
  benefits: any[];
  images: { id: number; image_url: string }[];
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
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to parse error response as JSON
      try {
        const errorText = await response.text();
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // If parsing fails, use the raw error text if available
          if (errorText) errorMessage += ` - ${errorText}`;
        }
        
        throw new Error(errorMessage);
      } catch {
        // If any error occurs during error handling, throw the original error
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
    }
    
    return response.json();
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

  async register(email: string, password: string, name?: string): Promise<User> {
    // Keep for backward compatibility
    return this.signup(name || '', email, '', password);
  }

  async logout(): Promise<void> {
    return this.request<void>('/api/auth/logout', {
      method: 'POST',
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

  // Transform backend puja to frontend PujaCard
  private transformPuja(backendPuja: BackendPuja): PujaCard {
    // Get the first valid image URL if available, otherwise use temple_image_url
    let imageUrl = '';
    
    // Try to get image from the images array first
    if (backendPuja.images && backendPuja.images.length > 0) {
      // Look for the first valid image URL
      for (const image of backendPuja.images) {
        if (image.image_url && this.isValidImageUrl(image.image_url)) {
          // Additional check to ensure the URL is reachable
          imageUrl = image.image_url;
          break; // Use the first valid image
        }
      }
    }
    
    // If no valid image from images array, try temple_image_url
    if (!imageUrl && backendPuja.temple_image_url) {
      if (this.isValidImageUrl(backendPuja.temple_image_url)) {
        imageUrl = backendPuja.temple_image_url;
      } else if (backendPuja.temple_image_url && !backendPuja.temple_image_url.startsWith('http')) {
        // Handle relative paths by constructing full URL
        try {
          // Only construct full URL if it looks like a valid relative path
          const trimmedPath = backendPuja.temple_image_url.trim();
          // Skip obviously invalid paths
          if (trimmedPath && !trimmedPath.includes(' ') && !trimmedPath.includes('\\') && 
              !trimmedPath.includes('..') && trimmedPath.length > 3) {
            // Assuming the images are hosted on the same server as the API
            const baseUrl = API_BASE_URL.replace('/api', '');
            // Ensure we have a proper base URL
            if (baseUrl && (baseUrl.startsWith('http://') || baseUrl.startsWith('https://'))) {
              // Make sure the base URL is valid
              if (this.isValidImageUrl(baseUrl)) {
                const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
                // Validate the constructed URL
                try {
                  if (this.isValidImageUrl(fullPath)) {
                    imageUrl = fullPath;
                  }
                } catch {
                  // If validation fails, imageUrl remains empty
                }
              }
            }
          }
        } catch (error) {
          console.warn('Error constructing full image URL:', error);
          // If construction fails, imageUrl remains empty
        }
      }
    }

    // Format the date - if null, use today's date
    const formattedDate = backendPuja.date || new Date().toISOString().split('T')[0];

    return {
      id: backendPuja.id.toString(),
      image: imageUrl || '/images/placeholder.jpg', // Use placeholder if no valid image
      title: backendPuja.name,
      temple: backendPuja.temple_address || 'Temple Address',
      description: backendPuja.description,
      date: formattedDate,
      isNew: false, // We can set this based on created_at if needed
    };
  }

  // Puja API methods - Updated to match admin panel endpoints
  async getPujas(): Promise<PujaCard[]> {
    const backendPujas = await this.request<BackendPuja[]>('/api/v1/pujas');
    // Transform the backend data to match PujaCard interface
    return backendPujas.map(this.transformPuja.bind(this));
  }

  async getPujaById(id: string): Promise<PujaCard> {
    const backendPuja = await this.request<BackendPuja>(`/api/v1/pujas/${id}`);
    // Transform the backend data to match PujaCard interface
    return this.transformPuja(backendPuja);
  }

  async createPuja(puja: Omit<PujaCard, 'id'>): Promise<PujaCard> {
    // For now, we'll keep the existing implementation
    return this.request<PujaCard>('/api/v1/pujas', {
      method: 'POST',
      body: JSON.stringify(puja),
    });
  }

  async updatePuja(id: string, puja: Partial<PujaCard>): Promise<PujaCard> {
    // For now, we'll keep the existing implementation
    return this.request<PujaCard>(`/api/v1/pujas/${id}`, {
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