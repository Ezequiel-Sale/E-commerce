import Cart from '@/components/Cart/Cart'
import { IProduct } from '@/helpers/types'
import React from 'react'

const page = ({id, name, description, price, stock, image, categoryId}: IProduct) => {
  return (
    <Cart id={id} name={name} description={description} price={price} stock={stock} image={image} categoryId={categoryId}/>
  )
}

export default page