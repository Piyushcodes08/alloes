export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'skin' | 'hair' | 'health' | 'bathing';
  price: number;
  originalPrice: number;
  discount: number; // e.g. 25 for 25%
  image: string;
  description: string;
  ingredients: string[];
  scientificBenefits: string;
  directions: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isBestSeller?: boolean;
  isNewLaunch?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}
