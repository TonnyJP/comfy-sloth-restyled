import React from 'react'
//import {useQuery} from '@tanstack/react-query'
//import axios from 'axios'
//import {products_url as url} from '../utils/constants'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
//import {useLoaderData} from 'react-router-dom'

/* export const featuredProductLoader = async  () => {
  const allProducts = await axios.get(url)
  const featuredProduct = allProducts.data.filter((prod) => prod.featured) 
  console.log(allProducts)
  return featuredProduct;
} */
export const HomePage = () => {

  return <main >
    <Hero />
    <FeaturedProducts />
    <Services />
    <Contact />
  </main>
}

