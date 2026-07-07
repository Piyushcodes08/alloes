import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// import bg1 from './assets/bg-1.png';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Heart,
  Star,
  Info,
  ChevronRight,
  ChevronLeft,
  User,
  HeartHandshake,
  Dna,
  Lock,
  Gift,
  Search,
  ShoppingCart,
  Calendar,
  Phone,
  FileCheck
} from 'lucide-react';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartSidebar from './components/CartSidebar';
import Quiz from './components/Quiz';
import StoryModal from './components/StoryModal';
import Toast from './components/Toast';

import { PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, ToastMessage, Review } from './types';
import { heroImages } from './imageAssets';

const HERO_SLIDES = [
  {
    badge: "EST. 2014 • DERMATOLOGIST RECOMMENDED",
    title: "Pure Saffron.\nNatural Radiance.",
    subtitle: "Aloe Saffron Pure Skin Gel",
    description: "Experience deep, golden cellular hydration with 90% pure organic cold-pressed Aloe Vera pulp infused with hand-selected Kashmiri Saffron and rich Vitamin E.",
    bgImage: heroImages.bg1,
    productId: "prod-aloesaffron",
    productImage: heroImages.product1,
    badgeText: "3000 PPM PURITY",
    scientificNote: "Crocin in saffron serves as a natural antioxidant block, neutralizing UV-induced cellular degradation and reducing melanin indices by 21%.",
    features: ["Certified Organic", "Clinically Approved"]
  },
  {
    badge: "CLINICALLY PROVEN • INTENSIVE SCALP CARE",
    title: "Root Vitality.\nScalp Rebirth.",
    subtitle: "Ketoconazole 2% Shampoo",
    description: "Eliminate stubborn dandruff and halt hair fall. Powered by clinical 2% Ketoconazole to clear fungus, reduce flaking, and restore deep follicular health.",
    bgImage: heroImages.bg2,
    productId: "prod-keto-2",
    productImage: heroImages.product2,
    badgeText: "STOPS FLAKING AT ROOT",
    scientificNote: "Inhibits fungal synthesis in Malassezia species, lowering flaking indices by 84% in clinical trials with zero residual dryness.",
    features: ["Fights Yeast", "Restores Cuticle"]
  },
  {
    badge: "DAILY INTENSIVES • AYURVEDIC DETOX",
    title: "Inner Harmony.\nGut Vitality.",
    subtitle: "Kabz Safa Digestion Blend",
    description: "Expertly formulated with standardized Senna leaves, Haritaki, and Ajwain to naturally relieve acute constipation, bloating, and support intestinal detox.",
    bgImage: heroImages.bg3,
    productId: "prod-kabz-safa",
    productImage: heroImages.product3,
    badgeText: "100% HERBAL EXTRACT",
    scientificNote: "Standardized sennosides stimulate peristaltic muscular contractions of the colon, providing gentle overnight relief.",
    features: ["Non-Habit Forming", "Overnight Relief"]
  }
];

