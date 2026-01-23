import { useNavigate } from "react-router";

function MenuItem({ menuproducts }) {
  const navigate = useNavigate();
  return (
    <div className="col-span-full mt-0 rounded-2xl  ">
      <div className="grid grid-cols-5 grid-rows-4 w-full gap-1.5 ">
        {menuproducts?.map((products) => (
          <div
            onClick={() => navigate(`/product/${products.id}`)}
            key={products.id}
            className="w-full bg-amber-100 h-40 rounded-2xl flex justify-center items-center p-2"
          >
            <img src={products.image} alt="" className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItem;
