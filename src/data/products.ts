export interface ProductVariant {
  caratSize: number;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  cutType: string;
  features: string[];
  variants: ProductVariant[];
  metalOptions: string[];
  images: string[];
  specifications: {
    material: string;
    clarity: string;
    color: string;
    cut: string;
    certification: string;
    settings: string;
  };
  comparisons: {
    mined: number;
    retail: number;
  };
}

export const products: Product[] = [
  {
    id: 'round-brilliant',
    slug: 'round-brilliant-studs',
    name: 'Classic Round Brilliant Studs',
    description: 'Our most popular style, these timeless round brilliant lab-created diamond studs deliver exceptional sparkle. The round brilliant cut maximizes light return for unmatched brilliance.',
    cutType: 'Round Brilliant',
    features: [
      'Maximum brilliance and fire',
      '58 perfectly positioned facets',
      'Ethically created in controlled environments',
      'Ideal symmetry and proportions',
      'Available in 14k or 18k white or yellow gold settings',
      'Secure screw-back or push-back options'
    ],
    variants: [
      { caratSize: 0.5, price: 499 },
      { caratSize: 1.0, price: 1199 },
      { caratSize: 1.5, price: 1899 },
      { caratSize: 2.0, price: 2699 }
    ],
    metalOptions: ['14k White Gold', '14k Yellow Gold', '18k White Gold', '18k Yellow Gold', 'Platinum'],
    images: [
      '/diamonds/round-brilliant/round-brilliant-1.jpg',
      '/diamonds/round-brilliant/round-brilliant-2.jpg',
      '/diamonds/round-brilliant/round-brilliant-3.jpg',
      '/diamonds/round-brilliant/round-brilliant-4.jpg'
    ],
    specifications: {
      material: 'Lab-Created Diamond',
      clarity: 'VS1-VS2',
      color: 'F-G',
      cut: 'Excellent',
      certification: 'IGI Certified',
      settings: '4-Prong Basket'
    },
    comparisons: {
      mined: 3299, // Comparable mined diamond price
      retail: 2899  // Comparable retail price
    }
  },
  {
    id: 'princess-cut',
    slug: 'princess-cut-studs',
    name: 'Princess Cut Diamond Studs',
    description: 'Modern and sophisticated, our princess cut lab-created diamond studs combine brilliance with clean geometric lines. Perfect for those who appreciate contemporary elegance.',
    cutType: 'Princess Cut',
    features: [
      'Contemporary square shape with pointed corners',
      'Unique brilliance pattern with cascading light reflections',
      'Sharp, clean lines with modern appeal',
      'Ethically created with sustainable practices',
      'Secure 4-prong settings to protect corners',
      'Excellent light performance'
    ],
    variants: [
      { caratSize: 0.5, price: 529 },
      { caratSize: 1.0, price: 1249 },
      { caratSize: 1.5, price: 1949 },
      { caratSize: 2.0, price: 2799 }
    ],
    metalOptions: ['14k White Gold', '14k Yellow Gold', '18k White Gold', '18k Yellow Gold', 'Platinum'],
    images: [
      '/diamonds/princess-cut/princess-cut-1.jpg',
      '/diamonds/princess-cut/princess-cut-2.jpg',
      '/diamonds/princess-cut/princess-cut-3.jpg',
      '/diamonds/princess-cut/princess-cut-4.jpg'
    ],
    specifications: {
      material: 'Lab-Created Diamond',
      clarity: 'VS1-VS2',
      color: 'F-G',
      cut: 'Excellent',
      certification: 'IGI Certified',
      settings: '4-Prong Corner'
    },
    comparisons: {
      mined: 3399,
      retail: 2999
    }
  },
  {
    id: 'cushion-halo',
    slug: 'cushion-cut-halo-studs',
    name: 'Cushion Cut Halo Studs',
    description: 'Combining vintage charm with modern brilliance, our cushion cut halo studs surround each center stone with a glittering frame of smaller diamonds for maximum sparkle and perceived size.',
    cutType: 'Cushion Cut with Halo',
    features: [
      'Center cushion cut diamond surrounded by round brilliant halo',
      'Vintage-inspired design with modern brilliance',
      'Enhances the perceived size of the center stone',
      'Maximizes sparkle from all angles',
      'Double-secured posts for safety',
      'Perfect blend of softness and structure'
    ],
    variants: [
      { caratSize: 0.5, price: 699 },
      { caratSize: 1.0, price: 1499 },
      { caratSize: 1.5, price: 2299 },
      { caratSize: 2.0, price: 3099 }
    ],
    metalOptions: ['14k White Gold', '14k Yellow Gold', '18k White Gold', '18k Yellow Gold', 'Platinum'],
    images: [
      '/diamonds/cushion-cut/cushion-halo-1.jpg',
      '/diamonds/cushion-cut/cushion-halo-2.jpg',
      '/diamonds/cushion-cut/cushion-halo-3.jpg',
      '/diamonds/cushion-cut/cushion-halo-4.jpg'
    ],
    specifications: {
      material: 'Lab-Created Diamond',
      clarity: 'VS1-VS2',
      color: 'F-G',
      cut: 'Excellent',
      certification: 'IGI Certified',
      settings: 'Pavé Halo'
    },
    comparisons: {
      mined: 3899,
      retail: 3499
    }
  },
  {
    id: 'emerald-cut',
    slug: 'emerald-cut-studs',
    name: 'Emerald Cut Diamond Studs',
    description: 'Sophisticated and elegant, our emerald cut lab-created diamond studs showcase clarity and precision. The step-cut faceting creates a hall-of-mirrors effect with distinct flashes of light.',
    cutType: 'Emerald Cut',
    features: [
      'Elegant step-cut faceting pattern',
      'Rectangular shape with cropped corners',
      'Highlights clarity and precision',
      'Art Deco-inspired design',
      'Creates dramatic "hall of mirrors" effect',
      'Sophisticated and understated brilliance'
    ],
    variants: [
      { caratSize: 0.5, price: 549 },
      { caratSize: 1.0, price: 1299 },
      { caratSize: 1.5, price: 1999 },
      { caratSize: 2.0, price: 2899 }
    ],
    metalOptions: ['14k White Gold', '14k Yellow Gold', '18k White Gold', '18k Yellow Gold', 'Platinum'],
    images: [
      '/diamonds/emerald-cut/emerald-cut-1.jpg',
      '/diamonds/emerald-cut/emerald-cut-2.jpg',
      '/diamonds/emerald-cut/emerald-cut-3.jpg',
      '/diamonds/emerald-cut/emerald-cut-4.jpg'
    ],
    specifications: {
      material: 'Lab-Created Diamond',
      clarity: 'VVS2-VS1',
      color: 'F-G',
      cut: 'Excellent',
      certification: 'IGI Certified',
      settings: '4-Prong Corner'
    },
    comparisons: {
      mined: 3599,
      retail: 3199
    }
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
