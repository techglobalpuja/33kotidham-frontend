// Common types used across the application

// Backend response interfaces
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
  plan_ids: number[];
  chadawas?: BackendChadawa[];
}

export interface PujaCard {
  id: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  time?: string; // Add time field
  isNew?: boolean;
  timer?: boolean;
  shareLabel?: string;
  created_at?: string; // Add created_at field
}

export interface HoroscopeCard {
  id: string;
  icon: string;
  name: string;
  dateRange: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  location: string;
  datetime: string;
  isHighlighted?: boolean;
  imageSrc?: string;
}

export interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  role: string;
  rating: string;
  testimonial: string;
}

export interface Article {
  id: string;
  image: string;
  date: string;
  author: string;
  comments: string;
  title: string;
  excerpt: string;
}

// Update User interface to match API response
export interface User {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  role?: string;
  is_active?: boolean;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  isAuthenticated?: boolean;
  // OAuth2 token fields
  access_token?: string;
  token_type?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  isLoginModalOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// User Dashboard Types

// Complete Puja Details Interface
export interface Puja {
  id: string;
  pujaName: string;
  subHeading: string;
  about: string;
  date: string;
  time: string;
  pujaImages: string[];
  templeImage: string;
  templeAddress: string;
  templeDescription: string;
  benefits: {
    title: string;
    description: string;
  }[];
  selectedPlanIds: string[];
  prasadPrice: number;
  prasadStatus: boolean;
  dakshinaPrices: string;
  dakshinaPricesUSD: string;
  dakshinaStatus: boolean;
  manokamanaPrices: string;
  manokamanaPricesUSD: string;
  manokamanaStatus: boolean;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  createdDate: string;
  selectedPlans?: Plan[]; // Populated plans data
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  trackingNumber?: string;
}

export interface UserProfile {
  personalInfo: {
    name: string;
    email: string;
    mobile: string;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  spiritualInfo?: {  // Made optional
    favoriteDeities: string[];
    birthTime?: string;
    birthPlace?: string;
    gotra?: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Normal' | 'VIP';
  description: {
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
  isActive: boolean;
  createdDate: string;
  actualPrice?: number;
  discountedPrice?: number;
}

// Admin Dashboard Types
export interface AdminStats {
  totalUsers: number;
  totalPujas: number;
  totalEarnings: number;
  totalOrders: number;
  monthlyGrowth: {
    users: number;
    pujas: number;
    earnings: number;
    orders: number;
  };
}

export interface PujaFormData {
  // Puja Section
  pujaName: string;
  subHeading: string;
  about: string;
  date: string;
  time: string;
  pujaImages: string[];
  
  // Temple Section
  templeImage: string;
  templeAddress: string;
  templeDescription: string;
  
  // Puja Benefits (4 benefits with titles and descriptions)
  benefits: {
    title: string;
    description: string;
  }[];
  
  // Plan Details
  selectedPlanIds: string[]; // Changed to array for multi-select
  
  // Prasad
  prasadPrice: number;
  prasadStatus: boolean;
  
  // Dakshina
  dakshinaPrices: string; // Changed to string for comma-separated values
  dakshinaPricesUSD: string; // Changed to string for comma-separated values
  dakshinaStatus: boolean;
  
  // Manokamna Parchi
  manokamanaPrices: string; // Changed to string for comma-separated values
  manokamanaPricesUSD: string; // Changed to string for comma-separated values
  manokamanaStatus: boolean;
  
  // General
  category: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Chadawa {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  requires_note: boolean;
}

export interface ChawadaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  quantity: number;
}

export interface ChawadaFormData {
  name: string;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
}

export interface ProductFormData {
  name: string;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
}

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  product_id: number;
  created_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  quantity: number;
  isActive: boolean;
  createdDate: string;
}

export interface BackendProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  product_id: number;
  created_at: string;
}

export interface BackendProductCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Add this new interface for product categories
export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BackendProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  mrp: string;
  selling_price: string;
  discount_percentage: string;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  category: BackendProductCategory;
  images: BackendProductImage[];
  created_at: string;
}

export interface BackendProductDetail extends BackendProduct {
  long_description: string;
  sku: string;
  weight: string;
  dimensions: string;
  material: string;
  meta_description: string;
  tags: string;
  allow_cod: boolean;
  category_id: number;
  total_sales: number;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'user' | 'admin' | 'moderator';
  isActive: boolean;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface ContentUpload {
  id: string;
  title: string;
  type: 'video' | 'image' | 'document' | 'certificate';
  url: string;
  category: string;
  uploadDate: string;
  size: string;
}

export interface PlanFormData {
  name: string;
  price: number;
  image: string;
  category: 'Normal' | 'VIP';
  description: {
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
  isActive: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Normal' | 'VIP';
  description: {
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
  isActive: boolean;
  createdDate: string;
}

// Blog Types
export interface BlogCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  thumbnail_image: string | null;
  meta_description: string | null;
  tags: string | null;
  category_id: number | null;
  is_featured: boolean;
  is_active: boolean;
  publish_time: string | null;
  slug: string | null;
  author_id: number;
  created_at: string;
  updated_at: string;
  category: BlogCategory | null;
  categories: BlogCategory[]; // Add categories array
  author: User | null;
}

// Booking Types
export interface BookingChadawa {
  id: number;
  booking_id: number;
  chadawa_id: number;
  quantity?: number;
  note: string | null;
  created_at: string;
  chadawa?: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: string;
    requires_note: boolean;
  };
}

export interface PujaResponse {
  name: string;
  sub_heading: string;
  description: string;
  date: string;
  time: string;
  temple_image_url: string;
  temple_address: string;
  temple_description: string;
  prasad_price: number;
  is_prasad_active: boolean;
  dakshina_prices_inr: string;
  dakshina_prices_usd: string;
  is_dakshina_active: boolean;
  manokamna_prices_inr: string;
  manokamna_prices_usd: string;
  is_manokamna_active: boolean;
  category: string;
  id: number;
  created_at: string;
  updated_at: string;
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
  plan_ids: number[];
  chadawas: Chadawa[];
}

export interface PlanResponse {
  name: string;
  description: string;
  image_url: string;
  actual_price: string;
  discounted_price: string;
  id: number;
  created_at: string;
}

export interface UserResponse {
  name: string;
  email: string;
  mobile: string;
  id: number;
  role: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Temple {
  id: number;
  name: string;
  description: string;
  image_url: string;
  location: string;
  slug: string;
  created_at: string;
  updated_at: string;
  recommended_pujas: BackendPuja[];
  chadawas: Chadawa[];
}

export interface BookingResponse {
  puja_id: number | null;
  temple_id: number | null;
  plan_id: number | null;
  booking_date: string | null;
  mobile_number: string | null;
  whatsapp_number: string | null;
  gotra: string | null;
  id: number;
  user_id: number;
  status: string;
  puja_link: string | null;
  created_at: string;
  user: UserResponse | null;
  puja: PujaResponse | null;
  temple: Temple | null;
  plan: PlanResponse | null;
  booking_chadawas: BookingChadawa[];
}

// User Puja interface for dashboard
export interface UserPuja {
  id: string;
  title: string;
  temple: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'processing';
  amount: number;
  image: string;
  videoUrl?: string;
  certificateUrl?: string;
}
