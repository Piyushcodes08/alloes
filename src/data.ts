import { Product, QuizQuestion } from './types';
import { categoryImages, productImages } from './imageAssets';

export const CATEGORIES = [
  {
    id: 'skin',
    name: 'Skin Care',
    subtitle: 'Dermatologically Tested',
    image: categoryImages.skinCare
  },
  {
    id: 'hair',
    name: 'Hair Care',
    subtitle: 'Nourish From Root',
    image: categoryImages.hairCare
  },
  {
    id: 'health',
    name: 'Health',
    subtitle: 'Holistic Vitality',
    image: categoryImages.health
  },
  {
    id: 'bathing',
    name: 'Bathing',
    subtitle: 'Pure Cleansing',
    image: categoryImages.bathing
  }
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-keto-2',
    name: 'Ketoconazole 2% Shampoo',
    category: 'hair',
    price: 150.00,
    originalPrice: 199.00,
    discount: 25,
    image: productImages.ketoShampoo,
    description: 'An advanced, clinically-proven anti-dandruff formulation with 2% Ketoconazole. It targets the root cause of dandruff, alleviates scalp itchiness, and checks flake recurrence while remaining gentle on hair strands.',
    ingredients: ['Ketoconazole 2% w/v', 'Purified Water', 'Sodium Laureth Sulfate', 'Cocamidopropyl Betaine', 'Fragrance', 'Citric Acid'],
    scientificBenefits: 'Inhibits fungal synthesis in Malassezia species, effectively lowering flaking indices by 84% in clinical trials with zero residual dryness.',
    directions: 'Apply to wet hair, massage gently into scalp. Leave for 3 to 5 minutes, then rinse thoroughly. Use twice weekly or as directed by a healthcare professional.',
    rating: 4.8,
    reviewsCount: 142,
    isBestSeller: true,
    reviews: [
      { id: 'rev-1', userName: 'Rajarshi Sarkar', rating: 5, date: 'June 12, 2026', comment: 'Till now I did not get any better options that give me the best results and do not harm my hair. Organic with quality - finally found it with Alloes.', verified: true },
      { id: 'rev-2', userName: 'Aravind K.', rating: 4, date: 'May 30, 2026', comment: 'Very effective against dry scalp. Reduced flaking dramatically in just two washes.', verified: true }
    ]
  },
  {
    id: 'prod-mahabhringraj',
    name: 'Mahabhringraj Oil | 200ml',
    category: 'hair',
    price: 310.00,
    originalPrice: 380.00,
    discount: 18,
    image: productImages.bhringrajOil,
    description: 'A classical Ayurvedic formulation enriched with hand-pressed Bhringraj extract, Sesame oil, and rare Himalayan herbs. It vitalizes hair follicles, prevents premature graying, and promotes rich, dense hair growth.',
    ingredients: ['Bhringraj extract (Eclipta Alba)', 'Sesame Oil', 'Coconut Oil', 'Amala', 'Mulethi', 'Neem Leaf extract'],
    scientificBenefits: 'Promotes follicular proliferation by activating beta-catenin pathways. Studies show a 32% increase in active hair shaft diameter over 12 weeks of standard usage.',
    directions: 'Massage gently into the scalp using fingertips in circular motion. Leave on for at least 45 minutes or overnight. Wash with a mild Alloes shampoo.',
    rating: 4.9,
    reviewsCount: 215,
    isBestSeller: true,
    reviews: [
      { id: 'rev-3', userName: 'Nalini J.', rating: 5, date: 'June 25, 2026', comment: 'Traditional smell but works wonders. My hair fall has stopped almost completely.', verified: true },
      { id: 'rev-4', userName: 'Deepak Sharma', rating: 5, date: 'June 11, 2026', comment: 'A pure and authentic ayurvedic oil. Feels highly calming to the scalp before sleep.', verified: true }
    ]
  },
  {
    id: 'prod-keto-plus',
    name: 'Ketoclean Plus Shampoo',
    category: 'hair',
    price: 179.00,
    originalPrice: 239.00,
    discount: 25,
    image: productImages.ketocleanPlus,
    description: 'Synergistic double-action therapeutic shampoo combining Climbazole and ZPTO. It controls severe seborrheic dermatitis, flaky build-up, and persistent itching while conditioning the scalp ecosystem.',
    ingredients: ['Climbazole 1% w/v', 'Zinc Pyrithione (ZPTO) 1% w/v', 'Aloe Vera Gel', 'Pro-Vitamin B5', 'Coco-Glucoside'],
    scientificBenefits: 'Dual-active synthesis disrupts fungal cell membrane stability, delivering a 2x faster reduction in dandruff recurrence compared to standard single-active formulations.',
    directions: 'Apply to wet scalp. Lather and leave for 3 minutes. Rinse with lukewarm water. Use thrice a week for intensive dandruff control.',
    rating: 4.7,
    reviewsCount: 98,
    isBestSeller: true,
    reviews: [
      { id: 'rev-5', userName: 'Lipi Chaudhari', rating: 5, date: 'April 14, 2026', comment: 'The shampoo is the best I\'ve ever used. Extremely affordable and no side effects. The fragrance is strong but the results are exceptional.', verified: true }
    ]
  },
  {
    id: 'prod-keto-pro',
    name: 'Ketoclean Pro Shampoo',
    category: 'hair',
    price: 249.00,
    originalPrice: 299.00,
    discount: 17,
    image: productImages.ketocleanPro,
    description: 'Premium pharmaceutical hair wash powered by Fluidipure 8G, salicylic acid, and botanical scalp purifiers. It limits sebum hyper-production and controls stubborn yeast strains while restoring natural hair shine.',
    ingredients: ['Fluidipure 8G', 'Salicylic Acid 2%', 'Rosemary Oil', 'Tea Tree extract', 'Hydrolyzed Wheat Protein'],
    scientificBenefits: 'Fluidipure 8G biomimetic sugar acid decreases sebum secretion by 38% and significantly counters scalp irritation, strengthening the cutaneous barrier.',
    directions: 'Apply to wet hair, lather nicely, massage the scalp for 2 minutes, and wash out completely. Ideal for oily scalp conditions.',
    rating: 4.9,
    reviewsCount: 184,
    isBestSeller: true,
    isNewLaunch: true,
    reviews: [
      { id: 'rev-6', userName: 'Varun Sonagra', rating: 5, date: 'January 28, 2026', comment: 'The ointments and shampoos by Alloes are true to their quality. After using these products, no other brand will satisfy you. Absolute gold standard.', verified: true }
    ]
  },
  {
    id: 'prod-sleepwell',
    name: 'Sleepwell Melatonin Quick & Calm Sleep Spray',
    category: 'health',
    price: 165.00,
    originalPrice: 199.00,
    discount: 17,
    image: productImages.sleepwellSpray,
    description: 'Fast-absorbing sublingual melatonin spray combined with Chamomile and Valerian root. It naturally calms the nervous system, supports healthy sleep cycles, and helps tackle jet lag without next-day drowsiness.',
    ingredients: ['Melatonin (Pharma Grade)', 'Chamomile extract', 'Valerian Root', 'L-Theanine', 'Peppermint oil', 'Purified Water'],
    scientificBenefits: 'Sublingual oral spray form allows immediate mucosal absorption, bypassing the first-pass hepatic metabolism for a 4x quicker onset of calm sleep than standard oral pills.',
    directions: 'Spray 2-3 times under the tongue 30 minutes before bed. Hold for 30 seconds before swallowing.',
    rating: 4.6,
    reviewsCount: 75,
    isNewLaunch: true,
    reviews: [
      { id: 'rev-7', userName: 'Karan Mehra', rating: 5, date: 'May 10, 2026', comment: 'Fantastic product! It helps me fall asleep within 15 minutes of spraying. Safe and non-addictive.', verified: true }
    ]
  },
  {
    id: 'prod-kabz-safa',
    name: 'Alloes Kabz Safa for Digestion',
    category: 'health',
    price: 169.00,
    originalPrice: 225.00,
    discount: 25,
    image: productImages.kabzSafa,
    description: 'An expert herbal digestive blend featuring premium Senna, Haritaki, and Ajwain. It naturally relieves acute constipation, bloating, and stomach discomfort, ensuring daily internal detoxification and metabolic harmony.',
    ingredients: ['Senna Leaves (Cassia angustifolia)', 'Haritaki (Terminalia chebula)', 'Ajwain', 'Saunf (Fennel)', 'Rock Salt', 'Hing'],
    scientificBenefits: 'Formulated with standardized sennosides which moderately stimulate peristaltic muscular contractions of the colon. Clinically validated for gentle overnight relief without electrolyte imbalance.',
    directions: 'Take 1/2 to 1 teaspoon (3g - 6g) with lukewarm water before sleeping, or as directed by an Ayurvedic physician.',
    rating: 4.8,
    reviewsCount: 110,
    isNewLaunch: true,
    reviews: [
      { id: 'rev-8', userName: 'Meena Patel', rating: 5, date: 'June 18, 2026', comment: 'The most reliable digestive aid. Non-habit forming and provides absolute comfort next morning.', verified: true }
    ]
  },
  {
    id: 'prod-multivitamin',
    name: 'Alloes Multivitamins for Women',
    category: 'health',
    price: 269.00,
    originalPrice: 299.00,
    discount: 10,
    image: productImages.multivitaminsWomen,
    description: 'Tailored daily multi-nutrient blend packed with 25 essential vitamins, minerals, and antioxidant botanical extracts. Specially designed to support female hormonal balance, bone density, daily energy levels, and skin health.',
    ingredients: ['Vitamin D3', 'Folic Acid', 'Iron', 'Calcium', 'Shatavari Extract', 'Ginkgo Biloba', 'Zinc'],
    scientificBenefits: 'Provides 100% RDA of Iron and Folic Acid alongside bioactive Shatavari phytoestrogens, enhancing baseline cell metabolism and mitigating monthly hormonal fatigue.',
    directions: 'Take one tablet daily with breakfast or lunch, washed down with a full glass of water.',
    rating: 4.7,
    reviewsCount: 130,
    isNewLaunch: true,
    reviews: [
      { id: 'rev-9', userName: 'Ananya S.', rating: 4, date: 'April 02, 2026', comment: 'Great product for working women. I feel much more energetic during my afternoon shifts.', verified: true }
    ]
  },
  {
    id: 'prod-scabit',
    name: 'Alloes Scabit Permethrin Soap',
    category: 'bathing',
    price: 110.00,
    originalPrice: 135.00,
    discount: 18,
    image: productImages.scabitSoap,
    description: 'Medicated Permethrin bathing soap expertly formulated for skin parasite control, itch relief, and deep hygiene. Blended with skin-soothing aloe vera to prevent post-bath dryness.',
    ingredients: ['Permethrin 1% w/w', 'Soap Base q.s.', 'Aloe Vera Gel', 'Glycerin', 'Titanium Dioxide'],
    scientificBenefits: 'Permethrin paralyzes the nervous system of external dermal micro-parasites, clearing skin infestations while glycerin maintains moisture equilibrium.',
    directions: 'Work up rich lather on damp skin, leave for 2-3 minutes to allow maximum treatment absorption, then rinse thoroughly.',
    rating: 4.8,
    reviewsCount: 64,
    reviews: [
      { id: 'rev-10', userName: 'Kunal G.', rating: 5, date: 'May 22, 2026', comment: 'Prescribed by my dermatologist for skin allergy, worked exceptionally well. Highly recommended.', verified: true }
    ]
  },
  {
    id: 'prod-aloesaffron',
    name: 'Alloes Aloe Saffron Pure Skin Gel',
    category: 'skin',
    price: 199.00,
    originalPrice: 249.00,
    discount: 20,
    image: productImages.aloeSaffronGel,
    description: 'A luxurious dermatologically-tested face gel combining pure cold-pressed Aloe Vera pulp with premium Kashmiri Saffron. It hydrates deep into skin cells, fades blemishes, and unlocks a natural golden glow.',
    ingredients: ['Pure Aloe Vera Gel 90%', 'Kashmiri Saffron (Crocus Sativus) extract', 'Vitamin E', 'Tea Tree oil', 'Hyaluronic Acid'],
    scientificBenefits: 'Crocin in saffron serves as a natural antioxidant block, neutralizing UV-induced cellular degradation and reducing melanin indices by 21%.',
    directions: 'Massage gently over cleansed face and neck in upward circular strokes until fully absorbed. Best used as a nightly moisturizer.',
    rating: 4.9,
    reviewsCount: 154,
    reviews: [
      { id: 'rev-11', userName: 'Srishti Sen', rating: 5, date: 'June 01, 2026', comment: 'Extremely lightweight and absorbs instantly! My skin feels incredibly plump and has a lovely healthy radiance.', verified: true }
    ]
  },
  {
    id: 'prod-moisturizer',
    name: 'Alloes Saffron Infused Deep Hydrating Moisturizer',
    category: 'skin',
    price: 240.00,
    originalPrice: 299.00,
    discount: 20,
    image: productImages.radiantSkinBeauty,
    description: 'A clinical-grade, deep-acting moisturizer enriched with pure Kashmiri Saffron, organic Shea Butter, and Hyaluronic Acid. It locks in moisture for up to 48 hours, leaving skin exceptionally soft and plump.',
    ingredients: ['Kashmiri Saffron extract', 'Shea Butter', 'Hyaluronic Acid 1.5%', 'Vitamin E', 'Organic Aloe Vera pulp'],
    scientificBenefits: 'Saffron bio-extract stimulates natural skin cellular moisture retention, combined with Hyaluronic Acid for intensive multi-layer epidermal hydration.',
    directions: 'Apply liberally over face and neck after cleansing. Massage gently in upward circular motions.',
    rating: 4.8,
    reviewsCount: 88,
    reviews: [
      { id: 'rev-m1', userName: 'Anjali P.', rating: 5, date: 'June 10, 2026', comment: 'Extremely hydrating and non-greasy. Works perfect as a night moisturizer!', verified: true }
    ]
  },
  {
    id: 'prod-serum',
    name: 'Alloes Vitamin C & Rosehip Face Serum',
    category: 'skin',
    price: 349.00,
    originalPrice: 420.00,
    discount: 17,
    image: categoryImages.skinCare,
    description: 'An advanced stable 15% Vitamin C serum combined with organic Rosehip Oil and Ferulic Acid. It actively targets hyperpigmentation, fights free radicals, and evens out skin tone for a brighter, glowing complexion.',
    ingredients: ['L-Ascorbic Acid (Vitamin C) 15%', 'Rosehip Oil', 'Ferulic Acid', 'Hyaluronic Acid', 'Witch Hazel'],
    scientificBenefits: 'Clinical trials show a 27% reduction in dark spots and blemishes within 6 weeks, actively shielding against environmental pollution.',
    directions: 'Apply 3-4 drops to clean, dry face in the morning. Pat gently and follow with sunscreen.',
    rating: 4.7,
    reviewsCount: 104,
    reviews: [
      { id: 'rev-s1', userName: 'Kriti S.', rating: 5, date: 'May 14, 2026', comment: 'Noticeable glow in just a couple of weeks. My acne scars have faded significantly.', verified: true }
    ]
  },
  {
    id: 'prod-footcare',
    name: 'Alloes Foot Heal Specialized Cracked Heel Cream',
    category: 'skin',
    price: 125.00,
    originalPrice: 155.00,
    discount: 19,
    image: categoryImages.skinCare,
    description: 'A deeply nourishing, non-greasy therapeutic foot cream formulated with 10% Urea, Salicylic Acid, and Tea Tree Oil. It rapidly heals dry, cracked heels, softens rough skin, and provides deep hydration.',
    ingredients: ['Urea 10% w/w', 'Salicylic Acid 1%', 'Tea Tree Oil', 'Lanolin', 'Glycerin', 'Aloe Vera extract'],
    scientificBenefits: 'Urea serves as a powerful keratolytic agent to dissolve hardened skin, allowing Tea Tree Oil and Aloe to deeply sanitize and repair tissues.',
    directions: 'Wash feet thoroughly, apply cream generously to affected areas twice daily, preferably before sleeping.',
    rating: 4.9,
    reviewsCount: 56,
    reviews: [
      { id: 'rev-f1', userName: 'Harsh V.', rating: 5, date: 'April 20, 2026', comment: 'Absolute magic for cracked heels. Healed my feet completely in less than a week.', verified: true }
    ]
  },
  {
    id: 'prod-facewash',
    name: 'Alloes Neem & Saffron Purifying Face Wash',
    category: 'skin',
    price: 145.00,
    originalPrice: 185.00,
    discount: 22,
    image: categoryImages.skinCare,
    description: 'A gentle, soap-free clarifying face wash with Neem oil and premium Saffron. It actively fights acne-causing micro-organisms, deep cleans pores, and controls excess oil without stripping moisture.',
    ingredients: ['Neem extract', 'Kashmiri Saffron extract', 'Salicylic Acid 0.5%', 'Green Tea extract', 'Tea Tree Oil'],
    scientificBenefits: 'The anti-bacterial activity of Neem prevents active acne breakouts by 40%, while Saffron reduces inflammation and promotes dermal repair.',
    directions: 'Squeeze a small amount onto wet palms, work up a lather, massage gently on face, and rinse off with cool water.',
    rating: 4.6,
    reviewsCount: 92,
    reviews: [
      { id: 'rev-fw1', userName: 'Simran K.', rating: 4, date: 'June 02, 2026', comment: 'Very gentle. Prevents breakouts and doesn\'t make the skin feel dry.', verified: true }
    ]
  },
  {
    id: 'prod-lightening',
    name: 'Alloes Kojic Acid Skin Lightening Cream',
    category: 'skin',
    price: 285.00,
    originalPrice: 350.00,
    discount: 18,
    image: productImages.radiantSkinBeauty,
    description: 'A dermatologically-approved advanced skin lightening cream with 2% Kojic Acid, Niacinamide, and Licorice extract. It suppresses melanin synthesis, treats dark patches, and restores natural radiance.',
    ingredients: ['Kojic Acid Dipalmitate 2%', 'Niacinamide 4%', 'Licorice extract', 'Alpha Arbutin 1%', 'Mulberry extract'],
    scientificBenefits: 'Kojic Acid selectively chelates copper ions required for tyrosinase activity, delivering a balanced, lighter, and more uniform skin tone.',
    directions: 'Apply a thin layer to clean face and neck during your night routine. Must be accompanied by sunscreen during the day.',
    rating: 4.8,
    reviewsCount: 78,
    reviews: [
      { id: 'rev-l1', userName: 'Rahul M.', rating: 5, date: 'May 28, 2026', comment: 'My pigmentation has visibly reduced. Highly effective and dermatologist approved.', verified: true }
    ]
  },
  {
    id: 'prod-conditioner',
    name: 'Alloes Nourishing Argan & Keratin Hair Conditioner',
    category: 'hair',
    price: 195.00,
    originalPrice: 249.00,
    discount: 22,
    image: categoryImages.hairCare,
    description: 'An ultra-nourishing clinical hair conditioner with Moroccan Argan oil and hydrolyzed Keratin. It repairs dry and damaged hair shafts, locks in essential moisture, and eliminates frizz for silky-smooth strands.',
    ingredients: ['Moroccan Argan Oil', 'Hydrolyzed Keratin', 'Pro-Vitamin B5', 'Shea Butter', 'Almond Oil'],
    scientificBenefits: 'Keratin micro-proteins penetrate the hair cuticle to rebuild broken disulfide bonds, increasing structural hair tensile strength by 30%.',
    directions: 'After shampooing, apply generously to hair mid-lengths and ends. Leave for 2-3 minutes, then rinse thoroughly.',
    rating: 4.8,
    reviewsCount: 112,
    reviews: [
      { id: 'rev-c1', userName: 'Megha R.', rating: 5, date: 'June 05, 2026', comment: 'Makes my hair feel so soft and manageable. Best companion for the Keto shampoo.', verified: true }
    ]
  },
  {
    id: 'prod-liversyrup',
    name: 'Alloes Livo-Safe Ayurvedic Liver Syrup',
    category: 'health',
    price: 155.00,
    originalPrice: 195.00,
    discount: 20,
    image: categoryImages.health,
    description: 'A highly concentrated hepatoprotective Ayurvedic syrup featuring Kutki, Bhumi Amla, and Kalmegh. It detoxifies the liver, aids healthy digestion, stimulates appetite, and protects against liver toxins.',
    ingredients: ['Bhumi Amla (Phyllanthus niruri)', 'Kutki (Picrorhiza kurroa)', 'Kalmegh (Andrographis paniculata)', 'Punarnava', 'Guduchi', 'Makoy'],
    scientificBenefits: 'Active phytochemicals promote liver cell regeneration, enhance bile secretion, and reduce hepatic inflammation indices in clinical trials.',
    directions: 'Take 1 to 2 teaspoons (5ml - 10ml) twice daily before meals, or as directed by an Ayurvedic physician.',
    rating: 4.9,
    reviewsCount: 124,
    reviews: [
      { id: 'rev-ls1', userName: 'Rajesh G.', rating: 5, date: 'May 18, 2026', comment: 'Extremely effective. Improved my appetite and resolved all digestion issues.', verified: true }
    ]
  },
  {
    id: 'prod-ironsyrup',
    name: 'Alloes Ferroglobe Iron & Folic Acid Syrup',
    category: 'health',
    price: 165.00,
    originalPrice: 199.00,
    discount: 17,
    image: categoryImages.health,
    description: 'A highly bioavailable iron supplement syrup with Vitamin B12 and Folic Acid. It rapidly boosts hemoglobin production, combats fatigue, and maintains daily cell energy levels without causing stomach irritation.',
    ingredients: ['Ferrous Ascorbate', 'Folic Acid', 'Methylcobalamin (Vitamin B12)', 'Zinc Sulfate', 'Peppermint Flavour'],
    scientificBenefits: 'Ferrous Ascorbate offers 3x higher absorption compared to conventional iron salts, ensuring optimal red blood cell synthesis.',
    directions: 'Take 1 teaspoon (5ml) daily after meals, or as prescribed by a medical physician.',
    rating: 4.7,
    reviewsCount: 86,
    reviews: [
      { id: 'rev-is1', userName: 'Priyamvada S.', rating: 4, date: 'June 15, 2026', comment: 'Doesn\'t cause any gastric issues. My hemoglobin levels improved in just one month.', verified: true }
    ]
  },
  {
    id: 'prod-kidneysyrup',
    name: 'Alloes Nephro-Cleanse Kidney Care Syrup',
    category: 'health',
    price: 175.00,
    originalPrice: 220.00,
    discount: 20,
    image: categoryImages.health,
    description: 'An advanced Ayurvedic kidney revitalizer syrup with Varun, Punarnava, and Gokhru. It supports urinary tract health, regulates fluid balance, flushes out toxins, and helps prevent stone formation.',
    ingredients: ['Punarnava (Boerhavia diffusa)', 'Gokhru (Tribulus terrestris)', 'Varun Bark (Crataeva nurvala)', 'Pashanbhed', 'Sheetal Chini', 'Yavakshar'],
    scientificBenefits: 'Demonstrates active diuretic and anti-urolithic properties, preventing calcium oxalate crystallization in renal tubules.',
    directions: 'Take 2 teaspoons (10ml) with water twice daily, or as advised by your healthcare specialist.',
    rating: 4.8,
    reviewsCount: 94,
    reviews: [
      { id: 'rev-ks1', userName: 'Vikas T.', rating: 5, date: 'April 30, 2026', comment: 'Highly recommended for kidney health. Very comforting and naturally effective.', verified: true }
    ]
  },
  {
    id: 'prod-orthooil',
    name: 'Alloes Ortho-Relief Ayurvedic Joint Pain Oil',
    category: 'health',
    price: 220.00,
    originalPrice: 280.00,
    discount: 21,
    image: categoryImages.health,
    description: 'A powerful, fast-absorbing anti-inflammatory massage oil with Nilgiri oil, Gandhapura oil, and Shallaki. It provides rapid, long-lasting relief from joint stiffness, muscular sprains, arthritis, and backaches.',
    ingredients: ['Shallaki (Boswellia serrata)', 'Gandhapura (Wintergreen Oil)', 'Nilgiri (Eucalyptus Oil)', 'Mahanarayan Oil', 'Panchgun Oil', 'Camphor'],
    scientificBenefits: 'Wintergreen and Shallaki actively inhibit COX-2 pathways, reducing local inflammation and improving joint range of motion.',
    directions: 'Apply 5-10ml to the affected joint or muscle. Massage gently in circular motions until absorbed. Apply a hot compress for best results.',
    rating: 4.9,
    reviewsCount: 146,
    reviews: [
      { id: 'rev-oo1', userName: 'Surendra K.', rating: 5, date: 'June 20, 2026', comment: 'My knee joint pain has reduced immensely. Bending and walking is much easier now.', verified: true }
    ]
  },
  {
    id: 'prod-neemsoap',
    name: 'Alloes Standardized Neem & Charcoal Bathing Soap',
    category: 'bathing',
    price: 95.00,
    originalPrice: 120.00,
    discount: 20,
    image: categoryImages.bathing,
    description: 'An organic antibacterial bathing bar formulated with steam-distilled Neem extract and active Charcoal. It draws out deep skin impurities, exfoliates gently, and checks skin acne, rashes, and body odor.',
    ingredients: ['Neem oil', 'Activated Charcoal', 'Tea Tree extract', 'Coconut Oil base', 'Glycerin'],
    scientificBenefits: 'Activated charcoal micropores adsorb toxins 200x their weight, while Neem isolates block bacterial cell wall synthesis for complete skin purification.',
    directions: 'Lather onto wet skin during bath, massage gently for 1 minute, and rinse thoroughly.',
    rating: 4.7,
    reviewsCount: 74,
    reviews: [
      { id: 'rev-ns1', userName: 'Amit J.', rating: 5, date: 'May 12, 2026', comment: 'Leaves the skin feeling extremely clean and fresh. Perfect for hot summer days!', verified: true }
    ]
  },
  {
    id: 'prod-showergel',
    name: 'Alloes Aloe Vera Refreshing Shower Gel',
    category: 'bathing',
    price: 185.00,
    originalPrice: 225.00,
    discount: 17,
    image: categoryImages.bathing,
    description: 'A luxurious, soap-free cleansing body wash infused with 90% organic Aloe Vera gel, Vitamin E, and Mint. It hydrates the body, soothens irritated skin, and delivers an icy, refreshing sensation.',
    ingredients: ['Organic Aloe Vera gel 90%', 'Vitamin E', 'Peppermint extract', 'Cucumber extract', 'Coco-Betaine'],
    scientificBenefits: 'Cold-pressed Aloe gel contains over 75 active vitamins and enzymes, hydrating dry epidermal layers instantly by 45%.',
    directions: 'Pour onto a damp loofah, work into a rich lather, scrub gently over the body, and rinse off.',
    rating: 4.8,
    reviewsCount: 82,
    reviews: [
      { id: 'rev-sg1', userName: 'Rohan P.', rating: 5, date: 'June 14, 2026', comment: 'Smells incredibly fresh and doesn\'t dry out the skin like standard soaps. Love it!', verified: true }
    ]
  },
  {
    id: 'prod-antibiotic',
    name: 'Alloes Neomycin Antibiotic Healing Skin Ointment',
    category: 'health',
    price: 130.00,
    originalPrice: 160.00,
    discount: 18,
    image: productImages.organicLabHero,
    description: 'A clinical triple-action antibiotic skin ointment featuring Neomycin, Polymyxin B, and Bacitracin. It prevents bacterial infection in minor cuts, scrapes, burns, and facilitates quick scar healing.',
    ingredients: ['Neomycin Sulfate 5mg/g', 'Polymyxin B Sulfate', 'Bacitracin Zinc', 'White Petrolatum base'],
    scientificBenefits: 'Disrupts bacterial protein synthesis and cell wall integrity, eliminating broad-spectrum pathogens from dermal wounds within 24 hours.',
    directions: 'Clean the affected area, apply a small amount of ointment 1 to 3 times daily. Can be covered with a sterile bandage.',
    rating: 4.9,
    reviewsCount: 42,
    reviews: [
      { id: 'rev-ab1', userName: 'Dr. Ramesh S.', rating: 5, date: 'March 18, 2026', comment: 'Standard clinical formula. Reliable antiseptic and antibacterial action.', verified: true }
    ]
  },
  {
    id: 'prod-antifungal',
    name: 'Alloes Luliconazole 1% Anti Fungal Cream',
    category: 'skin',
    price: 195.00,
    originalPrice: 240.00,
    discount: 18,
    image: productImages.radiantSkinBeauty,
    description: 'An extremely potent anti-fungal cream containing 1% Luliconazole. It provides fast and permanent relief from stubborn ringworm, athlete\'s foot, jock itch, and other cutaneous fungal infections.',
    ingredients: ['Luliconazole 1% w/w', 'Benzyl Alcohol (preservative)', 'Cream Base q.s.'],
    scientificBenefits: 'Luliconazole binds to and inhibits lanosterol 14-alpha-demethylase, terminating ergosterol synthesis in fungal cell membranes with a 98% clearance rate.',
    directions: 'Wash and dry the affected area. Apply a thin layer of cream once daily for 1 to 2 weeks, or as directed by a doctor.',
    rating: 4.8,
    reviewsCount: 116,
    reviews: [
      { id: 'rev-af1', userName: 'Devendra K.', rating: 5, date: 'June 08, 2026', comment: 'Extremely effective! Cleared my persistent ringworm infection in just 5 days.', verified: true }
    ]
  },
  {
    id: 'prod-antiseptic',
    name: 'Alloes Antiseptic Healing Liquid',
    category: 'health',
    price: 115.00,
    originalPrice: 145.00,
    discount: 20,
    image: productImages.organicLabHero,
    description: 'A powerful clinical antiseptic liquid with Chlorhexidine Gluconate and Cetrimide. It disinfects cuts, insect bites, minor wounds, and sanitizes household surroundings safely.',
    ingredients: ['Chlorhexidine Gluconate 1.5% v/v', 'Cetrimide 3.0% w/v', 'Isopropyl Alcohol', 'Pine Oil', 'Purified Water'],
    scientificBenefits: 'Dual chlorhexidine-cetrimide action lyses bacterial cell membranes instantly, preventing wound infection and sepsis.',
    directions: 'Dilute with clean water (1:15 ratio) before applying to wounds, or use as directed by a physician.',
    rating: 4.8,
    reviewsCount: 68,
    reviews: [
      { id: 'rev-as1', userName: 'Savita B.', rating: 5, date: 'January 14, 2026', comment: 'A household necessity. Perfect antiseptic liquid for first aid.', verified: true }
    ]
  },
  {
    id: 'prod-bwitte',
    name: 'Alloes B-Witte Advanced Skin Whitening Capsules',
    category: 'health',
    price: 499.00,
    originalPrice: 599.00,
    discount: 16,
    image: productImages.multivitaminsWomen,
    description: 'A premium, clinical-strength dietary antioxidant supplement combining reduced L-Glutathione, Vitamin C, and Grape Seed extract. It lightens skin from within, removes toxins, and fades dark spots.',
    ingredients: ['L-Glutathione (Reduced) 500mg', 'Vitamin C (Ascorbic Acid) 100mg', 'Grape Seed extract', 'Alpha Lipoic Acid', 'Vitamin E'],
    scientificBenefits: 'Systemic glutathione shifts melanin synthesis from dark eumelanin to light pheomelanin, illuminating the dermal layer from inside.',
    directions: 'Take 1 capsule daily after dinner with warm water, or as prescribed by a health professional.',
    rating: 4.7,
    reviewsCount: 154,
    reviews: [
      { id: 'rev-bw1', userName: 'Ananya D.', rating: 5, date: 'June 26, 2026', comment: 'Amazing capsules! My skin tone has evened out, and my face looks so much brighter and healthier.', verified: true }
    ]
  },
  {
    id: 'prod-coughsyr',
    name: 'Alloes Kof-Safa Ayurvedic Cough Syrup',
    category: 'health',
    price: 110.00,
    originalPrice: 135.00,
    discount: 18,
    image: productImages.kabzSafa,
    description: 'An expert Ayurvedic non-drowsy cough syrup featuring Tulsi, Vasaka, and Yashtimadhu. It rapidly soothens sore throats, liquefies thick mucus, relieves dry and wet cough, and eases chest congestion.',
    ingredients: ['Tulsi (Ocimum sanctum)', 'Vasaka (Adhatoda vasica)', 'Yashtimadhu (Licorice)', 'Kantakari', 'Honey', 'Pipali'],
    scientificBenefits: 'Tulsi and Honey serve as natural demulcents and bronchodilators, reducing cough receptor hypersensitivity by 50% without causing sedation.',
    directions: 'Take 1 to 2 teaspoons (5ml - 10ml) thrice daily with lukewarm water.',
    rating: 4.8,
    reviewsCount: 89,
    reviews: [
      { id: 'rev-cs1', userName: 'Madan M.', rating: 5, date: 'May 30, 2026', comment: 'Best cough syrup ever. Safe for children too, and doesn\'t make you sleepy.', verified: true }
    ]
  },
  {
    id: 'prod-healthtonic',
    name: 'Alloes Wheatgrass & Giloy Ayurvedic Health Tonic',
    category: 'health',
    price: 245.00,
    originalPrice: 299.00,
    discount: 18,
    image: categoryImages.health,
    description: 'A pure, cold-pressed immunological health tonic combining organic Wheatgrass juice with Giloy (Guduchi) extract. It boosts baseline white blood cell count, purifies blood, and aids systemic detoxification.',
    ingredients: ['Organic Wheatgrass juice 60%', 'Giloy (Tinospora cordifolia) stem juice 40%', 'Citric acid (natural preservative)'],
    scientificBenefits: 'High chlorophyll and tinosporide concentrations stimulate macrophages and boost natural killer cell activity, strengthening the baseline immune response.',
    directions: 'Mix 30ml of health tonic in a glass of warm water. Consume on an empty stomach in the morning.',
    rating: 4.8,
    reviewsCount: 114,
    reviews: [
      { id: 'rev-ht1', userName: 'Vinod S.', rating: 5, date: 'June 16, 2026', comment: 'Extremely fresh and energizing. Improved my digestive health and general vitality.', verified: true }
    ]
  },
  {
    id: 'prod-healthcarecombo',
    name: 'Alloes Complete Healthcare Family Combo Pack',
    category: 'health',
    price: 599.00,
    originalPrice: 850.00,
    discount: 29,
    image: productImages.organicLabHero,
    description: 'A premium health and wellness basket for the entire family. Features Alloes Multivitamins, Kabz Safa digestives, Neem and Charcoal soap, and Aloe Saffron pure skin gel at an unbeatable value.',
    ingredients: ['1x Multivitamins for Women (30 tab)', '1x Kabz Safa for Digestion (100g)', '1x Neem Soap (100g)', '1x Aloe Saffron Gel (100g)'],
    scientificBenefits: 'Comprehensive health supplementation, intestinal detoxification, anti-bacterial hygiene, and cellular hydration packaged together for overall wellness.',
    directions: 'Use individual formulations according to standard package instructions.',
    rating: 4.9,
    reviewsCount: 204,
    reviews: [
      { id: 'rev-hcc1', userName: 'Pallavi D.', rating: 5, date: 'June 29, 2026', comment: 'Amazing value! Every single product is premium-grade and highly effective.', verified: true }
    ]
  },
  {
    id: 'prod-oralcare',
    name: 'Alloes Herbal Dant-Kanti Pure Toothpaste',
    category: 'bathing',
    price: 85.00,
    originalPrice: 110.00,
    discount: 22,
    image: categoryImages.bathing,
    description: 'An advanced Ayurvedic toothpaste with Neem, Babool, and Clove oil. It strengthens gums, fights dental plaque, eliminates tooth sensitivity, and checks mouth ulcers for fresh, minty breath.',
    ingredients: ['Neem extract', 'Babool extract (Acacia arabica)', 'Clove Oil (Laung)', 'Vajradanti', 'Pudina Satva (Menthol)'],
    scientificBenefits: 'Clove oil provides natural eugenol anesthetic and antiseptic action, keeping teeth germ-free and preventing plaque calcification.',
    directions: 'Brush thoroughly twice daily, or as advised by your dentist.',
    rating: 4.7,
    reviewsCount: 128,
    reviews: [
      { id: 'rev-oc1', userName: 'Sanjay P.', rating: 5, date: 'June 18, 2026', comment: 'Extremely good toothpaste. Completely cured my tooth sensitivity in 2 weeks.', verified: true }
    ]
  },
  {
    id: 'prod-babywash',
    name: 'Alloes Baby Aloe Gentle Cleansing Bath Wash',
    category: 'bathing',
    price: 175.00,
    originalPrice: 220.00,
    discount: 20,
    image: categoryImages.bathing,
    description: 'An ultra-mild, tear-free pediatric bath wash for babies. Enriched with organic Aloe Vera extract, Almond Oil, and Chamomile, it gently cleanses sensitive baby skin while retaining its natural soft moisture.',
    ingredients: ['Organic Aloe Vera pulp', 'Almond Oil', 'Chamomile extract', 'Glycerin', 'Coco-glucoside (derived from coconut)'],
    scientificBenefits: 'PH-balanced, hypoallergenic formulation maintains the integrity of the delicate pediatric skin barrier, keeping skin soft and rash-free.',
    directions: 'Pour onto wet palms, massage gently onto baby\'s body to create mild lather, and rinse off thoroughly with warm water.',
    rating: 4.9,
    reviewsCount: 72,
    reviews: [
      { id: 'rev-bw1', userName: 'Supriya K.', rating: 5, date: 'June 22, 2026', comment: 'So gentle and has a lovely mild scent. Absolutely safe and soothing for baby skin.', verified: true }
    ]
  }
];

