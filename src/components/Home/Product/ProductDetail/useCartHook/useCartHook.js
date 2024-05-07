// useCartHook.js

import { useRecoilState } from "recoil";
import { stockState } from "../../../../../store/atoms";
import { useEffect } from "react";

function useCartHook(data) {
    const [stock, setStock] = useRecoilState(stockState);

    useEffect(() => {
        // data가 유효한 경우에만 stock을 초기화합니다.
        if (data) {
            setStock({
                _id: data._id,
                name: data.name,
                price: data.price,
                count: 1,
            });
        }
    }, [data, setStock]);

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
