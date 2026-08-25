/**
 * Mani Electricals & Hardwares - Central Data Repository
 */

const business = {
  name: 'Mani Electricals & Hardwares',
  shortName: 'Mani Electricals',
  owner: 'C. Manimuthu',
  phone: '+91 99528 53697',
  phoneRaw: '919952853697',
  email: 'manielectricalsandhardware@gmail.com',
  gstin: '33EOPPM8991K1ZX',
  address: {
    street: 'Jeewa Nagar Road',
    area: 'K.K. Pudur',
    city: 'Coimbatore',
    pincode: '641038',
    state: 'Tamil Nadu',
    country: 'India',
    full: 'Jeewa Nagar Road, K.K. Pudur, Coimbatore – 641038, Tamil Nadu, India'
  },
  whatsappUrl: (msg = 'Hi, I would like to enquire about your products.') =>
    `https://wa.me/919952853697?text=${encodeURIComponent(msg)}`,
  mapsUrl: 'https://maps.google.com/?q=Mani+Electricals+and+Hardwares+KK+Pudur+Coimbatore',
  hours: 'Mon – Sat: 8:30 AM – 9:00 PM | Sun: 9:00 AM – 1:00 PM',
  tagline: 'Powering Every Project With Quality.',
  description: 'Reliable electrical, hardware and home utility products from trusted brands — all under one roof.',
  ownerBio: 'C. Manimuthu leads Mani Electricals & Hardwares with a focus on dependable products, trusted brands and customer-focused service.',
  images: {
    shop: 'assets/storefront_wide.jpg',
    shopAlt: 'assets/storefront_close.jpg',
    owner: 'assets/owner_portrait.jpg',
    card: 'assets/business_card.jpg',
  }
};

const stats = [
  { label: 'Trusted Brands', value: '10+', icon: 'shield' },
  { label: 'Product Categories', value: '50+', icon: 'layers' },
  { label: 'Years Serving Coimbatore', value: '—', icon: 'clock' },
  { label: 'Happy Customers', value: '—', icon: 'users' },
];

const dealers = [
  { id: 'd01', name: 'Luker', category: 'LED Lighting & Switchgear' },
  { id: 'd02', name: 'Anchor by Panasonic', category: 'Switches & Electrical' },
  { id: 'd03', name: 'Finolex', category: 'Wires & Cables' },
  { id: 'd04', name: 'Nippon Paint', category: 'Paints & Finishes' },
  { id: 'd05', name: 'Supreme', category: 'Plumbing Pipes' },
  { id: 'd06', name: 'Watertec', category: 'Taps & Fittings' },
  { id: 'd07', name: 'Crompton', category: 'Fans & Pumps' },
  { id: 'd08', name: 'Chettinad Cement', category: 'Cement & Masonry' },
  { id: 'd09', name: 'Parryware', category: 'Sanitary Ware' },
  { id: 'd10', name: 'CERA', category: 'Bath Fittings' },
];