export const AYURVEDIC_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'What is your primary wellness or beauty concern today?',
    options: [
      { text: 'Severe Dandruff / Scalp Itchiness', value: 'dandruff' },
      { text: 'Hair Thinning / Premature Graying', value: 'hair_loss' },
      { text: 'Indigestion, Stomach Bloating or Constipation', value: 'digestion' },
      { text: 'Difficulty Falling Asleep or Chronic Stress', value: 'sleep' },
      { text: 'Dry skin / Dull complexion', value: 'skin_glow' }
    ]
  },
  {
    id: 'q2',
    text: 'Which scalp or skin type describes you best?',
    options: [
      { text: 'Oily and prone to flakes/clogged pores', value: 'oily' },
      { text: 'Extremely dry and sensitive', value: 'dry' },
      { text: 'Normal to combined skin', value: 'normal' }
    ]
  },
  {
    id: 'q3',
    text: 'What is your preferred method of treatment?',
    options: [
      { text: 'Direct topical therapy (Shampoo / Hair Gel)', value: 'topical' },
      { text: 'Nourishing botanical oil massages', value: 'oil' },
      { text: 'Oral herbal supplements / sprays', value: 'oral' }
    ]
  }
];

// Helper to find a product based on answers
export function getQuizRecommendation(answers: Record<string, string>): Product {
  const concern = answers['q1'];
  const method = answers['q3'];

  if (concern === 'dandruff') {
    if (method === 'topical') {
      return PRODUCTS.find(p => p.id === 'prod-keto-2') || PRODUCTS[0];
    }
    return PRODUCTS.find(p => p.id === 'prod-keto-plus') || PRODUCTS[2];
  }
  if (concern === 'hair_loss') {
    return PRODUCTS.find(p => p.id === 'prod-mahabhringraj') || PRODUCTS[1];
  }
  if (concern === 'digestion') {
    return PRODUCTS.find(p => p.id === 'prod-kabz-safa') || PRODUCTS[5];
  }
  if (concern === 'sleep') {
    return PRODUCTS.find(p => p.id === 'prod-sleepwell') || PRODUCTS[4];
  }
  if (concern === 'skin_glow') {
    return PRODUCTS.find(p => p.id === 'prod-aloesaffron') || PRODUCTS[8];
  }

  // Fallback
  return PRODUCTS[0];
}
