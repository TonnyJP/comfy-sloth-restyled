import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const {id, color, amount, product} = action.payload;
    const tempItem = state.cart.find((product) => product.id === id+color);
    if(tempItem){
      const tempCart = state.cart.map((cartItem) =>{
        if(cartItem.id === id+color){
          let newAmount = amount + cartItem.amount;
          if(newAmount > cartItem.max){
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        }else{
          return cartItem;
        }
      })

      return {...state, cart: tempCart}
    }else{
      const newItem = {
        id: id + color,
        name: product.name,
        color: color, 
        amount: amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return {...state, cart: [...state.cart, newItem]}
    }
  }
  if(action.type === REMOVE_CART_ITEM){
    const newCart = state.cart.filter((element) => element.id !== action.payload)
    return {...state, cart: newCart}
  }
  if(action.type === CLEAR_CART){
    return {...state, cart: []}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id, value} = action.payload;
    const tempCart = state.cart.map((elt) => {
      if(elt.id === id){
        let newAmount = elt.amount;
        if(value === 'inc'){
          newAmount += 1;
          if(newAmount > elt.max){
            newAmount = elt.max;
          }
        }
        if(value ==='dec'){
          newAmount-=1;
          if(newAmount < 1){
            newAmount = 1;
          }
        }

        return {...elt, amount: newAmount}
      }
      return elt
    })
    return {...state, cart: tempCart}
  }
  if(action.type === COUNT_CART_TOTALS){
      const {total_items, total_amount} = state.cart.reduce((total, cartItem) => {
        const {amount, price} = cartItem;
        total.total_items += amount;
        total.total_amount+= price * amount;
        return total
      },{
        total_items: 0, total_amount: 0
      })
      return {...state, total_amount, total_items}
    }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
