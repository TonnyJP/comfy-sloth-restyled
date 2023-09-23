import React from 'react'
import axios from 'axios'
import {products_url as url} from '../utils/constants'
import styled from 'styled-components'
import Error from './Error'
import Product from './Product'
import {useQuery} from '@tanstack/react-query'
import Loading  from './Loading'



const FeaturedProducts = () => {
//const data = useLoaderData();
  const {isError, isLoading, data} = useQuery({
    queryKey: ['featured-product'],
    queryFn: async() => {
      const allProducts = await axios.get(url)
      const featuredProduct = allProducts.data.filter((prod) => prod.featured) 
      return featuredProduct;
    }
  }) 

  if(isLoading) return <Loading /> 

  if (isError) return <Error /> 

  return <Wrapper className='section'>
    <div className='title'>
      <h2>featured Products</h2>
      <div className='underline' />
    </div>
    <div className='section section-center featured'>
      {data.map((product) => {
        const {id, image, name, price} = product;
        return <Product key={id} name={name} image= {image} price={price} id={id}/>
      })}
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
