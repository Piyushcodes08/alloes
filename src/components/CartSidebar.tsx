import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ShieldCheck, Ticket, CreditCard, ArrowRight, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  addToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  addToast
}: CartSidebarProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'processing' | 'success'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');

  // Processing steps states
  const [processingMsg, setProcessingMsg] = useState('');

  // Calculated Order Values
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  
  // Free delivery over 399 INR
  const shippingThreshold = 399;
  const shippingFee = subtotal > 0 && subtotal < shippingThreshold ? 50 : 0;
  
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10') {
      setAppliedDiscount({ code: 'WELCOME10', percent: 10 });
      setPromoCode('');
      addToast('Promo code WELCOME10 applied! 10% discount added.', 'success');
    } else if (code === 'AYUSH15') {
      setAppliedDiscount({ code: 'AYUSH15', percent: 15 });
      setPromoCode('');
      addToast('Ayurvedic special code AYUSH15 applied! 15% discount added.', 'success');
    } else {
      addToast('Invalid coupon code. Try WELCOME10 or AYUSH15!', 'error');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city || !postal) {
      addToast('Please fill out all billing and delivery coordinates.', 'error');
      return;
    }

    setCheckoutStep('processing');
    const messages = [
      'Authenticating therapeutic prescription parameters...',
      'Verifying pharmaceutical inventory buffers...',
      'Encrypting financial transaction pipeline...',
      'Assembling pure botanical payload...',
      'Generating custom invoice credentials...'
    ];

    let currentMsgIdx = 0;
    setProcessingMsg(messages[0]);

    const interval = setInterval(() => {
      currentMsgIdx++;
      if (currentMsgIdx < messages.length) {
        setProcessingMsg(messages[currentMsgIdx]);
      } else {
        clearInterval(interval);
        setCheckoutStep('success');
        addToast('Prescription order finalized successfully!', 'success');
      }
    }, 900);
  };

  const downloadReceipt = () => {
    const receiptContent = `
=========================================
      ALLOES PHARMACEUTICALS RECEIPT
=========================================
Order Reference: AL-${Math.floor(100000 + Math.random() * 900000)}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

SHIPPING COORDINATES:
-----------------------------------------
Client Name: ${name}
Email Address: ${email}
Contact Number: ${phone}
Delivery Address: ${address}, ${city}, India (Pin: ${postal})

ORDER SUMMARY:
-----------------------------------------
${cart.map(item => `${item.product.name} (x${item.quantity}) - Rs. ${(item.product.price * item.quantity).toFixed(2)}`).join('\n')}

FINANCIAL BREAKDOWN:
-----------------------------------------
Subtotal: Rs. ${subtotal.toFixed(2)}
Discount Applied: ${appliedDiscount ? `${appliedDiscount.code} (-${appliedDiscount.percent}%)` : 'None'}
Discount Value: -Rs. ${discountAmount.toFixed(2)}
Delivery Surcharge: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee.toFixed(2)}`}
-----------------------------------------
Grand Total: Rs. ${grandTotal.toFixed(2)}

