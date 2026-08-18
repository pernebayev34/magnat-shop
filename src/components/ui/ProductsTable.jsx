import toast from "react-hot-toast";

const ProductsTable = ({ data }) => {
  const token = localStorage.getItem("accessToken");

  const handleDelete = (id) => {
    fetch("https://backend.magnateshop.uz/api/products/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.message);
      });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Mahsulotlar</h2>
          <p className="text-sm text-gray-500">Jami {data.length} ta</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Qo'shish
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left px-5 py-3 text-xs text-gray-500">Nomi</th>
            <th className="text-left px-5 py-3 text-xs text-gray-500">Kategoriya</th>
            <th className="text-left px-5 py-3 text-xs text-gray-500">Narxi</th>
            <th className="text-left px-5 py-3 text-xs text-gray-500">Soni</th>
            <th className="text-left px-5 py-3 text-xs text-gray-500">Holat</th>
            <th className="text-right px-5 py-3 text-xs text-gray-500">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-5 py-3 text-sm">{item.name}</td>
              <td className="px-5 py-3 text-sm">{item.category.name}</td>
              <td className="px-5 py-3 text-sm">{item.price.toLocaleString()} so'm</td>
              <td className="px-5 py-3 text-sm">{item.stock} dona</td>
              <td className="px-5 py-3 text-sm">
                {item.isActive ? "Faol" : "Nofaol"}
              </td>
              <td className="px-5 py-3 text-right">
                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:underline">
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && <p className="p-6 text-center text-gray-500">Mahsulotlar topilmadi</p>}
    </div>
  );
};

export default ProductsTable;
