import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firebase

export interface Product {
  id: string; // Changed to string for Firebase Document ID
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  wholesale: number;
  sale: number;
  img: string;
  unitWeightKg: number;      // Weight of one unit in kilograms (e.g., 0.5 for 500g pack, 1.2 for 1.2kg chicken)
  initialUnitsStock: number; // Total number of units initially put into stock
  unitsSold: number;         // Total number of units sold
  activeOfferId?: string;    // Optional: ID of an active offer applying to this product
  category?: string;         // New: Optional category field
  createdAt: Timestamp;      // New: Firebase Timestamp for creation date
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string; // Unique ID for the order
  date: string; // Date of the order (e.g., ISO string)
  items: CartItem[]; // The items purchased in this order
  totalAmount: number;
  paymentMethod: 'COD' | 'Online' | 'Nequi'; // New: Payment method used for the order
  expectedDelivery: string; // New: Expected delivery date/time
}

export interface CustomerOrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPurchases: number; // Total amount spent by the customer
  orders: Order[]; // Array of orders placed by this customer
  status: 'new' | 'returning'; // New: Customer status
}

export enum Screen {
  Home = 'home',
  Admin = 'admin',
  Customers = 'customers', // New screen for customer list
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface OrderConfirmationDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  orderItems: CartItem[]; // Full cart items for detailed display
  totalAmount: number;
  paymentMethod: string; // Already translated string for display
  expectedDelivery: string; // Already translated string for display
  orderTrackingLink: string;
  qrCodeImageUrl: string;
}

export type Locale = 'es' | 'en' | 'ar';

export enum OfferType {
  PercentageDiscount = 'PercentageDiscount', // e.g., 20% off
  FixedDiscount = 'FixedDiscount',         // e.g., $5 off
  BuyXGetYFree = 'BuyXGetYFree',           // e.g., Buy 2 Get 1 Free
}

export interface Offer {
  id: string;
  name: Record<Locale, string>;
  type: OfferType;
  value?: number; // e.g., 20 for 20% or $20 off (optional for BuyXGetYFree)
  buyQuantity?: number; // X for Buy X Get Y Free
  getFreeQuantity?: number; // Y for Buy X Get Y Free
  targetProductId: string; // The product this offer applies to (changed to string)
  isActive: boolean;
}