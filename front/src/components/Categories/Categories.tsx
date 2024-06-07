"use client"
import { fetchProducts } from '@/helpers/petitions'
import { ICategory, IProduct } from '@/helpers/types'
import { categoriesToPreLoad } from '@/helpers/types/categories'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'

const Categories: React.FC = () => {
  const [categories] = useState<ICategory[]>(categoriesToPreLoad);
  const [data, setData] = useState<IProduct[]>();
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const dataProducts = await fetchProducts()
      console.log(dataProducts)
      setData(dataProducts)
    }
    fetchData()
  }, [])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const categoryId = categories.find(cat => cat.name === category)?.id;
    if (categoryId !== undefined) {
      const dataFilter = data?.filter((item) => item.categoryId === categoryId);
      setFilteredData(dataFilter!);
    } else {
      setFilteredData([]); //* si no existe producto que coincida con el categoryId setea un array vacio
    }
  };

  return (
    <>
      <div className='flex gap-2 justify-center items-center mt-2'>
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleCategoryClick(category.name)} className='cursor-pointer'>
            <div className='w-24 h-24 bg-opacity-20 bg-black text-white rounded-full flex justify-center items-center transition-transform hover:bg-red-500 hover:scale-110 drop-shadow-xl group z-0'>
              <Image src={`/${category.name.toLowerCase()}.png`} width={70} height={70} alt={category.name} />
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 ? <div className='mt-4 text-center text-white'>No hay productos para mostrar</div> : (
        <div className='mt-10 text-center flex justify-center items-center flex-wrap gap-3'>
          {filteredData.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;
