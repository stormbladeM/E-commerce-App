import { createContext, useContext, useReducer } from "react";
const initialState = { cart: [], error: "" };
function reducer(state, action) {
  switch (action.type) {
    case "add-cart": {
      const newCart = {
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        id: action.payload.id,
      };
      return { ...state, cart: [...state.cart, newCart] };
    }
    default:
      return { ...state, error: "error message" };
  }
}
const ProductContext = createContext();
function ProductProvider({ children }) {
  const [{ cart, error }, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ cart, dispatch, error }}>
      {children}
    </ProductContext.Provider>
  );
}
function useProduct() {
  const context = useContext(ProductContext);
  return context;
}
export { ProductProvider, useProduct };
