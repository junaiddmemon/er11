const ER11_CONFIG = {
  company: 'ER11 Infrastructure Pvt. Ltd.',
  tagline: 'The Complete Solution',
  email: 'info@er11infra.com',
  phones: ['+91 81549 37306', '+91 81411 46546'],
  whatsapp: '918154937306',
  address: '43, Shahealam Nagar V-B, Near Aala Hazrat Masjid, Danilimda, Narol Road, Ahmedabad - 380028',
  mapsQuery: 'Danilimda Narol Road Ahmedabad 380028',
  hours: 'Monday — Saturday: 9:00 AM — 7:00 PM',
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    youtube: '#'
  }
};

const ER11_SERVICES = [
  {
    id: 'building-construction',
    title: 'Building Construction',
    icon: 'fa-building',
    image: 'assets/images/construction-site.jpg',
    shortDesc: 'End-to-end building construction — from turnkey developments and civil works to residential, commercial, and industrial projects delivered with engineering precision.',
    link: 'building-construction.html',
    benefits: ['Turnkey project delivery', 'Residential to industrial scale', 'Quality-tested RCC & civil work', 'On-time handover'],
    applications: ['Residential Towers', 'Commercial Complexes', 'Industrial Plants', 'Turnkey Developments']
  },
  {
    id: 'safety-net',
    title: 'Safety Net Installation',
    icon: 'fa-shield-halved',
    image: 'assets/images/safety-construction.jpg',
    shortDesc: 'Professional safety net systems for high-rise construction, facade work, and industrial sites — ensuring worker protection and regulatory compliance.',
    benefits: ['OSHA-compliant systems', 'High-rise expertise', 'Rapid installation', 'Regular inspection & maintenance'],
    applications: ['High-Rise Buildings', 'Bridge Construction', 'Industrial Sites', 'Renovation Projects']
  },
  {
    id: 'structural-design',
    title: 'Structural Design',
    icon: 'fa-drafting-compass',
    image: 'assets/images/bridge-structure.jpg',
    shortDesc: 'Advanced structural engineering and design services for RCC, steel, and composite structures — optimized for safety, efficiency, and buildability.',
    benefits: ['Code-compliant designs', 'Seismic analysis', 'BIM-ready documentation', 'Value engineering'],
    applications: ['Commercial Buildings', 'Industrial Structures', 'Residential Projects', 'Special Structures']
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    icon: 'fa-couch',
    image: 'assets/images/residential-tower.jpg',
    shortDesc: 'Premium interior design and execution for corporate offices, retail spaces, residences, and hospitality — blending aesthetics with functionality.',
    benefits: ['Custom design concepts', 'Premium material sourcing', 'Turnkey execution', 'Project management'],
    applications: ['Corporate Offices', 'Retail & Showrooms', 'Luxury Residences', 'Hotels & Hospitality']
  }
];

