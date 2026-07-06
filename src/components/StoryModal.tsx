import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, HeartHandshake, Leaf, Milestone, Landmark } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryModal({ isOpen, onClose }: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        style={{ perspective: '1200px' }}
      >
        {/* Background click */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -12, rotateX: 6, z: -150 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateY: 12, rotateX: -6, z: -150 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 overflow-hidden z-10 max-h-[90vh] overflow-y-auto space-y-6 border border-outline-variant"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-secondary-container/40 hover:bg-secondary-container rounded-lg text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Area */}
          <div className="text-center space-y-2 border-b border-outline-variant pb-4">
            <span className="text-[10px] tracking-widest font-bold text-primary bg-primary/10 px-3 py-1 rounded-md uppercase">
              Ayurvedic Excellence Since 2014
            </span>
            <h3 className="font-headline text-3xl font-bold text-primary">Our Story & Heritage</h3>
          </div>

          {/* Content Body */}
          <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
            <p>
              Founded in Ahmedabad, Gujarat, <strong>Alloes Pharmaceuticals</strong> has been a trusted market leader in manufacturing high-efficacy pharmaceutical solutions infused with active organic elements.
            </p>
            <p>
              We believe that true beauty and holistic vitality emerge when meticulous clinical testing meets the raw, restorative energy of therapeutic botany. Unlike ordinary cosmetics, every single drop in our formulations is engineered inside standardized sterile laboratories and clinically verified to resolve cutaneous, follicular, or metabolic imbalances at their biological roots.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="flex gap-3 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">Clinical Standard</h4>
                  <p className="text-xs text-text-muted">Heavy metal and toxin free, conforming to strict national pharmacopoeia mandates.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">Ethical Sourcing</h4>
                  <p className="text-xs text-text-muted">Harvested directly from certified rural botanical cooperatives across the Himalayas.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">Biodegradable</h4>
                  <p className="text-xs text-text-muted">Formulated with zero microplastics, sulfates, or artificial endocrine disruptors.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-secondary-container/30 p-4 rounded-lg border border-outline-variant">
                <Landmark className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-1">Gujarat Heritage</h4>
                  <p className="text-xs text-text-muted">Headquartered at Westgate Business Acumen, Gandhinagar Highway, Ahmedabad.</p>
                </div>
              </div>
            </div>

            {/* Time line section */}
            <div className="space-y-4 pt-2">
              <h4 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                <Milestone className="w-5 h-5 text-primary" />
                Pharmaceutical Milestones
              </h4>
              <div className="border-l-2 border-primary/30 ml-3 pl-5 space-y-4">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></div>
                  <span className="font-bold text-xs text-primary">2014 — Initial Inception</span>
                  <p className="text-xs text-text-muted mt-0.5">Alloes established as an Ayurvedic laboratory focusing on organic dandruff control formulas.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></div>
                  <span className="font-bold text-xs text-primary">2018 — Clinical Scaling</span>
                  <p className="text-xs text-text-muted mt-0.5">Accreditation received from national dermatological test institutes, launching the signature Ketoconazole 2% wash.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></div>
                  <span className="font-bold text-xs text-primary">2022 — Green Cooperatives</span>
                  <p className="text-xs text-text-muted mt-0.5">Sourcing partnered entirely with rural organic farmers for premium Kashmiri saffron and cold-pressed aloe pulp.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></div>
                  <span className="font-bold text-xs text-primary">2026 — Next-Gen Bioprocessing</span>
                  <p className="text-xs text-text-muted mt-0.5">Integrating Fluidipure 8G sugar acids and sublingual sleep-induction technologies for state-of-the-art wellness.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of modal */}
          <div className="border-t border-outline-variant pt-4 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Close and Explore
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
