import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../services/apiMart";
// import { useProduct } from "../../context/ContextProvider";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

function ProductDetails() {
  //   const { productId } = useParams();ga
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productItem = useLoaderData();
  const { image, name, price, category, id } = productItem;

  function handleAdd(image, name, price, id) {
    const newItem = {
      image,
      name,
      price,
      quantity: 1,
      totalPrice: price * 1,
      id,
    };
    dispatch(addItem(newItem));
    navigate("/cart");
  }

  return (
    <div className=" bg-amber-700 min-h-full w-full">
      <h1 className="text-xl text-center font-semibold">
        Product Details Page
      </h1>
      <p className="text-lg text-center">
        More information about the product will be displayed here.
      </p>
      <div className="flex w-full gap-3 p-4 items-start h-full">
        <div className="border w-[50%] h-100 flex justify-center items-center ">
          <img src={image} alt="" className="h-full object-cover" />
        </div>
        <div className="h-100 flex flex-col bg-amber-100 gap-8 px-3 py-4 rounded-2xl   w-[50%]">
          <h2>
            <strong>Name: </strong>
            {name}
          </h2>
          <p>
            <strong>Category: </strong>
            {category}
          </p>
          <p>
            <strong> Price:</strong> ${price?.toFixed(1)}
          </p>
          <button
            onClick={() => handleAdd(image, name, price, id)}
            className="mt-auto w-full bg-amber-300 px-3 py-2 rounded-2xl hover:bg-amber-500 transition-all duration-600 text-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const { productId } = params;
  const data = await fetchProductById(productId);
  return data;
}
export default ProductDetails;
