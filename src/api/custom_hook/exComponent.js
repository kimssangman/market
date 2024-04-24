// 커스텀 훅 예제

import React from "react";
import useAxios from "./useAxios";

function MyComponent() {
    const { data, loading, error } = useAxios("https://api.example.com/data");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <div>{/* Render data here */}</div>;
}

export default MyComponent;
