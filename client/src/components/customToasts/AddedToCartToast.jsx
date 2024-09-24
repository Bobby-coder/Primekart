import { useNavigate } from "react-router-dom";

function AddedToCartToast({ t, thumbnail, title }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-[#333] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 pt-0.5 mr-1">
          <img
            className="h-10 w-10 rounded-full"
            src={thumbnail}
            alt="product thumbnail"
          />
        </div>
        <p className="text-sm font-medium text-[#fff]">
          Successfully added {title} to your cart
        </p>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => navigate("/cart")}
          className=" border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-300"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default AddedToCartToast;
