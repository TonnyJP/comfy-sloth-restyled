import {
  LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS, UPDATE_SORT, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    const allPrices = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...allPrices)
    const minPrice = Math.min(...allPrices)
    return {...state, 
      all_products: [...action.payload], 
      filtered_products: [...action.payload], 
      filters: {
      ...state.filters, 
      max_price: maxPrice,
      price: maxPrice,
      min_price: minPrice
    }}
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view: false}
  }
  if(action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }
  if(action.type=== SORT_PRODUCTS){
   const { sort, filtered_products: products} = state;
   let tempProducts = [...products];
   if(sort=== 'price-lowest'){
    tempProducts = tempProducts.sort((prod1, prod2) => prod1.price -prod2.price)
   }
   if(sort === 'price-highest'){
    tempProducts = tempProducts.sort((prod1, prod2) => prod2.price -prod1.price)
   }
   if(sort === 'name-a'){
    tempProducts = tempProducts.sort((prod1, prod2) =>prod1.name.localeCompare(prod2.name))
   }
   if(sort === 'name-z'){
    tempProducts = tempProducts.sort((prod1, prod2) => prod2.name.localeCompare(prod1.name))
   }
   return {...state, filtered_products: tempProducts}
  }
  if(action.type === UPDATE_FILTERS){
    const {name, value } = action.payload;
    return {...state, filters:{...state.filters, [name]:value}}
  }
  
  if(action.type === FILTER_PRODUCTS){
    const { all_products} = state;
    let tempProducts = [...all_products];
    const { text, category, company, color, price, shipping} = state.filters;
    //filtering Text
    if(text){
      tempProducts = tempProducts.filter((product) => product.name.toLowerCase().startsWith(text))
    }
    //filtering category
    if(category !== 'all'){
      tempProducts = tempProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }
    //filtering company
    if(company !== 'all'){
      tempProducts = tempProducts.filter((product) => product.company.toLowerCase() === company.toLowerCase())
    }
   //filtering price
    if(price!== 'all'){
      tempProducts = tempProducts.filter((product) => product.price <= price)
    }

    //Filtering color
    if(color!== 'all'){
      tempProducts = tempProducts.filter((product) => product.colors.find((c) => c === color))
    }
   //filtering shipping
     if(shipping){
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    } 

    return {...state , filtered_products: tempProducts}
  }
  if(action.type === CLEAR_FILTERS){
    return {
      ...state, 
        filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
       }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
