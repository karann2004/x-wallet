import { useRecoilValueLoadable } from "recoil";
import MiniProduct from "../components/MiniProduct";
import ProductDetail from "../components/ProductDetail";
import { productIdListSelector } from "../store/fetchProduct";

function Product() {
  const val = useRecoilValueLoadable(productIdListSelector);

  if (val.state === 'loading') {
    return <div className={"flex justify-center items-center h-[80vh]"}>Loading...</div>
  }

  if (val.state === 'hasError') {
    return <>Error</>;
  }

  const renderProduct = val.contents.map((id: number | string) => (
    <div
      className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 flex items-center justify-center"
      key={id}
    >
      <MiniProduct id={id.toString()} />
      <ProductDetail id={id.toString()} />
    </div>
  ));

  return (
    <div className="grid grid-cols-12 md:px-24 sm:gap-x-10 sm:gap-y-12 gap-y-10 py-2 lg:mx-0">
      {renderProduct}
    </div>
  );

}

export default Product;
