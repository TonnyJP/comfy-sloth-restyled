import React from 'react'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import { Navbar, Sidebar, Footer } from './components'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {AboutPage, CartPage, CheckoutPage, ErrorPage, HomePage, GlobaPageLayout, SingleProductPage, ProductsPage, PrivateRoute, AuthWrapper} from './pages';
//import Product from './components/Product';
//import {featuredProductLoader} from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobaPageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "single-product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "checkout",
        element: <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      },
      {
        path: "*",
        element: <ErrorPage />,
      }
    ]
  },
])

function App() {
  return (
    <AuthWrapper>
      <RouterProvider router = {router} />
    </AuthWrapper>
  )
}

export default App
