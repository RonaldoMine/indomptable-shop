import React, {createContext, useContext, useReducer} from "react";

type BasketContextProviderProps = {
    children: React.ReactNode
}

type BasketItem = {
    sku: string,
    qty: number,
    size: string,
    color: string
}

type BasketAction = {
    type: string,
    payload: any
}

type Dispatch = (action: BasketAction) => void

type BasketState = BasketItem[];

//1. create context and export it
const BasketContext = createContext<{ basket: BasketState, dispatch: Dispatch } | undefined>(undefined);

//3. create a reducer
const basketReducer = (state: BasketState, action: BasketAction) => {
    console.log(state)
    switch (action.type) {
        case 'ADD_PRODUCT':
            let i = state.findIndex(product => product.sku == action.payload.sku && product.size == action.payload.size);
            i > -1 ? state[i].qty++ : [...state, action.payload]
            //ici je reflechis encore sur quoi retourner et si c'est meme necessaire.
        case 'REMOVE_PRODUCT':
            return state.filter((_, index) => index !== action.payload)
        // case 'UPDATE_PRODUCT':

        //     return state
        default:
            return state
    }
}

//2. create a custom hook to use the context
const useBasket = () => {
    const context = useContext(BasketContext);

    if (context === undefined) {
        throw new Error('useCount must be used within a BasketProvider')
    }

    const {basket, dispatch} = context

    const addProduct = (productToAdd: BasketItem) => dispatch({type: 'ADD_PRODUCT', payload: productToAdd})
    const removeProduct = (index: number) => dispatch({type: 'REMOVE_PRODUCT', payload: index})

    return {
        basket, dispatch, addProduct, removeProduct
    }
}

//3. custom context provider and export it
const BasketContextProvider = ({ children }: BasketContextProviderProps) => {

    const [basket, dispatch] = useReducer(basketReducer, [])

    const value = {basket, dispatch}

    return (<BasketContext.Provider value={value}>
        {children}
    </BasketContext.Provider>)
}

export { BasketContextProvider, useBasket };