Prescription verified and signed.
Thank you for trusting Alloes Pharmaceuticals!
=========================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Alloes_Prescription_Invoice_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Invoice statement downloaded.', 'success');
  };

  const resetAllAndClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    setAppliedDiscount(null);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  setCity('');
    setPostal('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ perspective: '1500px' }}
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (checkoutStep !== 'processing') onClose(); }}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
            <motion.div
              initial={{ x: '100%', rotateY: 25, transformOrigin: 'right center' }}
              animate={{ x: 0, rotateY: 0 }}
              exit={{ x: '100%', rotateY: 25 }}
              transition={{ type: 'spring', damping: 28, stiffness: 190 }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full bg-white shadow-xl flex flex-col justify-between border-l border-outline-variant"
            >
              {/* Header */}
              <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-headline text-lg font-bold text-primary">
                    {checkoutStep === 'cart' && 'Prescription Cart'}
                    {checkoutStep === 'checkout' && 'Billing & Delivery'}
                    {checkoutStep === 'processing' && 'Processing Lab Order'}
                    {checkoutStep === 'success' && 'Order Authenticated!'}
                  </h3>
                </div>
                {checkoutStep !== 'processing' && (
                  <button onClick={onClose} className="p-2 bg-secondary-container/40 hover:bg-secondary-container rounded-lg text-primary transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

            {/* Step 1: Cart Listing */}
            {checkoutStep === 'cart' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 bg-secondary-container/30 rounded-lg flex items-center justify-center mb-4 border border-outline-variant">
                      <ShoppingBag className="w-6 h-6 text-primary/40" />
                    </div>
                    <p className="text-sm font-semibold text-primary">Your cart is empty.</p>
                    <p className="text-xs text-text-muted mt-1 max-w-[200px]">
                      Discover our clinically validated ranges to get started.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-5 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-4 pb-4 border-b border-outline-variant">
                          <div className="w-16 h-20 bg-secondary-container/10 rounded-lg p-2 flex items-center justify-center shrink-0 border border-outline-variant">
                            <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-primary truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-primary/70 font-medium uppercase tracking-wider mt-0.5">{item.product.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity adjuster */}
                              <div className="flex items-center border border-outline-variant rounded-lg bg-secondary-container/20 text-xs">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2.5 py-1 hover:bg-secondary-container/50 transition-colors cursor-pointer text-primary font-bold"
                                >
                                  -
                                </button>
                                <span className="px-2 font-bold text-primary min-w-[1.5rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2.5 py-1 hover:bg-secondary-container/50 transition-colors cursor-pointer text-primary font-bold"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs font-bold text-primary">
                                Rs. {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0 h-fit self-center transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Box */}
                    <div className="bg-secondary-container/30 p-5 rounded-xl border border-outline-variant mt-6">
                      <div className="flex gap-2 items-center text-xs font-bold text-primary mb-2">
                        <Ticket className="w-4 h-4 text-primary" />
                        <span>APPLY CONSTITUENT VOUCHER</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="WELCOM10, AYUSH15"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 text-xs px-4 py-2.5 border border-outline-variant rounded-lg focus:border-primary focus:outline-none uppercase bg-white"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedDiscount && (
                        <div className="flex items-center justify-between mt-2 text-xs text-primary font-semibold">
                          <span>Active Code: {appliedDiscount.code} (-{appliedDiscount.percent}%)</span>
                          <button onClick={() => setAppliedDiscount(null)} className="text-red-500 hover:underline">Remove</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Checkout Form */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-outline-variant pb-1">Client Coordinates</h4>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lipi Chaudhari"
                      className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="lipi@gmail.com"
                        className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 99096..."
                        className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-outline-variant pb-1">Delivery Address</h4>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="14th Floor - Westgate Business Acumen"
                      className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">City / Town</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ahmedabad, Gujarat"
                        className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Postal Pincode</label>
                      <input
                        type="text"
                        required
                        value={postal}
                        onChange={(e) => setPostal(e.target.value)}
                        placeholder="380015"
                        className="w-full text-xs p-3 px-4 border border-outline-variant rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-container/20 p-4 rounded-lg border border-outline-variant mt-4 space-y-2">
                  <div className="flex gap-2 items-center text-xs font-bold text-primary uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Clinical Payment Settlement</span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    By submitting this request, you choose <strong>Cash on Delivery (COD) / Digital Pay on Delivery</strong>. Our courier partner validates the pharmaceutical packaging upon arrival.
                  </p>
                </div>
              </form>
            )}

            {/* Step 3: Processing loading screen */}
            {checkoutStep === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="space-y-2">
                  <h4 className="font-headline text-lg font-bold text-primary">Lab Validation in Progress</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed italic">
                    "{processingMsg}"
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Success / Receipt Screen */}
            {checkoutStep === 'success' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto border border-outline-variant">
                    <CheckCircle className="w-8 h-8 text-primary animate-bounce" />
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-primary">Prescription Booked!</h4>
                  <p className="text-xs text-text-muted leading-relaxed max-w-sm mx-auto">
                    Your botanical prescription has been successfully authenticated by our pharmaceutical team. Delivery details have been forwarded.
                  </p>

                  {/* Order summary card */}
                  <div className="bg-secondary-container/20 rounded-xl p-5 border border-outline-variant text-left text-xs space-y-2 mt-6">
                    <div className="flex justify-between border-b border-outline-variant pb-2 font-bold">
                      <span>Order Reference</span>
                      <span className="text-primary font-mono uppercase">AL-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-text-muted mt-2">
                      <span>Deliver to:</span>
                      <span className="font-semibold text-primary">{name}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Address:</span>
                      <span className="font-semibold text-primary text-right truncate max-w-[200px]" title={address}>
                        {address}, {city}
                      </span>
                    </div>
                    <div className="flex justify-between text-text-muted border-t border-outline-variant pt-2 font-bold text-primary text-sm mt-2">
                      <span>Total Invoice</span>
                      <span>Rs. {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <button
                    onClick={downloadReceipt}
                    className="w-full h-12 bg-white hover:bg-secondary-container/20 border border-primary text-primary rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-primary" />
                    Download Invoice Statement
                  </button>

                  <button
                    onClick={resetAllAndClose}
                    className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    Proceed and Clear Cart
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Total Bar (For steps cart and checkout) */}
            {(checkoutStep === 'cart' || checkoutStep === 'checkout') && cart.length > 0 && (
              <div className="p-6 border-t border-outline-variant bg-secondary-container/10 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">Rs. {subtotal.toFixed(2)}</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-primary font-semibold">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>-Rs. {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-text-muted">
                    <span>Prescription Delivery</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-primary font-bold uppercase tracking-wider">FREE Delivery</span>
                      ) : (
                        `Rs. ${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-[10px] text-primary italic text-center">
                      Add <strong>Rs. {(shippingThreshold - subtotal).toFixed(2)}</strong> more to get free shipping!
                    </p>
                  )}

                  <div className="flex justify-between text-sm font-bold text-primary border-t border-outline-variant pt-2 mt-2">
                    <span>Grand Invoice Total</span>
                    <span>Rs. {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full h-12 bg-primary hover:bg-primary-container text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Proceed to Delivery Coordinates
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="h-12 border border-outline-variant text-primary hover:bg-secondary-container/20 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      onClick={handleCheckoutSubmit}
                      className="h-12 bg-primary hover:bg-primary-container text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      Finalize Order
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>100% Secure Ayurvedic Pharmacy Node</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
}
