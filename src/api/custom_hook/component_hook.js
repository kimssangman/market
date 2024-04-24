/**--------------------------
 * 커스텀 훅 예제
 * 컴포넌트
 --------------------------*/

import React from "react";
import useData from "./useData_hook";

function MyComponent() {
    /**------------------------
     * 
     ------------------------*/
    const { data, loading, error } = useData(
        "https://api.example.com/data",
        exData
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <div>{/* Render data here */}</div>;
}

export default MyComponent;
