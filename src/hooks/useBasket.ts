import { useState } from 'react'
import _ from 'lodash'
import { OrderType } from '../types/types';


const useBasket = () => {

    const [order, setOrder] = useState<OrderType[]>([{productId: 'BLACK', productSize: "L", quantity: 1}]);

    const addProduct = (productToadd: OrderType): void => {
        let i = order.findIndex(product => product.productId == productToadd.productId && product.productSize == productToadd.productSize);
        i > -1 ? order[i].quantity++ : setOrder([...order, productToadd])
    }

    const removeProduct = (idx: number) => {
        return setOrder(order.filter((_,index) => index !== idx))
    }

    return { addProduct, removeProduct, order }

}

export { useBasket };

