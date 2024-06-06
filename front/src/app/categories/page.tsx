import Categories from '@/components/Categories/Categories'
import React from 'react'

const CategoriesPage: React.FC = () => {
  return (
    <div className='mt-24 h-[100vh]'>
        <h2 className='text-center mt-24 mb-2 text-3xl font-semibold'>Seleccione una categoria para ver los productos!</h2>
        <Categories />
    </div>
  )
}

export default CategoriesPage;