const CartItemsSkeleton = () => {
  const skeletonItems = Array(4).fill(null);

  return (
    <div className="space-y-4 p-4">
      {skeletonItems.map((_, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 gap-4 items-center bg-white p-4 rounded-xl shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-24 h-24 rounded-lg bg-gray-200" />

          {/* Text and actions skeleton */}
          <div className="flex flex-col space-y-2 w-full">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />

            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-4 w-6 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-6 w-6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsSkeleton;
