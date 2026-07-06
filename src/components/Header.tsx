import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Sparkles, Menu, X, ArrowRight, ChevronDown, BookOpen, Truck, Landmark } from 'lucide-react';
import { Product } from '../types';
import AlloesLogo from './AlloesLogo';
import BlogModal from './BlogModal';
import TrackOrderModal from './TrackOrderModal';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onStoryToggle: () => void;
  onQuizScroll: () => void;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProfileClick: () => void;
  products?: Product[];
  onProductSelect?: (product: Product) => void;
}

interface DropdownItem {
  name: string;
  productId?: string;
  categoryId?: string;
  scrollId?: string;
  action?: string;
  searchKeyword?: string;
}

const DRAG_DROPDOWN_DATA: Record<string, DropdownItem[]> = {
  skin: [
    { name: 'Moisturizer', categoryId: 'skin', searchKeyword: 'Moisturizer' },
    { name: 'Serums', categoryId: 'skin', searchKeyword: 'Serum' },
    { name: 'Foot Care', categoryId: 'skin', searchKeyword: 'Foot Care' },
    { name: 'Face Wash', categoryId: 'skin', searchKeyword: 'Face Wash' },
    { name: 'Skin Lightening Cream', categoryId: 'skin', searchKeyword: 'Lightening' }
  ],
  hair: [
    { name: 'Shampoo', categoryId: 'hair', searchKeyword: 'Shampoo' },
    { name: 'Oils', categoryId: 'hair', searchKeyword: 'Oil' },
    { name: 'Conditioner', categoryId: 'hair', searchKeyword: 'Conditioner' }
  ],
  health: [
    { name: 'Ayurvedic Liver Syrup', categoryId: 'health', searchKeyword: 'Liver' },
    { name: 'Iron Syrup', categoryId: 'health', searchKeyword: 'Iron' },
    { name: 'Kidney Care Syrup', categoryId: 'health', searchKeyword: 'Kidney' },
    { name: 'Ortho Oil', categoryId: 'health', searchKeyword: 'Ortho' }
  ],
  bathing: [
    { name: 'Soaps', categoryId: 'bathing', searchKeyword: 'Soap' },
    { name: 'Shower Gel', categoryId: 'bathing', searchKeyword: 'Shower Gel' }
  ],
  shop: [
    { name: 'Antibiotic', categoryId: 'all', searchKeyword: 'Antibiotic' },
    { name: 'Anti Fungal', categoryId: 'all', searchKeyword: 'Anti Fungal' },
    { name: 'Antiseptic Modic', categoryId: 'all', searchKeyword: 'Antiseptic' },
    { name: 'B\'Witte Group', categoryId: 'all', searchKeyword: 'B-Witte' },
    { name: 'Cough & Cold Range', categoryId: 'all', searchKeyword: 'Cough' },
    { name: 'Health Tonic', categoryId: 'all', searchKeyword: 'Tonic' },
    { name: 'Deal Of The Day', categoryId: 'all', searchKeyword: 'Combo' },
    { name: 'Joints Pain', categoryId: 'all', searchKeyword: 'Joint Pain' },
    { name: 'New Products', categoryId: 'all', searchKeyword: 'Alloes' },
    { name: 'Oral Care', categoryId: 'all', searchKeyword: 'Oral' },
    { name: 'Pediatric Range', categoryId: 'all', searchKeyword: 'Baby' }
  ]
};

