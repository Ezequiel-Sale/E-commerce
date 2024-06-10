import React, { Suspense } from 'react'
import DetailProduct from './[id]/page'


const DetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
        <DetailProduct params={params} />
    </div>
  )
}

export default DetailPage;