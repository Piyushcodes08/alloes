import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ArrowRight, RefreshCw, ShoppingCart, Sparkles, AlertCircle } from 'lucide-react';
import { AYURVEDIC_QUIZ, getQuizRecommendation } from '../data';
import { Product } from '../types';

interface QuizProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function Quiz({ onAddToCart, onSelectProduct }: QuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is intro
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const handleStart = () => {
    setAnswers({});
    setRecommendation(null);
    setCurrentStep(0);
  };

  const handleOptionSelect = (questionId: string, optionValue: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(updatedAnswers);

    if (currentStep < AYURVEDIC_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, calculate recommendation
      const rec = getQuizRecommendation(updatedAnswers);
      setRecommendation(rec);
      setCurrentStep(AYURVEDIC_QUIZ.length);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setRecommendation(null);
    setCurrentStep(-1);
  };

  return (
    <div className="bg-primary p-8 md:p-12 rounded-xl text-white shadow-xl max-w-4xl mx-auto border border-primary-container relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {/* Intro step */}
        {currentStep === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl mx-auto"
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest font-bold text-white uppercase bg-white/10 px-3 py-1.5 rounded-md">
                Interactive Ayurvedic Consultation
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-white">
                Find Your Perfect Formulation
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Take our quick 30-second wellness analysis. Our pharmaceutical algorithms will match your dermal, follicle, or organic symptoms with the perfect clinical-grade botanical product.
              </p>
            </div>
            <button
              onClick={handleStart}
              className="px-8 py-3.5 bg-white hover:bg-white/95 text-primary font-bold rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 mx-auto transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              Begin Diagnostic Quiz
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>
          </motion.div>
        )}

        {/* Question steps */}
        {currentStep >= 0 && currentStep < AYURVEDIC_QUIZ.length && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white/90 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-white/80" />
                <span>Step {currentStep + 1} of {AYURVEDIC_QUIZ.length}</span>
              </div>
              <button onClick={handleReset} className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer">
                Cancel
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-headline text-lg md:text-xl font-bold leading-snug">
                {AYURVEDIC_QUIZ[currentStep].text}
              </h4>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {AYURVEDIC_QUIZ[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(AYURVEDIC_QUIZ[currentStep].id, opt.value)}
                    className="w-full text-left p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/40 transition-all text-xs font-medium focus:outline-none flex items-center justify-between group cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-lg overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / AYURVEDIC_QUIZ.length) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {/* Results step */}
        {currentStep === AYURVEDIC_QUIZ.length && recommendation && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2 border-b border-white/10 pb-4">
              <span className="text-[10px] tracking-widest font-bold text-white uppercase bg-white/10 px-3 py-1.5 rounded-md">
                Diagnostics Complete
              </span>
              <h3 className="font-headline text-2xl font-bold text-white">Your Prescribed Formulation</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-6 rounded-xl border border-white/10">
              {/* Product image stage */}
              <div className="bg-white rounded-xl p-6 aspect-square flex items-center justify-center max-w-[240px] mx-auto w-full relative">
                <span className="absolute top-3 left-3 bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Matched
                </span>
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[80%] max-w-[85%] object-contain mix-blend-multiply drop-shadow-sm"
                />
              </div>

              {/* Product details description */}
              <div className="space-y-4 text-left">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase bg-white/10 px-2.5 py-1 rounded-md">
                    {recommendation.category} series
                  </span>
                  <h4 className="font-headline text-xl font-bold text-white mt-2 leading-tight">
                    {recommendation.name}
                  </h4>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  {recommendation.description}
                </p>

                <div className="bg-white/5 p-3.5 rounded-lg border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Scientific Indication</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed">
                    {recommendation.scientificBenefits}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => onSelectProduct(recommendation)}
                    className="text-xs font-bold text-white hover:text-white/80 transition-colors border-b border-white hover:border-white/80 pb-0.5 uppercase tracking-wider cursor-pointer"
                  >
                    View Ingredients
                  </button>
                  <button
                    onClick={() => onAddToCart(recommendation, 1)}
                    className="flex-1 bg-white hover:bg-white/95 text-primary py-3 px-[10px] rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Add Prescription - Rs. {recommendation.price.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-white/60 hover:text-white flex items-center gap-2 transition-colors focus:outline-none cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Symptom Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
