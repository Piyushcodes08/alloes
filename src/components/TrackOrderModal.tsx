import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ShieldCheck, MapPin, Truck, Calendar, Sparkles } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

interface TrackingStep {
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
}

export default function TrackOrderModal({ isOpen, onClose, initialOrderId = '' }: TrackOrderModalProps) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [trackingData, setTrackingData] = useState<{
    found: boolean;
    reference: string;
    date: string;
    eta: string;
    carrier: string;
    steps: TrackingStep[];
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      handleTrack(initialOrderId);
    }
  }, [initialOrderId]);

  const handleTrack = (searchId: string) => {
    const id = (searchId || orderId).trim().toUpperCase();
    if (!id) {
      setError('Please provide a valid order reference.');
      return;
    }

    setError('');
    
    // Check if it's a valid pattern
    // Alloes references usually start with AL- followed by 6 digits
    const cleanId = id.replace(/[^A-Z0-9-]/g, '');
    
    // Simulate lookup
    // If the ID is a freshly placed order during checkout, or a realistic sample:
    const isPlacedOrder = cleanId.startsWith('AL-');
    const displayId = isPlacedOrder ? cleanId : `AL-${cleanId}`;

    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const etaDate = new Date();
    etaDate.setDate(today.getDate() + 3);
    const formattedEta = etaDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    setTrackingData({
      found: true,
      reference: displayId,
      date: formattedToday,
      eta: formattedEta,
      carrier: 'Alloes Clinical Logistics (Express)',
      steps: [
        {
          title: 'Prescription Order Booked',
          description: 'Prescription coordinates and diagnostic matches verified by clinical system.',
          time: 'Today, 10:14 AM',
          status: 'completed'
        },
        {
          title: 'Laboratory Compilation',
          description: 'Formula compiled and sterilized at Alloes Pharmaceuticals Central Laboratory in Gujarat.',
          time: 'Today, 2:30 PM',
          status: 'current'
        },
        {
          title: 'Clinical Dispatched & In Transit',
          description: 'Package handed over to temperature-controlled active medical carrier.',
          time: 'Estimated Tomorrow, 9:00 AM',
          status: 'pending'
        },
        {
          title: 'Delivered to Coordinates',
          description: 'Secure, contactless delivery to your specified residence.',
          time: `Estimated ${formattedEta}`,
          status: 'pending'
        }
      ]
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden z-10 border border-outline-variant max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-secondary-container/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-primary uppercase tracking-wide">
                    Track Prescription
                  </h3>
                  <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">
                    Real-time Laboratory & Shipping Status
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-secondary-container/30 hover:bg-secondary-container rounded-lg text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Search Bar */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block">
                  Enter Order Reference Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="e.g. AL-384910 or 384910"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTrack('')}
                      className="w-full text-xs bg-secondary-container/20 text-primary px-4 py-3 pl-10 rounded-lg border border-outline-variant focus:outline-none focus:border-primary uppercase placeholder:text-text-muted"
                    />
                    <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                  </div>
                  <button
                    onClick={() => handleTrack('')}
                    className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
                {!trackingData && (
                  <p className="text-[11px] text-text-muted bg-secondary-container/10 p-3 rounded-lg border border-outline-variant">
                    💡 <strong>Pro-tip:</strong> Placed an order recently? You can find your reference (e.g., <strong>AL-738204</strong>) in your invoice statement download.
                  </p>
                )}
              </div>

              {/* Tracking Information Display */}
              <AnimatePresence mode="wait">
                {trackingData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 border-t border-outline-variant pt-6"
                  >
                    {/* Order Meta Info */}
                    <div className="grid grid-cols-2 gap-4 bg-secondary-container/20 p-4 rounded-lg border border-outline-variant text-xs">
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Reference Code</p>
                        <p className="font-mono text-primary font-bold text-sm uppercase">{trackingData.reference}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Estimated Delivery</p>
                        <p className="font-bold text-primary text-sm">{trackingData.eta}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Clinical Carrier</p>
                        <p className="font-bold text-primary">{trackingData.carrier}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">System Status</p>
                        <p className="font-bold text-emerald-600 flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" />
                          Validated Lab Order
                        </p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6 relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                      {trackingData.steps.map((step, idx) => (
                        <div key={idx} className="relative space-y-1">
                          {/* Dot status */}
                          <div
                            className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                              step.status === 'completed'
                                ? 'bg-primary border-primary text-white'
                                : step.status === 'current'
                                ? 'bg-white border-primary text-primary shadow-[0_0_0_4px_rgba(12,45,37,0.15)] animate-pulse'
                                : 'bg-white border-outline-variant text-text-muted'
                            }`}
                          >
                            {step.status === 'completed' ? (
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${step.status === 'current' ? 'bg-primary' : 'bg-outline-variant'}`} />
                            )}
                          </div>

                          <div className="flex justify-between items-start">
                            <h4
                              className={`text-xs uppercase font-bold tracking-wide ${
                                step.status === 'pending' ? 'text-text-muted' : 'text-primary'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <span className="text-[10px] text-text-muted font-mono">{step.time}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 bg-secondary-container/10 border-t border-outline-variant text-center text-[10px] text-text-muted">
              © 2026 Alloes Pharmaceuticals Logistics Division. Cold-chain transport verified in real-time.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