export default function App() {
  // Products list in state to allow adding user reviews dynamically
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Cart State (loaded from localStorage if present)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alloes_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal and drawer controls
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search & Filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Hero Slider State & Autoplay
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const isAutoplayPaused = isHoverPaused || isManualPaused;
  const bestSellersRef = useRef<HTMLDivElement | null>(null);

  const catalogueRef = useRef<HTMLDivElement | null>(null);

  const handleCatalogueScroll = (direction: 'left' | 'right') => {
    const container = catalogueRef.current;
    if (!container) return;
    const amount = container.clientWidth - 96;
    container.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const handleProductSliderScroll = (direction: 'left' | 'right') => {
    const container = bestSellersRef.current;
    if (!container) return;
    const amount = container.clientWidth - 96;
    container.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsManualPaused(true);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setIsManualPaused(true);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setIsManualPaused(true);
  };

  useEffect(() => {
    if (isAutoplayPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplayPaused]);

  useEffect(() => {
    if (!isManualPaused) return;
    const timer = window.setTimeout(() => {
      setIsManualPaused(false);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [isManualPaused]);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactQuery, setContactQuery] = useState('');

  // Toasts list
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('alloes_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Helpers
  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    addToast(`${product.name} (x${quantity}) added to prescription cart.`, 'success');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      addToast(`${item.product.name} removed from cart.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Dynamic review creation
  const handleAddReview = (productId: string, rating: number, comment: string, name: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id !== productId) return p;

        const newReview: Review = {
          id: `user-rev-${Date.now()}`,
          userName: name,
          rating,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          comment,
          verified: true
        };

        const updatedReviews = [newReview, ...p.reviews];
        const newRating = parseFloat(
          ((p.rating * p.reviewsCount + rating) / (p.reviewsCount + 1)).toFixed(1)
        );

        const updatedProd = {
          ...p,
          reviews: updatedReviews,
          reviewsCount: p.reviewsCount + 1,
          rating: newRating
        };

        // If currently inspected, update modal state too
        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(updatedProd);
        }

        return updatedProd;
      })
    );
  };

  // Scroll triggers
  const scrollToQuiz = () => {
    const element = document.getElementById('quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalogue = () => {
    const element = document.getElementById('catalogue-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactQuery.trim()) {
      addToast('Please complete all contact coordinates.', 'error');
      return;
    }
    setContactName('');
    setContactEmail('');
    setContactQuery('');
    addToast('Your pharmaceutical consultation inquiry has been forwarded to our labs.', 'success');
  };

  // Filtering products list based on category state, search input and sorting
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default order
  });

  // Split best sellers and new launches from current state
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newLaunches = products.filter((p) => p.isNewLaunch);

  return (
    <div className="bg-background min-h-screen text-primary relative overflow-x-hidden font-sans pt-[72px]">
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* HEADER NAVIGATION */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onStoryToggle={() => setIsStoryOpen(true)}
        onQuizScroll={scrollToQuiz}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProfileClick={() => setIsProfileOpen(true)}
        products={products}
        onProductSelect={setSelectedProduct}
      />

      {/* HERO HERO SECTION WITH ANIMATED SLIDER */}
      <section 
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        className="relative w-full min-h-[70vh] md:min-h-[85vh] lg:h-[90vh] overflow-hidden border-b border-outline-variant"
      >
        {/* Cinematic Animated Background Slider */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                alt="Pure Science Hero Background"
                className="w-full h-full object-cover select-none"
                src={HERO_SLIDES[currentSlide].bgImage}
                referrerPolicy="no-referrer"
              />
              {/* High-Contrast Luxury Dark Gradient Veil */}
              <div className="hero-gradient absolute inset-0"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Content Layout */}
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] items-center justify-items-center lg:justify-items-stretch gap-12 py-16 md:py-20">
          {/* Left Text Column with Entrance Animations */}
          <div className="w-full lg:w-auto max-w-[640px] space-y-5 md:space-y-6 self-start  mx-auto lg:mx-0 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 md:space-y-6"
              >
               
                
                <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-white font-black leading-[1.08] tracking-tighter whitespace-pre-line drop-shadow-sm mx-auto lg:mx-0 max-w-[640px]">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                
                <p className="text-trust-gold font-headline font-semibold text-sm md:text-base tracking-wider uppercase">
                  Featured: {HERO_SLIDES[currentSlide].subtitle}
                </p>
                
                <p className="text-white/85 text-xs md:text-sm max-w-lg leading-relaxed font-sans mx-auto lg:mx-0">
                  {HERO_SLIDES[currentSlide].description}
                </p>


                <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center sm:justify-start gap-3.5 w-full">
                  <button
                    onClick={() => {
                      const prod = products.find(p => p.id === HERO_SLIDES[currentSlide].productId);
                      if (prod) setSelectedProduct(prod);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-trust-gold text-white active:scale-98 font-headline text-xs font-black rounded-lg uppercase tracking-wider transition-all shadow-md flex items-center gap-2 justify-center group cursor-pointer"
                  >
                    View Formula Details
                    <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      const prod = products.find(p => p.id === HERO_SLIDES[currentSlide].productId);
                      if (prod) handleAddToCart(prod, 1);
                    }}
                    className="w-full sm:w-auto px-6 py-3 border border-outline-variant text-white hover:bg-white/10 active:scale-98 font-headline text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#E4C97F]" />
                    Quick Add to Cart
                  </button>
                </div>

                <div className="md:hidden mt-6 flex justify-center">
                  <div className="w-full max-w-[300px] rounded-[28px]">
                    <img
                      src={HERO_SLIDES[currentSlide].productImage}
                      alt={HERO_SLIDES[currentSlide].subtitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain rounded-[24px]"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Premium Floating Pedestal with Animated Product Image */}
            <div className="hidden lg:flex relative z-20 items-center justify-self-end justify-center lg:w-full">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentSlide}
      initial={{
        opacity: 0,
        scale: 0.88,
        x: 40,
        rotate: -2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.88,
        x: -30,
        rotate: 2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="select-none flex items-center justify-center"
    >
      <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] flex items-center justify-center rounded-[40px] ">
        <motion.img
          key={HERO_SLIDES[currentSlide].productImage}
          src={HERO_SLIDES[currentSlide].productImage}
          alt={HERO_SLIDES[currentSlide].subtitle}
          referrerPolicy="no-referrer"
          className="max-h-[80%] max-w-[80%] object-contain select-none z-10 drop-shadow-2xl"
          whileHover={{
            scale: 1.04,
            rotate: 2,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </div>
    </motion.div>
  </AnimatePresence>
</div>
        </div>

        {/* Dynamic Pagination Loader Bars */}
        <div className="absolute bottom-6 left-6 md:left-16 z-30 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="group relative flex items-center h-8 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold font-mono transition-all duration-300 ${
                  currentSlide === idx ? 'text-trust-gold scale-110' : 'text-white/40 group-hover:text-white/70'
                }`}>
                  0{idx + 1}
                </span>
                <div className="relative w-14 md:w-20 h-1 bg-white/15 rounded-full overflow-hidden">
                  {currentSlide === idx && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: isAutoplayPaused ? 0 : 6, 
                        ease: "linear" 
                      }}
                      className="absolute left-0 top-0 bottom-0 bg-trust-gold"
                    />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 md:right-16 z-30 flex items-center gap-2">
          <button
            onClick={goToPrevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* CATEGORY SHOWCASE HIGHLIGHTS */}
      <section className="py-20 px-4 md:px-16 max-w-[1440px] mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3"
        >
          <h2 className="font-headline text-3xl font-bold text-primary">Shop By Categories</h2>
          <div className="w-24 h-1 bg-trust-gold rounded"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: 1.04, 
                rotateY: 8, 
                rotateX: -4,
                z: 25,
                transition: { duration: 0.3 } 
              }}
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => {
                setActiveCategory(cat.id);
                scrollToCatalogue();
              }}
              className="group relative overflow-hidden rounded-xl bg-white shadow-xs border border-outline-variant cursor-pointer transition-all hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-secondary-container/20 relative p-4 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-headline text-lg font-bold text-primary group-hover:text-primary-container transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-muted mt-1">{cat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS PRODUCT SLIDER SECTION */}
      <section className="py-20 bg-secondary-container/30 border-y border-outline-variant">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest font-bold text-trust-gold bg-primary-container/10 px-3 py-1 rounded-md uppercase">
                Trusted Formulations
              </span>
              <h2 className="font-headline text-3xl font-bold text-primary">Our Best Sellers</h2>
              <p className="text-xs text-on-surface-variant">Clinically proven formulas in a sleek slider for fast browsing and prescription-ready selection.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleProductSliderScroll('left')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleProductSliderScroll('right')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={bestSellersRef}
            className="relative flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-4 no-scrollbar snap-x snap-mandatory"
          >
            {bestSellers.map((prod) => (
              <div key={prod.id} className="snap-start shrink-0 w-[min(85vw,320px)] sm:w-[320px] lg:w-[360px]">
                <ProductCard
                  product={prod}
                  onAddToCart={handleAddToCart}
                  onSelect={setSelectedProduct}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Swipe sideways or use arrows to explore premium formulations.</span>
            <button
              onClick={() => {
                setActiveCategory('all');
                scrollToCatalogue();
              }}
              className="text-primary font-bold uppercase tracking-wider hover:text-trust-gold transition-colors"
            >
              View Full Pharmacy Range
            </button>
          </div>
        </div>
      </section>

      {/* NEW LAUNCHES SECTION */}
      <section className="py-20 px-4 md:px-16 max-w-[1440px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-outline-variant pb-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest font-bold text-primary bg-primary/10 px-3 py-1 rounded-md uppercase">
              Innovative Botanical Synthesis
            </span>
            <h2 className="font-headline text-3xl font-bold text-primary">Our New Launches</h2>
            <p className="text-xs text-on-surface-variant">Unveiling our latest therapeutic developments in organic molecular wellness.</p>
          </div>
          <button
            onClick={() => {
              setActiveCategory('all');
              scrollToCatalogue();
            }}
            className="text-primary font-bold text-xs border-b border-primary pb-0.5 hover:text-primary transition-colors uppercase tracking-wider shrink-0"
          >
            Browse New Arrivals
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newLaunches.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={handleAddToCart}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* DETAILED DYNAMIC CATALOGUE GRID SECTION WITH ACTIVE FILTERS */}
      <section id="catalogue-section" className="py-20 bg-background border-t border-outline-variant">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-headline text-3xl font-bold text-primary">Interactive Product Catalog</h2>
            <p className="text-xs text-text-muted">Filter our lab coordinates by skin, hair, bathing or systemic concerns.</p>
          </div>

          {/* Filtering Bars */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-secondary-container text-primary hover:bg-secondary'
                }`}
              >
                All ranges
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-secondary-container text-primary hover:bg-secondary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 justify-end shrink-0">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold p-2.5 px-4 border border-outline-variant rounded-lg bg-white text-primary focus:border-primary focus:outline-none"
              >
                <option value="default">Default Arrangement</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Dermatologist Rating</option>
              </select>
            </div>
          </div>

          {/* Active search filter details */}
          {searchQuery && (
            <div className="text-xs text-text-muted flex items-center gap-2">
              <span>Found {sortedProducts.length} results matching "<strong>{searchQuery}</strong>"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-red-500 hover:underline font-bold"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Products List Rendering */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-outline-variant max-w-md mx-auto">
              <Dna className="w-12 h-12 text-primary/30 mx-auto animate-pulse" />
              <h4 className="font-headline text-lg font-bold text-primary mt-4">No active formulas match</h4>
              <p className="text-xs text-text-muted mt-2">
                We currently lack products matching your search criteria. Try filtering by general keywords like "Ketoclean", "Melatonin" or "Bhringraj".
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors"
              >
                Reset Selection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-muted">Browse results</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCatalogueScroll('left')}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
                    aria-label="Scroll catalog left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCatalogueScroll('right')}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
                    aria-label="Scroll catalog right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div ref={catalogueRef} className="relative flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-4 no-scrollbar snap-x snap-mandatory">
                {sortedProducts.map((prod) => (
                  <div key={prod.id} className="snap-start shrink-0 w-[min(85vw,320px)] sm:w-[320px] lg:w-[360px]">
                    <ProductCard
                      product={prod}
                      onAddToCart={handleAddToCart}
                      onSelect={setSelectedProduct}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE AYURVEDIC CLINICAL QUIZ PORTAL */}
      <section id="quiz-section" className="py-20 px-4 md:px-16 max-w-[1440px] mx-auto">
        <Quiz onAddToCart={handleAddToCart} onSelectProduct={setSelectedProduct} />
      </section>

      {/* TRANSPARENCY BEAUTY SECTION */}
      <section className="py-20 bg-background border-t border-outline-variant overflow-hidden">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Image with floating organic badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square bg-primary/5 rounded-[40px] absolute -top-10 -left-10 w-3/4 -z-10"></div>
            <div className="rounded-xl overflow-hidden shadow-md relative border border-outline-variant">
              <img
                src="/src/assets/images/radiant_skin_beauty_1783355307569.jpg"
                alt="Ayurvedic woman"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Absolute Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-xl shadow-md max-w-[260px] border border-outline-variant flex gap-3 items-start"
            >
              <ShieldCheck className="w-10 h-10 text-primary shrink-0" />
              <div>
                <p className="font-headline text-sm font-bold text-primary">100% Certified Organic</p>
                <p className="text-[10px] text-text-muted mt-1">&amp; Pharmaceutical Grade Active Ingredients.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] tracking-widest font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase inline-block">
                Guaranteed Purity Matrix
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Transparency Beauty</h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                At Transparency Beauty, we believe in the power of clinical honesty and botanical authenticity in every single product we create. Our range is formulated with pure, heavy-metal tested botanical ingredients that are carefully matched for their cellular effectiveness in protecting, restoring, and nourishing your skin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-outline-variant">
                <HeartHandshake className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-headline text-sm font-bold text-primary">Ethical Sourcing</h4>
                  <p className="text-xs text-text-muted mt-1">Acquired directly from pristine botanical micro-cooperatives.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-outline-variant">
                <Dna className="w-8 h-8 text-primary shrink-0 animate-pulse" />
                <div>
                  <h4 className="font-headline text-sm font-bold text-primary">Clinical Grade</h4>
                  <p className="text-xs text-text-muted mt-1">Rigorous double-blind lab testing protocols before packaging.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed bg-white/60 border-l-4 border-primary p-4 italic rounded-r border border-outline-variant">
              "Experience the cellular difference with clinical-grade Ayurvedic formulations that prioritize your organic biological health and the integrity of the planet."
            </p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section className="py-20 bg-primary text-white border-y border-primary-container">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-headline text-3xl font-bold text-white">What Our Customers Have To Say</h2>
            <p className="text-xs text-white/70 max-w-sm mx-auto">Real results and clinical feedback from individuals who trust Alloes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-primary-container p-8 rounded-xl border border-white/10 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex text-white opacity-80">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-white" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-white/90 italic">
                  "Till now I did not get any better options that give me the best results and do not harm my hair. Organic with quality - finally found it with Alloes."
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h5 className="font-bold text-xs text-white">Rajarshi Sarkar</h5>
                <p className="text-[9px] text-white/60 uppercase tracking-wider font-bold mt-1">Verified Buyer</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-primary-container p-8 rounded-xl border-2 border-white/30 flex flex-col justify-between h-full space-y-6 scale-105 shadow-xl relative">
              <span className="absolute -top-3.5 right-6 bg-white text-primary font-bold text-[9px] px-3 py-1 rounded-md uppercase tracking-wider">
                Clinic Choice
              </span>
              <div className="space-y-4">
                <div className="flex text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-white" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-white/95 italic">
                  "The shampoo is the best I've ever used. Extremely affordable and no side effects. The fragrance is strong but the results are exceptional."
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h5 className="font-bold text-xs text-white">Lipi Chaudhari</h5>
                <p className="text-[9px] text-white/60 uppercase tracking-wider font-bold mt-1">Verified Buyer</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-primary-container p-8 rounded-xl border border-white/10 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex text-white opacity-80">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-white" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-white/90 italic">
                  "The ointments by Alloes are true to their quality. After using these products, no other brand will satisfy you. Absolute gold standard."
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h5 className="font-bold text-xs text-white">Varun Sonagra</h5>
                <p className="text-[9px] text-white/60 uppercase tracking-wider font-bold mt-1">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES VALUE PROPOSITIONS */}
      <section className="py-12 bg-background border-y border-outline-variant text-primary">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center space-y-2">
            <span className="text-2xl text-primary inline-block">🚚</span>
            <h5 className="font-bold text-xs uppercase tracking-wider">Free Delivery</h5>
            <p className="text-[10px] text-text-muted">On orders over 399 INR</p>
          </div>
          <div className="text-center space-y-2">
            <span className="text-2xl text-primary inline-block">🛡️</span>
            <h5 className="font-bold text-xs uppercase tracking-wider">Safe Payment</h5>
            <p className="text-[10px] text-text-muted">100% Secure Checkout</p>
          </div>
          <div className="text-center space-y-2">
            <span className="text-2xl text-primary inline-block">🔒</span>
            <h5 className="font-bold text-xs uppercase tracking-wider">Shop Confidently</h5>
            <p className="text-[10px] text-text-muted">Quality Guarantee</p>
          </div>
          <div className="text-center space-y-2">
            <span className="text-2xl text-primary inline-block">📞</span>
            <h5 className="font-bold text-xs uppercase tracking-wider">24/7 Support</h5>
            <p className="text-[10px] text-text-muted">Expert Help Always</p>
          </div>
          <div className="text-center space-y-2 col-span-2 md:col-span-1">
            <span className="text-2xl text-primary inline-block">🔄</span>
            <h5 className="font-bold text-xs uppercase tracking-wider">Returns Policy</h5>
            <p className="text-[10px] text-text-muted">30 Day Satisfaction</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white pt-20 pb-8 border-t border-primary-container">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo, short bio and interactive newsletter */}
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold">Alloes Pharmaceuticals</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Since 2014, Alloes Pharmaceuticals has been a certified market leader in formulating, testing, and packaging Ayurvedic botanical products for skin, hair, and overall internal longevity.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-trust-gold hover:border-trust-gold transition-colors">
                <img className="w-4 h-4 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmdwA4cvqi0TpWoT8RFc7SQ1XGaqsU9P752jx4LCHSC9ODw8X9191YVQEpQJuYLUwxUKRlRbUG3MhTahyp-a_YlUcVf61h_o3n28WrJz-QOwmceoduQSsY6qg0VqweVvr800_E5WdQLrOZ9fwv0G66tCFFtrkwOHrRa8uQ548IIvv0TpXhPgSWJmqqaG1rR6nS0tN08MHBaE_VPjz-lnRvaYI7qbi6VGe7l-q5p0wJmVirfqjG4g" alt="Facebook icon" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center hover:bg-trust-gold hover:border-trust-gold transition-colors">
                <img className="w-4 h-4 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAby_WBZ2JwkH_7uCGXll2fHtivihvJQGVHXAX9HRcfnASFI6vdD8p8CnKm5oFr7IbA-4OU8j2HfXHz0hASzkruHVIPf3juWdroVF-y232p05oSPv4BKqjXSLo-84gKTbwrRWZHhrQYFib6SGEsPSqPK8Ejo102M8JTYbcdt9q_8YELhUFYeVQaC3P7ipbwMGorOrhcuvnNrYZHNv7Ddz7gvhErgKyGXejxH0ipAR9YfaUopBzJyg" alt="Instagram icon" />
              </a>
            </div>
          </div>

          {/* Quick Category links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-trust-gold">Categories</h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li>
                <button onClick={() => { setActiveCategory('skin'); scrollToCatalogue(); }} className="hover:text-trust-gold transition-colors">
                  Skin Care Range
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('hair'); scrollToCatalogue(); }} className="hover:text-trust-gold transition-colors">
                  Hair Care Solutions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('health'); scrollToCatalogue(); }} className="hover:text-trust-gold transition-colors">
                  Health &amp; Vitality
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('bathing'); scrollToCatalogue(); }} className="hover:text-trust-gold transition-colors">
                  Medicated Bathing Range
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Informational links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-trust-gold">Information</h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-trust-gold transition-colors text-left">
                  About Our Labs
                </button>
              </li>
              <li><a href="#" className="hover:text-trust-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-trust-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-trust-gold transition-colors">Clinical Sourcing Guidelines</a></li>
              <li>
                <button onClick={() => setIsProfileOpen(true)} className="hover:text-trust-gold transition-colors text-left">
                  Track Medical Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates and quick query */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-trust-gold">Submit Clinical Inquiry</h4>
            <form onSubmit={handleContactSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full text-xs bg-primary-container border border-white/15 p-2.5 rounded text-white focus:outline-none focus:border-trust-gold"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full text-xs bg-primary-container border border-white/15 p-2.5 rounded text-white focus:outline-none focus:border-trust-gold"
              />
              <textarea
                required
                rows={2}
                placeholder="What symptoms or skin questions do you have?"
                value={contactQuery}
                onChange={(e) => setContactQuery(e.target.value)}
                className="w-full text-xs bg-primary-container border border-white/15 p-2.5 rounded text-white focus:outline-none focus:border-trust-gold"
              />
              <button
                type="submit"
                className="w-full h-10 bg-trust-gold text-primary font-bold text-xs uppercase tracking-wider rounded hover:bg-trust-gold/90 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs text-white/50 max-w-[1440px] mx-auto px-4 space-y-2">
          <p>D-1411, 14th Floor - Westgate Business Acumen, Sarkhej - Gandhinagar Hwy, Ahmedabad, Gujarat 380015</p>
          <p>© 2026 Alloes Pharmaceuticals. All Rights Reserved. Developed By: Bytelogic Technologies</p>
        </div>
      </footer>

      {/* INTERACTIVE FLOATING WHATSAPP CHAT */}
      <a
        href="https://wa.me/918160772759"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-xl shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center border border-white/20"
        title="Direct Consultation on WhatsApp"
      >
        <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
        </svg>
      </a>

      {/* DYNAMIC DIALOG MODALS & SIDEBAR SLIDE-OVERS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        addToast={addToast}
        onAddReview={handleAddReview}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        addToast={addToast}
      />

      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* PATIENT LOG & HEALTH PROFILE MODAL */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => setIsProfileOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative z-10 space-y-6 text-primary border border-outline-variant"
            >
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-5 right-5 p-2 bg-secondary-container/40 hover:bg-secondary-container rounded-lg text-primary transition-colors"
              >
                ✕
              </button>
              <div className="text-center space-y-2 border-b border-outline-variant pb-4">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mx-auto text-primary">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="font-headline text-xl font-bold">Ayurvedic Patient Hub</h4>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                  Alloes Client Portal
                </p>
              </div>

              <div className="space-y-4">
                {/* Active user status card */}
                <div className="p-4 rounded-lg bg-secondary-container/30 border border-outline-variant text-xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Clinical Profile Status</span>
                    <span className="text-primary font-bold uppercase">Active Account</span>
                  </div>
                  <p className="text-text-muted">
                    Email registered: <strong>piyushkoirax@gmail.com</strong>
                  </p>
                  <p className="text-text-muted">
                    Consultation ID: <strong className="font-mono">AL-PC-2026</strong>
                  </p>
                </div>

                {/* Simulated Past Prescriptions */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-primary uppercase tracking-wider">
                    Recent Prescription Bookings
                  </h5>
                  <div className="space-y-2">
                    <div className="p-3 bg-secondary-container/20 border border-outline-variant rounded-lg text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold">Ketoconazole 2% Wash</p>
                        <p className="text-[10px] text-text-muted">Delivered June 24, 2026</p>
                      </div>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-bold uppercase tracking-wider">
                        Settled
                      </span>
                    </div>
                    <div className="p-3 bg-secondary-container/20 border border-outline-variant rounded-lg text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold">Mahabhringraj Oil | 200ml</p>
                        <p className="text-[10px] text-text-muted">Delivered May 15, 2026</p>
                      </div>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-bold uppercase tracking-wider">
                        Settled
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation Booking Schedule */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-3">
                  <h5 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Schedule Free Tele-Consultation</span>
                  </h5>
                  <p className="text-[10px] text-text-muted leading-relaxed">
                    Have severe dandruff, thinning hair, or stomach reflux? Book a 15-minute phone call with an Ayurvedic resident doctor.
                  </p>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      addToast('Consultation booking screen requested. Our doctor will dial your registered number within 2 hours.', 'info');
                    }}
                    className="w-full py-2 bg-primary text-white font-bold text-[10px] uppercase tracking-wider rounded-lg text-center block hover:bg-primary-container transition-colors"
                  >
                    Request Call Back
                  </button>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-outline-variant text-[10px] text-text-muted flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-primary" />
                <span>Secure medical database node. Fully encrypted HIPAA-compliant.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
