import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Loader from "./Shade/Loaders/Loaders";

// Lazy loading components
const Home = lazy(() => import('./Component/Home/Home'));
const Products = lazy(() => import('./Component/Shop/Products'));
const ProductDetails = lazy(() => import('./Component/ProductDetails/ProductDetails'));
const WishList = lazy(() => import('./Component/WishList/WishList'));
const ErrorPage = lazy(() => import('./Shade/ErrorPage/ErrorPage'));

function App() {
  const [effect, setEffect] = useState(1);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home effect={effect} setEffect={setEffect} />}>
            <Route index element={<Products effect={effect} setEffect={setEffect} />} />
            <Route path="/product-details/:id" element={<ProductDetails effect={effect} setEffect={setEffect} />} />
            <Route path="/wishList" element={<WishList effect={effect} setEffect={setEffect} />} />
          </Route>

          {/* Fallback Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
