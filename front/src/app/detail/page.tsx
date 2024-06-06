import React from 'react'
import DetailProduct from './[id]/page'
import { IProduct } from '@/helpers/types'

const DetailPage: React.FC<{ id: string }> = ({ id }: { id: string }) => {
  return (
    <div>
        <DetailProduct params={{ id }} />
    </div>
  )
}

export default DetailPage;