export interface Product {
  id: number;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  wholesale: number;
  sale: number;
  img: string;
  unitWeightKg: number;      // Weight of one unit in kilograms (e.g., 0.5 for 500g pack, 1.2 for 1.2kg chicken)
  initialUnitsStock: number; // Total number of units initially put into stock
  unitsSold: number;         // Total number of units sold
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