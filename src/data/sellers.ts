export type Seller = {
  id: string;
  handle: string; // something rememberable and unique, used in URLs and as a reference, prefixed with "S-" for sellers
  representative: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  category: "vendor" | "store";
  branchName?: string;
  name: string;
  searchableName: string; // A normalized version of the name for search purposes eg "GreenLeaf Organic Store" -> "greenleafOrganicStore"
  address: string;
  city: string;
  state: string;
  country: string; // Always "Nigeria" for now, but can be expanded in the future if needed
  channels: {
    // At least one of these should be provided for contact purposes
    supportEmail?: string;
    supportPhone?: string;
    website?: string;
    facebook?: string; // url to their facebook page
    twitter?: string; // url to their twitter page
    instagram?: string; // url to their instagram page
    tiktok?: string; // url to their tiktok page
    whatsapp?: string; // url to their whatsapp business account
  };
  verification: {
    isVerified: boolean;
    verifiedAt: string;
    trustScore: number;
  };
  createdAt: string;
  updatedAt: string;
};

export const sellers: Seller[] = [
  {
    id: "seller-1",
    handle: "S-greenleaf",
    representative: {
      firstName: "Amina",
      lastName: "Yusuf",
      email: "amina@greenleaf.ng",
      phone: "+2348011111111",
    },
    category: "store",
    name: "GreenLeaf Supermarket",
    searchableName: "greenleafSupermarket",
    address: "12 Admiralty Way, Lekki",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      website: "https://greenleaf.ng",
      instagram: "https://instagram.com/greenleafng",
      whatsapp: "https://wa.me/2348011111111",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-10",
      trustScore: 92,
    },
    createdAt: "2024-11-01",
    updatedAt: "2025-01-10",
  },

  {
    id: "seller-2",
    handle: "S-pricepointe",
    representative: {
      firstName: "Chinedu",
      lastName: "Okafor",
      email: "hello@pricepointe.ng",
      phone: "+2348022222222",
    },
    category: "store",
    name: "PricePointe Mart",
    searchableName: "pricepointeMart",
    address: "22 Ikota Complex",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/pricepointe",
      twitter: "https://twitter.com/pricepointe",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-02-01",
      trustScore: 88,
    },
    createdAt: "2024-12-01",
    updatedAt: "2025-02-01",
  },

  {
    id: "seller-3",
    handle: "S-naijaphonehub",
    representative: {
      firstName: "Tunde",
      lastName: "Balogun",
      email: "sales@naijaphonehub.ng",
      phone: "+2348033333333",
    },
    category: "vendor",
    name: "Naija Phone Hub",
    searchableName: "naijaPhoneHub",
    address: "Computer Village, Ikeja",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      whatsapp: "https://wa.me/2348033333333",
      twitter: "https://twitter.com/naijaphonehub",
      facebook: "https://facebook.com/naijaphonehub",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-02-14",
      trustScore: 95,
    },
    createdAt: "2024-10-05",
    updatedAt: "2025-02-14",
  },

  {
    id: "seller-4",
    handle: "S-medpluslekki",
    representative: {
      firstName: "Grace",
      lastName: "Olawale",
      email: "lekki@medplus.ng",
      phone: "+2348044444444",
    },
    category: "store",
    name: "MedPlus Pharmacy Lekki",
    searchableName: "medplusPharmacyLekki",
    address: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      website: "https://medplus.ng",
      instagram: "https://instagram.com/medplusng",
      whatsapp: "https://wa.me/2348044444444",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-20",
      trustScore: 97,
    },
    createdAt: "2024-09-01",
    updatedAt: "2025-01-20",
  },

  // --- shortened pattern continues ---
  {
    id: "seller-5",
    handle: "S-freshbasket",
    representative: {
      firstName: "Ifeoma",
      lastName: "Eze",
      email: "hello@freshbasket.ng",
      phone: "+2348055555555",
    },
    category: "store",
    name: "Fresh Basket Groceries",
    searchableName: "freshBasketGroceries",
    address: "Gwarinpa",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/freshbasketng",
      twitter: "https://twitter.com/freshbasketng",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-12",
      trustScore: 90,
    },
    createdAt: "2024-10-12",
    updatedAt: "2025-01-12",
  },

  {
    id: "seller-6",
    handle: "S-kingsgadgets",
    representative: {
      firstName: "Samuel",
      lastName: "King",
      email: "sales@kingsgadgets.ng",
      phone: "+2348066666666",
    },
    category: "vendor",
    name: "Kings Gadgets",
    searchableName: "kingsGadgets",
    address: "Wuse Zone 3",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    channels: {
      whatsapp: "https://wa.me/2348066666666",
      twitter: "https://twitter.com/kingsgadgets",
      facebook: "https://facebook.com/kingsgadgets",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-02-10",
      trustScore: 86,
    },
    createdAt: "2024-08-01",
    updatedAt: "2025-02-10",
  },

  {
    id: "seller-7",
    handle: "S-shopriteikeja",
    representative: {
      firstName: "Admin",
      lastName: "Manager",
      email: "ikeja@shoprite.ng",
      phone: "+2348077777777",
    },
    category: "store",
    name: "Shoprite Ikeja",
    searchableName: "shopriteIkeja",
    address: "Ikeja City Mall",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      website: "https://shoprite.ng",
      instagram: "https://instagram.com/shopriteng",
      twitter: "https://twitter.com/shopriteng",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-05",
      trustScore: 98,
    },
    createdAt: "2024-07-01",
    updatedAt: "2025-01-05",
  },

  {
    id: "seller-8",
    handle: "S-sparlekki",
    representative: {
      firstName: "Halima",
      lastName: "Bello",
      email: "lekki@spar.ng",
      phone: "+2348088888888",
    },
    category: "store",
    name: "SPAR Lekki",
    searchableName: "sparLekki",
    address: "Lekki Mall",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      website: "https://sparnigeria.com",
      instagram: "https://instagram.com/sparnigeria",
      twitter: "https://twitter.com/sparnigeria",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-07",
      trustScore: 96,
    },
    createdAt: "2024-06-01",
    updatedAt: "2025-01-07",
  },

  {
    id: "seller-9",
    handle: "S-phcitymart",
    representative: {
      firstName: "Emeka",
      lastName: "Nwosu",
      email: "info@phcitymart.ng",
      phone: "+2348099999999",
    },
    category: "store",
    name: "PH City Mart",
    searchableName: "phCityMart",
    address: "GRA Phase 2",
    city: "Port Harcourt",
    state: "Rivers",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/phcitymart",
      twitter: "https://twitter.com/phcitymart",
      facebook: "https://facebook.com/phcitymart",
    },
    verification: {
      isVerified: false,
      verifiedAt: "2024-12-01",
      trustScore: 70,
    },
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
  },

  {
    id: "seller-10",
    handle: "S-lagoswholesale",
    representative: {
      firstName: "Bashir",
      lastName: "Lawal",
      email: "sales@lagoswholesale.ng",
      phone: "+2348100000000",
    },
    category: "vendor",
    name: "Lagos Wholesale Depot",
    searchableName: "lagosWholesaleDepot",
    address: "Trade Fair Complex",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/lagoswholesale",
      twitter: "https://twitter.com/lagoswholesale",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-18",
      trustScore: 85,
    },
    createdAt: "2024-09-01",
    updatedAt: "2025-01-18",
  },

  {
    id: "seller-11",
    handle: "S-quickmart",
    representative: {
      firstName: "Mary",
      lastName: "Ojo",
      email: "hello@quickmart.ng",
      phone: "+2348111111111",
    },
    category: "store",
    name: "QuickMart Express",
    searchableName: "quickmartExpress",
    address: "Yaba",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/quickmartexpress",
      twitter: "https://twitter.com/quickmartexpress",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-02-01",
      trustScore: 84,
    },
    createdAt: "2024-11-02",
    updatedAt: "2025-02-01",
  },

  {
    id: "seller-12",
    handle: "S-healthwise",
    representative: {
      firstName: "Janet",
      lastName: "Umeh",
      email: "care@healthwise.ng",
      phone: "+2348122222222",
    },
    category: "store",
    name: "HealthWise Pharmacy",
    searchableName: "healthwisePharmacy",
    address: "Surulere",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/healthwisepharmacy",
      twitter: "https://twitter.com/healthwisepharmacy",
      facebook: "https://facebook.com/healthwisepharmacy",
      whatsapp: "https://wa.me/2348122222222",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-30",
      trustScore: 93,
    },
    createdAt: "2024-10-10",
    updatedAt: "2025-01-30",
  },

  {
    id: "seller-13",
    handle: "S-campusmart",
    representative: {
      firstName: "Daniel",
      lastName: "Ade",
      email: "admin@campusmart.ng",
      phone: "+2348133333333",
    },
    category: "vendor",
    name: "Campus Mart",
    searchableName: "campusMart",
    address: "Ajah",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/campusmartng",
      twitter: "https://twitter.com/campusmartng",
      facebook: "https://facebook.com/campusmartng",
      whatsapp: "https://wa.me/2348133333333",
      tiktok: "https://tiktok.com/@campusmartng",
      website: "https://campusmart.ng",
    },
    verification: {
      isVerified: false,
      verifiedAt: "2024-11-11",
      trustScore: 65,
    },
    createdAt: "2024-11-11",
    updatedAt: "2024-11-11",
  },

  {
    id: "seller-14",
    handle: "S-techbazaar",
    representative: {
      firstName: "Femi",
      lastName: "Ajayi",
      email: "sales@techbazaar.ng",
      phone: "+2348144444444",
    },
    category: "vendor",
    name: "Tech Bazaar Nigeria",
    searchableName: "techBazaarNigeria",
    address: "Ikeja",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/techbazaarnigeria",
      twitter: "https://twitter.com/techbazaarnigeria",
      facebook: "https://facebook.com/techbazaarnigeria",
      website: "https://techbazaar.ng",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-02-12",
      trustScore: 89,
    },
    createdAt: "2024-08-15",
    updatedAt: "2025-02-12",
  },

  {
    id: "seller-15",
    handle: "S-royalfoods",
    representative: {
      firstName: "Ngozi",
      lastName: "Okeke",
      email: "hello@royalfoods.ng",
      phone: "+2348155555555",
    },
    category: "store",
    name: "Royal Foods Market",
    searchableName: "royalFoodsMarket",
    address: "Enugu Town",
    city: "Enugu",
    state: "Enugu",
    country: "Nigeria",
    channels: {
      instagram: "https://instagram.com/royalfoodsng",
      twitter: "https://twitter.com/royalfoodsng",
      facebook: "https://facebook.com/royalfoodsng",
      whatsapp: "https://wa.me/2348155555555",
    },
    verification: {
      isVerified: true,
      verifiedAt: "2025-01-15",
      trustScore: 91,
    },
    createdAt: "2024-09-20",
    updatedAt: "2025-01-15",
  },
];
