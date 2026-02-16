type product = {
  id: string;
  handle: string; // @prd_name - something they can remember
  name: string;
  searchableName: string; // A normalized version of the name for search purposes
  description: string;
  category: string;
  attributes: {
    label: string;
    value: string;
  }[];
  tags: string[]; // Keywords for search and categorization
  createdAt: string;
  updatedAt: string;
};
