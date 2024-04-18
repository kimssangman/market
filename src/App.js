import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage className="homePage"></HomePage>}
                />
            </Routes>
        </div>
    );
}

export default App;
