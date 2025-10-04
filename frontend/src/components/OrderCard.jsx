
const OrderCard = ({ order }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="mb-4">
          <p className="text-sm text-gray-500">🆔 Order ID: <span className="font-medium text-gray-700">{order._id}</span></p>
          <p className="text-lg font-semibold text-green-700 mt-1">Total: ₹{order.totalPrice}</p>
          <p className="text-sm text-gray-400">📅 Placed on: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="border-t border-gray-100 pt-4 grid gap-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
              <img src={item.imageUrl} alt={item.costumeName} className="w-20 h-20 object-cover rounded-lg border" />
              <div>
                <p className="font-medium text-gray-800">{item.costumeName}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


export default OrderCard;