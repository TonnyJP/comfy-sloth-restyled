import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {filters:{
    text, 
    category, 
    company, 
    color, 
    min_price, 
    max_price, 
    price, 
    shipping
  }, updateFilters, 
  clearFilter,
  all_products
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  //console.log(categories, companies, colors)
  return <Wrapper>
    <div className='content'>
      <form onSubmit={e => e.preventDefault()}>
        {/**search Input */}
        <div className='from-control'>
           <input 
           type='text' 
           name="text" 
           placeholder="search" 
           className="search-input" 
           value={text}
           onChange={updateFilters}/>
        </div>
        {/**end */}
        {/** category */}
        <div className=''>
          <h5> Category</h5>
          <div>
             {categories.map((cat, index) => {
             return <button 
              className={`${category === cat.toLowerCase()? 'active': null} button`} 
              key={index} 
              name="category" 
              onClick={updateFilters}
             >{cat}</button>
          })}
          </div>
        </div>
        {/**end */}
        {/** company */}
        <div className='form-control'>
          <h5> company</h5>
          <select onChange={updateFilters} name="company" className='company' value={company}>
            {companies.map((company, index) => {
            return <option key={index} value={company} >{company}</option>
          })}
          </select>
        </div>
        {/**end */}
        {/** colors */}
        <div className='form-control'>
          <h5> colors</h5>
          <div className='colors'>
            {colors.map((col, index) => {
              if(col === 'all'){
                return <button 
                  name="color" 
                  key="all"
                  data-color='all'
                  onClick={updateFilters}
                  className={`${color === "all"? "all-btn active": "all-btn"}`}
                >
                  All
                </button>
              }
              return <button 
              className={`${col === color? "active": null} color-btn`} 
              name="color" 
              style={{background: col}}
              data-color={col}
              onClick={updateFilters}
              >
                {color === col ? <FaCheck />: null}
              </button>
            })}
          </div>
        </div>
        {/**end */}
         {/** price */}
        <div className='form-control'>
          <h5> Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input 
           type="range" 
           name="price" 
           onChange={updateFilters} 
           min={min_price} 
           max={max_price} 
           value={price}
          />
        </div>
        {/**end */}
         {/** shipping */}
        <div className='form-control shipping'>
          <label htmlFor='shipping'> free shipping</label>
          <input 
           type='checkbox'
           name='shipping' 
           id="shipping" 
           onChange={updateFilters} 
           checked={shipping}/>
        </div>
        {/**end */}
      </form>
      <button className='clear-btn' onClick={clearFilter}> clear filter</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