const products = [
  { 
    id: 'p01', 
    name: 'Anchor Roma Modular Switches', 
    brand: 'Anchor by Panasonic', 
    category: 'Switches', 
    image: 'assets/images/products/p01.jpg',
    description: 'Flame-retardant polycarbonate modular switches with smooth toggle mechanism for residential and commercial installations.', 
    price: null, 
    specifications: { 
      Material: 'Polycarbonate', 
      Rating: '6A / 16A / 25A', 
      Finish: 'Pure White / Metallic', 
      Warranty: 'Manufacturer Warranty' 
    } 
  },
  { 
    id: 'p02', 
    name: 'Finolex FR Copper Wire 1.5 sq mm', 
    brand: 'Finolex', 
    category: 'Wires & Cables', 
    image: 'assets/images/products/p02.jpg',
    description: '99.97% pure electrolytic grade copper wire with flame-retardant PVC insulation. IS 694 certified for residential house wiring.', 
    price: null, 
    specifications: { 
      Gauge: '1.5 sq mm', 
      Insulation: 'FR PVC', 
      Length: '90m Coil', 
      Standard: 'IS 694' 
    } 
  },
  { 
    id: 'p03', 
    name: 'Luker LED Slim Panel Light 18W', 
    brand: 'Luker', 
    category: 'Lighting', 
    image: 'assets/images/products/p03.jpg',
    description: 'Ultra-slim recessed LED ceiling panel with energy-efficient driver and uniform light distribution.', 
    price: null, 
    specifications: { 
      Wattage: '18W', 
      'Color Temp': '6500K / 3000K', 
      Shape: 'Round / Square', 
      Warranty: '2 Years' 
    } 
  },
  { 
    id: 'p04', 
    name: 'Crompton HS Plus Ceiling Fan 1200mm', 
    brand: 'Crompton', 
    category: 'Fans', 
    image: 'assets/images/products/p04.jpg',
    description: 'High-speed ceiling fan with 100% copper motor winding delivering superior air thrust and silent performance.', 
    price: null, 
    specifications: { 
      Sweep: '1200mm', 
      RPM: '380', 
      'Air Delivery': '230 CMM', 
      Motor: 'Copper Winding' 
    } 
  },
  { 
    id: 'p05', 
    name: 'Supreme CPVC Pipe 1 inch', 
    brand: 'Supreme', 
    category: 'Plumbing', 
    image: 'assets/images/products/p05.jpg',
    description: 'Pressure-tested CPVC plumbing pipe suitable for hot and cold water distribution in residential buildings.', 
    price: null, 
    specifications: { 
      Size: '1 inch', 
      Type: 'CPVC SDR 11', 
      'Pressure Rating': '28 kg/cm²', 
      Length: '3m' 
    } 
  },
  { 
    id: 'p06', 
    name: 'Nippon Paint Matex Interior Emulsion', 
    brand: 'Nippon Paint', 
    category: 'Hardware', 
    image: 'assets/images/products/p06.jpg',
    description: 'Low-VOC interior emulsion paint with anti-fungal properties and high scrub resistance. Custom shade tinting available.', 
    price: null, 
    specifications: { 
      Finish: 'Matte', 
      Coverage: '140-160 sq ft/L', 
      Features: 'Anti-Fungal, Washable', 
      Tinting: 'Custom Shades Available' 
    } 
  },
  { 
    id: 'p07', 
    name: 'Watertec Polymer Bib Cock', 
    brand: 'Watertec', 
    category: 'Plumbing', 
    image: 'assets/images/products/p07.jpg',
    description: 'Heavy-duty virgin polymer bib cock with quarter-turn ceramic disc technology. Zero rust guarantee.', 
    price: null, 
    specifications: { 
      Body: 'Virgin Polymer', 
      Pressure: 'Up to 10 Bar', 
      Operation: 'Quarter Turn', 
      Rust: 'Zero Rust' 
    } 
  },
  { 
    id: 'p08', 
    name: 'Anchor Penta Distribution Board 8-Way', 
    brand: 'Anchor by Panasonic', 
    category: 'Electrical', 
    image: 'assets/images/products/p08.jpg',
    description: 'Metal-clad single phase distribution board with MCB protection slots. IP43 rated for indoor installation.', 
    price: null, 
    specifications: { 
      Ways: '8', 
      Phase: 'Single Phase', 
      Rating: 'IP43', 
      MCB: 'Included' 
    } 
  },
  { 
    id: 'p09', 
    name: 'Finolex Telephone Cable 2 Pair', 
    brand: 'Finolex', 
    category: 'Wires & Cables', 
    image: 'assets/images/products/p09.jpg',
    description: 'PVC insulated unarmoured telephone cable for internal wiring applications.', 
    price: null, 
    specifications: { 
      Pairs: '2 Pair', 
      Conductor: 'Annealed Copper', 
      Insulation: 'PVC', 
      Application: 'Indoor' 
    } 
  },
  { 
    id: 'p10', 
    name: 'Luker LED Tube Light 20W', 
    brand: 'Luker', 
    category: 'Lighting', 
    image: 'assets/images/products/p10.jpg',
    description: 'Retrofit LED tube light with instant start and flicker-free operation. Direct replacement for conventional tube lights.', 
    price: null, 
    specifications: { 
      Wattage: '20W', 
      Length: '4ft', 
      'Color Temp': '6500K', 
      Lifespan: '25000 Hours' 
    } 
  },
  { 
    id: 'p11', 
    name: 'Chettinad PPC Cement 50kg', 
    brand: 'Chettinad Cement', 
    category: 'Hardware', 
    image: 'assets/images/products/p11.jpg',
    description: 'Portland Pozzolana Cement suitable for residential construction, plastering and masonry work.', 
    price: null, 
    specifications: { 
      Grade: 'PPC', 
      Weight: '50 kg', 
      Application: 'General Construction', 
      Standard: 'IS 1489' 
    } 
  },
  { 
    id: 'p12', 
    name: 'Parryware Wash Basin', 
    brand: 'Parryware', 
    category: 'Plumbing', 
    image: 'assets/images/products/p12.jpg',
    description: 'Vitreous china wall-hung wash basin with anti-bacterial glaze coating and stain-resistant finish.', 
    price: null, 
    specifications: { 
      Material: 'Vitreous China', 
      Glaze: 'Anti-Bacterial', 
      Color: 'Alpine White', 
      Mount: 'Wall Hung' 
    } 
  }
];

const categories = ['All', 'Electrical', 'Lighting', 'Switches', 'Wires & Cables', 'Fans', 'Hardware', 'Plumbing', 'Tools'];

const testimonials = [
  {
    id: 't01',
    name: 'Karthik Raja',
    rating: 5,
    review: 'Best shop in KK Pudur for all electrical wiring and lighting needs. Manimuthu sir is very helpful and suggests genuine products at reasonable rates.'
  },
  {
    id: 't02',
    name: 'Senthil Kumar',
    rating: 5,
    review: 'Great inventory of Anchor switches, Finolex wires, and plumbing fittings. Honest pricing and reliable guidance every time!'
  },
  {
    id: 't03',
    name: 'Praveen Mohan',
    rating: 5,
    review: 'I bought all the electrical and paint supplies for my house renovation here. Excellent customer service and top quality brands.'
  }
];

// Attach to window object for global availability
window.ManiData = {
  business,
  stats,
  dealers,
  products,
  categories,
  testimonials
};
