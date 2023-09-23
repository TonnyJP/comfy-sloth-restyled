import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'


export const SingleProductPage = () => {

  //const newUrl = new URL()
  const navigate = useNavigate()
  const prodId = useParams()

  const { isLoading, isError, data} = useQuery({
    queryKey: ['single-product'],
    queryFn: async() => await axios.get(`${url}${prodId.id}`).catch((error) => {
      if(error.response){
        console.log("that is the error",error.response.data, error.response.status, error.response.header )
      }else if(error.request){
        console.log(error.request)
      }else{
        console.log("Error", error.message)
      }
      console.log(error.config)
    })  
  })
  if(isLoading) return <Loading/>

  if(isError) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
    return <Error />
  }
  

  const { name, price, description, stock, stars, reviews, id: sku, company, images} = data.data;
 
  return <Wrapper>
    <PageHero title = {name} product={data}/>
    <div className='section section-center page'>
      <Link to="/products" className='btn'>
        back to products
      </Link>
      <div className='product-center'>
        <ProductImages images = {images}/>
        <section className='content'>
          <h2>{name}</h2>
          <Stars  stars= {stars} reviews={reviews}/>
          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <p className='info'>
            <span> Available:</span>
            {stock>0 ? 'In stock': 'out of stock'}
          </p>
          <p className='info'>
            <span> SKU:</span>
            {sku}
          </p>
          <p className='info'>
            <span> Brand:</span>
            {company}
          </p>
          <hr/>
          {stock > 0 ? <AddToCart product = {data.data}/> : null}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
