interface Product {
  id: number;
  name: string;
  price: number;
}

const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const SET_PRODUCTS = "SET_PRODUCTS";

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number;
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: Product;
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: Product[];
}

type ProductActionTypes =
  | AddProductAction
  | DeleteProductAction
  | UpdateProductAction
  | SetProductsAction;

export const addProduct = (product: Product): AddProductAction => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const deleteProduct = (id: number): DeleteProductAction => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const updateProduct = (product: Product): UpdateProductAction => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const setProducts = (products: Product[]): SetProductsAction => ({
  type: SET_PRODUCTS,
  payload: products,
});