const BUILDING_SUB_SERVICES = [
  {
    id: 'turnkey-projects',
    title: 'Turnkey Projects',
    icon: 'fa-key',
    image: 'assets/images/construction-site.jpg',
    description: 'Single-point accountability from concept design through statutory approvals, construction, finishing, and handover. Our turnkey model eliminates coordination gaps and delivers projects on schedule and within budget.',
    benefits: ['Design-build integration', 'Statutory approval support', 'Fixed-price contracts', 'Single-point accountability', 'Guaranteed timelines'],
    applications: ['Residential Townships', 'Commercial Complexes', 'Industrial Facilities', 'Institutional Buildings']
  },
  {
    id: 'civil-work',
    title: 'All Types of Civil Work',
    icon: 'fa-hard-hat',
    image: 'assets/images/construction-workers.jpg',
    description: 'Comprehensive civil construction including earthwork, excavation, grading, drainage, and site development. Our experienced civil teams execute projects to exact specifications with rigorous quality control.',
    benefits: ['Earthwork & excavation', 'Site development', 'Drainage systems', 'IRC-compliant execution'],
    applications: ['Site Preparation', 'Road Works', 'Utility Corridors', 'Land Development']
  },
  {
    id: 'residential',
    title: 'Residential Construction',
    icon: 'fa-house-chimney',
    image: 'assets/images/residential-tower.jpg',
    description: 'Quality residential construction from luxury villas and row houses to multi-storey apartment complexes. We focus on durable construction, modern amenities, and timely possession.',
    benefits: ['RERA compliance', 'Modern amenities', 'Quality finishes', 'Timely possession'],
    applications: ['Apartment Complexes', 'Luxury Villas', 'Gated Communities', 'Affordable Housing']
  },
  {
    id: 'commercial',
    title: 'Commercial Construction',
    icon: 'fa-city',
    image: 'assets/images/commercial-buildings.jpg',
    description: 'Premium commercial building construction for offices, retail malls, showrooms, and mixed-use developments with integrated MEP coordination and premium finishes.',
    benefits: ['Premium finish quality', 'MEP integration', 'Façade expertise', 'Smart building ready'],
    applications: ['Office Towers', 'Retail Malls', 'Showrooms', 'Mixed-Use Developments']
  },
  {
    id: 'industrial',
    title: 'Industrial Construction',
    icon: 'fa-industry',
    image: 'assets/images/industrial-plant.jpg',
    description: 'Heavy industrial construction for manufacturing plants, warehouses, processing facilities, and logistics hubs with specialized foundations and industrial flooring.',
    benefits: ['Heavy foundations', 'Fast-track delivery', 'Industrial flooring', 'Equipment foundations'],
    applications: ['Manufacturing Plants', 'Warehouses', 'Processing Units', 'Logistics Hubs']
  },
  {
    id: 'rcc-work',
    title: 'RCC Work',
    icon: 'fa-cubes',
    image: 'assets/images/foundation-work.jpg',
    description: 'Expert reinforced cement concrete work including complex formwork, rebar placement, high-grade concreting, and post-tensioned slabs with strict cube testing protocols.',
    benefits: ['High-grade concrete', 'Advanced formwork', 'Post-tensioning', 'Strict QC protocols'],
    applications: ['Structural Frames', 'Slabs & Beams', 'Water Tanks', 'Retaining Structures']
  },
  {
    id: 'masonry-plaster',
    title: 'Masonry & Plaster Work',
    icon: 'fa-border-all',
    image: 'assets/images/construction-workers.jpg',
    description: 'Precision brickwork, blockwork, and plastering services delivering smooth, durable wall surfaces ready for finishing. Our skilled masons ensure plumb, level, and crack-free execution.',
    benefits: ['Skilled mason teams', 'Plumb & level accuracy', 'Crack-free finishes', 'Multiple material types'],
    applications: ['External Walls', 'Internal Partitions', 'Boundary Walls', 'Compound Walls']
  },
  {
    id: 'flooring',
    title: 'Flooring Work',
    icon: 'fa-grip',
    image: 'assets/images/residential-tower.jpg',
    description: 'Premium flooring solutions including vitrified tiles, marble, granite, epoxy, and industrial flooring with expert leveling and precision installation.',
    benefits: ['Multiple flooring types', 'Precision leveling', 'Industrial-grade options', 'Premium finishes'],
    applications: ['Residential Floors', 'Commercial Spaces', 'Industrial Floors', 'Outdoor Paving']
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing Solutions',
    icon: 'fa-droplet',
    image: 'assets/images/safety-construction.jpg',
    description: 'Comprehensive waterproofing for basements, terraces, bathrooms, and external walls using membrane systems, chemical treatments, and injection grouting for lasting protection.',
    benefits: ['Membrane systems', 'Chemical treatment', 'Injection grouting', 'Long-term warranty'],
    applications: ['Basements', 'Terraces', 'Bathrooms', 'External Walls', 'Water Tanks']
  }
];
