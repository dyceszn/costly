type Shop = {
  id: string;
  handle: string; // @shp_name - something they can remember
  representative: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  category: "vendor" | "store";
  branchName?: string;
  name: string;
  searchableName: string; // A normalized version of the name for search purposes
  address: string;
  city: string;
  state: string;
  country: string;
  channels: {
    supportEmail?: string;
    supportPhone?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  verification: {
    isVerified: boolean;
    verifiedAt: string;
    trustScore: number;
  };
  createdAt: string;
  updatedAt: string;
};
