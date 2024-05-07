// useCartHook.js

import { useRef } from "react";
import { useRecoilState } from "recoil";
import { stockState } from "../../../../../store/atoms";

function useCartHook(data) {
    const [stock, setStock] = useRecoilState(stockState);

    function minusStock() {
        setStock((prevStock) => {
            if (prevStock.count > 1) {
                return {
                    ...prevStock,
                    price: prevStock.price - data.price,
                    count: prevStock.count - 1,
                };
            }
            return prevStock;
        });
    }

    function plusStock() {
        setStock((prevStock) => ({
            ...prevStock,
            price: prevStock.price + data.price,
            count: prevStock.count + 1,
        }));
    }

    return {
        stock,
        minusStock,
        plusStock,
    };
}

export default useCartHook;
