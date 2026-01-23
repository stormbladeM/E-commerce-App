import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const BASE_URL = "https://fakestoreapi.com/products";
const ProductContext = createContext();
const initialState = { cart: [], count: 1, products: [], step: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "setStep":
      return { ...state, step: action.payload };
    case "get-Product":
      return {
        ...state,
        products: action.payload,
      };
    case "add-cart": {
      const { id, image, title, price, count } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { id, image, title, price, count }],
        };
      }
    }

    case "increaseCount":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    case "decreaseCount":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0),
      };
    
    case "remove-from-cart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
}

function ProductProvider({ children }) {
  const [{ cart, count, clicked, products, step }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [query, setQuery] = useState("");

  useEffect(function () {
    async function fetchProducts() {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "get-Product", payload: data });
    }
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider
      value={{ products, dispatch, cart, clicked, count, step }}
    >
      {children}
    </ProductContext.Provider>
  );
}
function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
export { useProductContext, ProductProvider };
