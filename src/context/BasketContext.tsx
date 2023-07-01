import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

type BasketContextProviderProps = {
  children: React.ReactNode;
};

type BasketItem = {
  sku: string;
  qty: number;
  price: number;
  size: string;
  color: string;
  img: string;
  name: string;
};

type BasketAction = {
  type: string;
  payload?: any;
};

type Dispatch = (action: BasketAction) => void;

type BasketState = {
  items: BasketItem[];
  subTotal: number;
  totalProduct: number;
};

const initialState = {
  items: [],
  subTotal: 0,
  totalProduct: 0,
};

//1. create context and export it
const BasketContext = createContext<
  { basket: BasketState; dispatch: Dispatch } | undefined
>(undefined);

const updateSubTotal = (products: BasketItem[]): number => {
  let total = 0;
  products.map((item) => (total += item.qty * item.price));
  return total;
};
const updateTotalProduct = (products: BasketItem[]): number => {
  let total = 0;
  products.map((item) => (total += item.qty));
  return total;
};

//3. create a reducer
const basketReducer = (
  state: BasketState,
  action: BasketAction
): BasketState => {
  const newState = state.items.slice();

  switch (action.type) {
    case "INIT_BASKET":
      const basketItems = JSON.parse(localStorage.getItem("basket") || "null");
      if (basketItems !== null) {
        state.items = basketItems;
      } else {
        state.items = [];
      }
      return {
        items: state.items,
        subTotal: updateSubTotal(state.items),
        totalProduct: updateTotalProduct(state.items),
      };

    case "ADD_PRODUCT":
      let i = state.items.findIndex(
        //compare the product reference to check if its already in the basket
        (product) =>
          product.sku == action.payload.sku &&
          product.size == action.payload.size &&
          product.color == action.payload.color
      );

      //If product is already in the basket
      if (i > -1) {
        //add quantity
        newState[i] = { ...action.payload, qty: state.items[i].qty++ };
        //return the state and increment subTotal
        return {
          items: newState,
          subTotal: updateSubTotal(newState),
          totalProduct: updateTotalProduct(newState),
        };
      } else {
        //Add product to the basket and increment the subtotal
        return {
          items: [...state.items, action.payload],
          subTotal: updateSubTotal([...state.items, action.payload]),
          totalProduct: updateTotalProduct([...state.items, action.payload]),
        };
      }

    case "REMOVE_PRODUCT":
      //filter the basket to remove the corresponding product
      const filteredState = state.items.filter(
        (_, index) => index !== action.payload
      );
      //return the basket's state and decrement the subtotal
      return {
        items: filteredState,
        subTotal: updateSubTotal(filteredState),
        totalProduct: updateTotalProduct(filteredState),
      };

    case "ADD_QUANTITY":
      console.log(action.payload);
      newState[action.payload] = {
        ...state.items[action.payload],
        qty: state.items[action.payload].qty++,
      };
      console.log(newState);
      console.log(newState[action.payload]);

      return {
        items: newState,
        subTotal: updateSubTotal(newState),
        totalProduct: updateTotalProduct(newState),
      };

    case "SUBSTRACT_QUANTITY":
      if (state.items[action.payload].qty > 1) {
        newState[action.payload] = {
          ...state.items[action.payload],
          qty: state.items[action.payload].qty--,
        };
      }
      return {
        items: newState,
        subTotal: updateSubTotal(newState),
        totalProduct: updateTotalProduct(newState),
      };
    case "RESET_BASKET":
      state.items = [];
      return {
        items: state.items,
        subTotal: updateSubTotal(state.items),
        totalProduct: updateTotalProduct(state.items),
      };

    default:
      return state;
  }
};

//2. create a custom hook to use the context
const useBasket = () => {
  const context = useContext(BasketContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a BasketProvider");
  }

  const { basket, dispatch } = context;

  return {
    basket,
    dispatch,
  };
};

//3. custom context provider and export it
const BasketContextProvider = ({ children }: BasketContextProviderProps) => {
  let [basket, dispatch] = useReducer(basketReducer, initialState);

  useEffect(() => {
    localStorage.setItem("state_basket", "DATA_BASKET_INIT");
  }, []);

  useEffect(() => {
    const state_basket = localStorage.getItem("state_basket");
    if (state_basket && state_basket == "DATA_BASKET_INIT") {
      localStorage.removeItem("state_basket");
      dispatch({ type: "INIT_BASKET" });
    } else {
      localStorage.setItem("basket", JSON.stringify(basket.items));
    }
  }, [basket.items]);

  const value = { basket, dispatch };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};

export { BasketContextProvider, useBasket };
