import Cart from "@/components/Cart/Cart";
import { Product } from "@/helpers/types/Product";
import React from "react";

export const Page = ({
  id,
  name,
  description,
  price,
  stock,
  image,
  categoryId,
}: Product) => {
  return (
    <Cart
      id={id}
      name={name}
      description={description}
      price={price}
      stock={stock}
      image={image}
      categoryId={categoryId}
    />
  );
};

export default Page;
