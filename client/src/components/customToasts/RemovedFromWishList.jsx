function RemovedFromWishlist({ t, thumbnail, title }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-[#333] shadow-lg rounded-lg pointer-events-auto items-center p-4 flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-shrink-0 pt-0.5 mr-1">
        <img
          className="h-10 w-10 rounded-full"
          src={thumbnail}
          alt="product thumbnail"
        />
      </div>
      <p className="text-sm font-medium text-[#fff]">
        Successfully removed {title} from your wishlist
      </p>
    </div>
  );
}

export default RemovedFromWishlist;