export default function Header({
  cartCount,
  onCartToggle,
  onStoryToggle,
  onQuizScroll,
  activeCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  onProfileClick,
  products = [],
  onProductSelect
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Custom Modals State
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [logoSize, setLogoSize] = useState(72);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 1024 ? 54 : 72);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (catId: string) => {
    onCategorySelect(catId);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubmenuOpen(null);
    
    // Smooth scroll to the catalogue
    const element = document.getElementById('catalogue-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCategorySelect('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId: string) => {
    if (onProductSelect && products.length > 0) {
      const prod = products.find(p => p.id === productId);
      if (prod) {
        onProductSelect(prod);
      }
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToId = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownItemClick = (item: DropdownItem) => {
    if (item.productId) {
      handleProductClick(item.productId);
    } else if (item.searchKeyword) {
      onCategorySelect(item.categoryId || 'all');
      onSearchChange(item.searchKeyword);
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
      setMobileSubmenuOpen(null);
      
      // Smooth scroll to the catalogue
      const element = document.getElementById('catalogue-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.categoryId) {
      onSearchChange('');
      handleNavClick(item.categoryId);
    } else if (item.scrollId) {
      handleScrollToId(item.scrollId);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none">
        {/* Top Clinical & Premium Infobar */}
        {/* <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 32, opacity: 1 }}
              exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full bg-[#041A14] text-[#E4C97F] text-[9px] md:text-[10px] font-headline font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-2 pointer-events-auto border-b border-[#E4C97F]/15 px-4 text-center select-none"
            >
              <span className="text-[12px] leading-none">🍃</span>
              <span>Premium Clinical Formulations • 100% Certified Organic • Doctor Authenticated</span>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* Main Navigation Space */}
        <div className="w-full pointer-events-auto">
          <div 
            className={`w-full transition-all duration-500 ${
              scrolled 
                ? 'bg-[#06241C]/95 backdrop-blur-xl border-b border-[#E4C97F]/20 px-4 md:px-12 py-2 shadow-2xl' 
                : 'bg-gradient-to-r from-[#06241C] via-[#082E24] to-[#041E17] border-b border-[#E4C97F]/10 px-4 md:px-12 py-3.5'
            }`}
          >
            <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
              {/* Brand Logo - Beautiful Circular Gold Frame */}
              <a
                href="/"
                onClick={handleLogoClick}
                className="group flex items-center shrink-0 select-none cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              >
                <AlloesLogo size={logoSize} showText={false} variant="light" />
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-7 relative">
                {/* About Us */}
                <button
                  onClick={onStoryToggle}
                  className="relative py-1.5 font-headline text-[11px] lg:text-[12px] font-bold text-white/90 hover:text-[#E4C97F] transition-all select-none cursor-pointer uppercase tracking-wider"
                >
                  About Us
                </button>

                {/* Categories with Dropdowns */}
                {['skin', 'hair', 'health', 'bathing', 'shop'].map((key) => {
                  const label = key === 'skin' ? 'Skin Care' : key === 'hair' ? 'Hair Care' : key === 'health' ? 'Health' : key === 'bathing' ? 'Bathing' : 'Shop';
                  const isCatActive = activeCategory === key;
                  
                  return (
                    <div
                      key={key}
                      onMouseEnter={() => setActiveDropdown(key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="relative py-3 group"
                    >
                      <button
                        onClick={() => key !== 'shop' ? handleNavClick(key) : handleNavClick('all')}
                        className="flex items-center gap-0.5 font-headline text-[11px] lg:text-[12px] font-bold text-white/90 hover:text-[#E4C97F] transition-colors uppercase tracking-wider select-none cursor-pointer"
                      >
                        <span className={isCatActive ? 'text-[#E4C97F] font-black' : ''}>
                          {label}
                        </span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === key ? 'rotate-180 text-[#E4C97F]' : 'text-white/40 group-hover:text-[#E4C97F]'}`} />
                      </button>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {activeDropdown === key && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-white rounded-xl shadow-2xl border border-[#E4C97F]/20 p-2 z-50 text-left space-y-0.5"
                          >
                            {DRAG_DROPDOWN_DATA[key].map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleDropdownItemClick(item)}
                                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[11px] font-headline font-bold transition-all flex items-center justify-between ${
                                  item.categoryId || item.scrollId
                                    ? 'bg-[#06241C]/5 text-[#06241C] border border-[#06241C]/5 hover:bg-[#06241C]/10 hover:text-[#06241C]'
                                    : 'text-gray-700 hover:bg-[#06241C]/5 hover:text-[#06241C]'
                                }`}
                              >
                                <span>{item.name}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#06241C] shrink-0 ml-1" />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Blog Link */}
                <button
                  onClick={() => setIsBlogOpen(true)}
                  className="relative py-1.5 font-headline text-[11px] lg:text-[12px] font-bold text-white/90 hover:text-[#E4C97F] transition-all select-none cursor-pointer uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Blog</span>
                </button>

                {/* Track Order Link */}
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="relative py-1.5 font-headline text-[11px] lg:text-[12px] font-bold text-white/90 hover:text-[#E4C97F] transition-all select-none cursor-pointer uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Track Order</span>
                </button>
              </nav>

              {/* Right Interactions */}
              <div className="flex items-center gap-2.5">
                {/* Consultation trigger (Pill Button) */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -0.5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onQuizScroll}
                  className="hidden xl:flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#E4C97F] to-[#C9A953] hover:from-[#FFF0C2] hover:to-[#E4C97F] text-[#06241C] font-headline font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#06241C] animate-pulse" />
                  <span>Consult Doctor</span>
                </motion.button>

                {/* Expandable Premium Search */}
                <div className="relative hidden md:flex items-center select-none">
                  <AnimatePresence>
                    {isSearchExpanded && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden mr-2"
                      >
                        <input
                          type="text"
                          placeholder="Search active formulas..."
                          value={searchQuery}
                          onChange={(e) => onSearchChange(e.target.value)}
                          onBlur={() => {
                            if (searchQuery === '') setIsSearchExpanded(false);
                          }}
                          className="w-[200px] text-xs font-sans font-semibold bg-white/10 text-white px-3 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#E4C97F] focus:bg-[#041A14] placeholder:text-white/50"
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                    className={`h-[42px] w-[42px] bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center justify-center cursor-pointer border ${
                      isSearchExpanded ? 'border-[#E4C97F] text-[#E4C97F]' : 'border-white/15 text-white hover:text-[#E4C97F]'
                    }`}
                    title="Search Formula"
                  >
                    <Search className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Account Profile Icon (Square Rounded Box) */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onProfileClick}
                  className="h-[42px] w-[42px] bg-white/5 hover:bg-white/10 text-white hover:text-[#E4C97F] rounded-xl transition-all cursor-pointer flex items-center justify-center border border-white/15 hover:border-[#E4C97F]/50"
                  title="Symptom Records / Account"
                >
                  <User className="w-4 h-4" />
                </motion.button>

                {/* Shopping Cart Button (Square Rounded Box with Gold Badge) */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCartToggle}
                    className="h-[42px] w-[42px] bg-white/5 hover:bg-white/10 text-white hover:text-[#E4C97F] rounded-xl transition-all flex items-center justify-center cursor-pointer border border-white/15 hover:border-[#E4C97F]/50"
                    title="Prescription Basket"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className="absolute -top-1.5 -right-1.5 bg-[#E4C97F] text-[#06241C] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md border border-[#06241C]"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Trigger */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="h-[42px] w-[42px] bg-white/5 hover:bg-white/10 text-white hover:text-[#E4C97F] rounded-xl transition-all md:hidden flex items-center justify-center border border-white/15"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 180 }}
              className="md:hidden border-b border-[#E4C97F]/20 bg-[#06241C] p-5 space-y-4 shadow-2xl pointer-events-auto absolute top-full left-0 w-full overflow-y-auto max-h-[85vh]"
            >
              {/* Mobile Search input */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search active formulas..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full text-xs bg-white/5 text-white placeholder:text-white/40 px-3 py-2.5 pl-9 rounded-xl border border-white/10 focus:outline-none focus:border-[#E4C97F] focus:bg-[#041A14]"
                />
                <Search className="w-4 h-4 text-white/50 absolute left-3 top-3" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5 font-headline font-bold text-xs uppercase tracking-wider text-white">
                {/* About Us */}
                <button
                  onClick={() => {
                    onStoryToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2.5 rounded-lg hover:bg-white/5 text-white/80 hover:text-[#E4C97F] transition-colors"
                >
                  About Us
                </button>

                {/* Interactive Submenus for Categories on Mobile */}
                {['skin', 'hair', 'health', 'bathing', 'shop'].map((key) => {
                  const label = key === 'skin' ? 'Skin Care' : key === 'hair' ? 'Hair Care' : key === 'health' ? 'Health' : key === 'bathing' ? 'Bathing' : 'Shop';
                  const isSubOpen = mobileSubmenuOpen === key;
                  
                  return (
                    <div key={key} className="space-y-1">
                      <button
                        onClick={() => setMobileSubmenuOpen(isSubOpen ? null : key)}
                        className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors ${
                          activeCategory === key ? 'text-[#E4C97F] bg-white/5' : 'text-white/80 hover:text-[#E4C97F]'
                        }`}
                      >
                        <span>{label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubOpen ? 'rotate-180 text-[#E4C97F]' : ''}`} />
                      </button>

                      {isSubOpen && (
                        <div className="pl-4 py-1 flex flex-col gap-1 bg-white/5 rounded-lg">
                          {DRAG_DROPDOWN_DATA[key].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleDropdownItemClick(item)}
                              className="text-left p-2 rounded-md hover:bg-white/5 text-[11px] font-headline font-bold text-white/70 hover:text-white flex items-center justify-between"
                            >
                              <span>{item.name}</span>
                              <ArrowRight className="w-3 h-3 text-[#E4C97F]" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Blog Link */}
                <button
                  onClick={() => {
                    setIsBlogOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2.5 rounded-lg hover:bg-white/5 text-white/80 hover:text-[#E4C97F] transition-colors flex items-center gap-1.5"
                >
                  <span>Blog Journal</span>
                </button>

                {/* Track Order Link */}
                <button
                  onClick={() => {
                    setIsTrackOrderOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2.5 rounded-lg hover:bg-white/5 text-white/80 hover:text-[#E4C97F] transition-colors flex items-center gap-1.5"
                >
                  <span>Track Order</span>
                </button>
                
                <button
                  onClick={() => {
                    onQuizScroll();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3.5 rounded-xl bg-[#E4C97F] hover:bg-[#FFF0C2] text-[#06241C] font-headline font-black flex items-center justify-center gap-2 mt-2 shadow-lg transition-colors duration-200"
                >
                  <Sparkles className="w-4 h-4 text-[#06241C] animate-pulse" />
                  Begin Diagnostic Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Embedded Modals */}
      <BlogModal isOpen={isBlogOpen} onClose={() => setIsBlogOpen(false)} />
      <TrackOrderModal isOpen={isTrackOrderOpen} onClose={() => setIsTrackOrderOpen(false)} />
    </>
  );
}
