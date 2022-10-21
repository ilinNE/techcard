export type FeedbackParams = {
  title: string;
  return_address: string;
  message: string;
};

export type FormParams = {
  username: string;
  email: string;
  password: string;
};

export type IngredientParams = {
  product: number;
  unit: string;
  amount: string;
  cold_waste: string;
  hot_waste: string;
};

export type TechcardParams = {
  id: number;
  ingredients: Array<IngredientParams>;
  name: string;
  create_date: string;
  modified_date: string;
  description: string;
  is_semifabricate: boolean;
  weight: string;
  semifabricate: boolean;
  tags: Array<number>;
};

export type ProductParams = {
  id: number;
  name: string;
  unit: string;
  unit_weight: string;
  price: string;
  tags: Array<number>;
};
