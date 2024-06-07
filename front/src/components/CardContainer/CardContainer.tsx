import Card from "@/components/Card/Card";
import { IProduct } from "@/helpers/types";
import { fetchProducts } from "@/helpers/petitions";
import Card2 from "../Card/Card2";


export default async function CardContainer() {
  const fetchData = await fetchProducts();
   return (
    <>
    <div className="flex flex-wrap justify-center items-center w-9/12 gap-4 m-auto mt-4 mb-4">
       {fetchData ? fetchData.map((products: IProduct) => <Card key={products.id} {...products}/>
      ): <div className="flex justify-center items-center w-[100vw] text-bold text-3xl">No hay productos para mostrar</div>}
    </div>
    </>
  );
}


