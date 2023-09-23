import axios from 'axios'
import React from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  /* GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR, */
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  product_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const openSideBar = () => {
    dispatch({type: SIDEBAR_OPEN})
  }
  const closeSideBar = () => {
    dispatch({type: SIDEBAR_CLOSE})
  }
  

   const fetchData = async (url) => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    try {
      const response = await axios.get(`${url}`);
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: response.data})
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR })
    }
  } 

 /*  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload:singleProduct})
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
  } */

  React.useEffect(() => {
    fetchData(`${url}`)
  },[])

  const value = {
    ...state,
    openSideBar,
    closeSideBar,
    //fetchSingleProduct
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return React.useContext(ProductsContext)
}
