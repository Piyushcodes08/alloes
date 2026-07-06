import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Leaf, FlaskConical, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  addToast: (text: string, type: 'success' | 'info' | 'error') => void;
  onAddReview: (productId: string, rating: number, comment: string, name: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  addToast,
  onAddReview
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'directions' | 'reviews'>('benefits');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) {
      addToast('Please write a comment first.', 'error');
      return;
    }
    const name = newReviewName.trim() || 'Anonymous Client';
    onAddReview(product.id, newReviewRating, newReviewComment, name);
    setNewReviewComment('');
    setNewReviewName('');
    setNewReviewRating(5);
    addToast('Thank you for sharing your clinic experience!', 'success');
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        style={{ perspective: '1200px' }}
      >
        {/* Background Click */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -12, rotateX: 6, z: -150 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateY: 12, rotateX: -6, z: -150 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[85vh] border border-outline-variant"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 bg-secondary-container/40 hover:bg-secondary-container rounded-lg text-primary transition-colors hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image and Badges */}
          <div className="relative bg-secondary-container/10 flex items-center justify-center p-8 h-[350px] md:h-full">
            {product.discount > 0 && (
              <span className="absolute top-5 left-5 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm tracking-wider">
                -{product.discount}% DISCOUNT
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-5 right-16 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm tracking-wider uppercase">
                Best Seller
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[80%] max-w-[85%] object-contain mix-blend-multiply drop-shadow-sm"
            />
          </div>

          {/* Right Column: Details */}
          <div className="p-8 overflow-y-auto flex flex-col justify-between h-[500px] md:h-full">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-md">
                Alloes {product.category} Formulation
              </span>

              <h2 className="font-headline text-2xl md:text-3xl text-primary font-bold mt-4 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current text-primary' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-primary ml-1.5">{product.rating}</span>
                </div>
                <span className="text-xs text-text-muted">({product.reviewsCount} Patient Reviews)</span>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-primary">Rs. {product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-text-muted line-through">
                    Rs. {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Interaction Tabs */}
              <div className="border-b border-outline-variant mt-6">
                <div className="flex gap-4 overflow-x-auto pb-px scrollbar-none">
                  {(['benefits', 'ingredients', 'directions', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-bold tracking-wider uppercase pb-2 px-1 border-b-2 transition-colors shrink-0 cursor-pointer ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-text-muted hover:text-primary'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-sm text-on-surface-variant min-h-[140px] max-h-[220px] overflow-y-auto">
                {activeTab === 'benefits' && (
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                      <FlaskConical className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">
                          Clinical Efficacy Study
                        </h4>
                        <p className="text-xs leading-relaxed text-on-surface-variant">
                          {product.scientificBenefits}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                      <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">
                          Natural Botanical Integrity
                        </h4>
                        <p className="text-xs leading-relaxed text-on-surface-variant">
                          Guaranteed 100% heavy metal-free, pesticide-tested, and harvested through ethical Ayurvedic farming cooperatives.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-2">
                      Active Formulation List
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-secondary-container/20 p-2.5 rounded-lg border border-outline-variant">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                          <span className="text-xs font-medium text-primary">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'directions' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">
                      Usage Directives
                    </h4>
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                      {product.directions}
                    </p>
                    <div className="mt-3 text-[11px] text-text-muted bg-secondary-container/20 p-3 rounded-lg border border-outline-variant italic">
                      Disclaimer: In case of active skin lesions, consult an Alloes representative or physician before application. Keep out of reach of children.
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Add Review form */}
                    <form onSubmit={handleReviewSubmit} className="bg-secondary-container/20 p-4 rounded-lg border border-outline-variant">
                      <h5 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">
                        Share Your Medical Experience
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          className="text-xs p-2.5 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none w-full bg-white"
                        />
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-xs text-text-muted mr-1">Rating:</span>
                          {[1, 2, 3, 4, 5].map((stars) => (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setNewReviewRating(stars)}
                              className="p-px cursor-pointer"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  stars <= newReviewRating ? 'text-primary fill-current' : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Write comments about purity, fragrance, efficacy..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none w-full bg-white mb-2"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Clinic Review
                      </button>
                    </form>

                    {/* Active reviews */}
                    <div className="space-y-3">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-outline-variant pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-primary">{rev.userName}</span>
                            <div className="flex items-center text-primary">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < rev.rating ? 'fill-current text-primary' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            "{rev.comment}"
                          </p>
                          <div className="flex gap-2 items-center mt-1 text-[10px] text-text-muted">
                            <span>{rev.date}</span>
                            {rev.verified && (
                              <span className="text-primary font-bold uppercase tracking-widest text-[9px]">
                                ✓ Verified Buyer
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-outline-variant pt-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-outline-variant rounded-lg bg-secondary-container/20 h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1 text-primary font-bold hover:bg-secondary-container/50 transition-colors h-full cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-primary min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1 text-primary font-bold hover:bg-secondary-container/50 transition-colors h-full cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary-container text-white h-12 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow-md cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  Add to Prescription Cart
                </button>

                <button
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    addToast(
                      isWishlisted ? 'Removed from favorites' : 'Saved to favorites!',
                      'info'
                    );
                  }}
                  className={`p-3.5 border rounded-lg hover:bg-secondary-container/30 transition-colors cursor-pointer ${
                    isWishlisted ? 'border-primary/20 bg-primary/10 text-primary' : 'border-outline-variant text-primary'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
