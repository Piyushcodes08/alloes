import React, { useRef } from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 3D tilt transition
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  // Map mouse positions to 3D rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  // Mirror effect for dynamic glare reflection
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["30%", "-30%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["30%", "-30%"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.15, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="bg-white p-5 rounded-xl group shadow-xs hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full border border-outline-variant relative overflow-hidden select-none"
      >
        {/* Dynamic Premium Glare Layer */}
        <motion.div
          style={{
            x: glareX,
            y: glareY,
            opacity: glareOpacity,
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay w-[200%] h-[200%] -left-1/2 -top-1/2"
        />

        {/* Product Image Stage with 3D Pop Out */}
        <div 
          className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary-container/40 p-4 flex items-center justify-center"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {product.discount > 0 && (
            <span 
              style={{ transform: "translateZ(10px)" }}
              className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm tracking-wider uppercase z-10"
            >
              -{product.discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span 
              style={{ transform: "translateZ(10px)" }}
              className="absolute top-3 right-3 bg-primary text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs uppercase tracking-wider z-10"
            >
              Best Seller
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            style={{ transform: "translateZ(40px)" }}
            className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply drop-shadow-md"
          />

          {/* Hover quick action overlay */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => onSelect(product)}
              className="p-3 bg-white text-primary rounded-lg hover:bg-primary hover:text-white hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
              title="Inspect Ingredients & Benefits"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info with Depth Offset */}
        <div 
          className="mt-4 flex-1 flex flex-col justify-between"
          style={{ transform: "translateZ(20px)" }}
        >
          <div>
            <span className="text-[10px] font-bold tracking-widest text-secondary uppercase bg-secondary-container/20 px-2 py-0.5 rounded-md inline-block">
              {product.category}
            </span>

            <h3
              onClick={() => onSelect(product)}
              className="font-headline text-md text-primary mt-2 hover:text-trust-gold transition-colors font-bold line-clamp-2 min-h-[2.75rem] cursor-pointer"
            >
              {product.name}
            </h3>

            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-trust-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-primary">{product.rating}</span>
              <span className="text-[10px] text-text-muted">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Price & Purchase Actions */}
          <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">Rs. {product.price.toFixed(2)}</div>
              {product.originalPrice > product.price && (
                <div className="text-xs text-text-muted line-through">
                  Rs. {product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product, 1)}
              className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary-container hover:scale-105 transition-all shadow-sm flex items-center justify-center cursor-pointer"
              title="Quick Add to Prescription Cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
