import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [sold, setSold] = useState(0);
  const [exported, setExported] = useState(0);
  const [money, setMoney] = useState(0);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("https://backend.magnateshop.uz/api/products", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const items = res.data.items;
          setTotal(items.length);
          setSold(items.filter((i) => !i.isActive).length);
          setExported(items.filter((i) => i.stock === 0).length);
          let sum = 0;
          items.forEach((i) => (sum += i.price * i.stock));
          setMoney(sum);
        }
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Jami mahsulotlar</p>
              <p className="text-2xl font-bold mt-2">{total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Sotilganlar</p>
              <p className="text-2xl font-bold mt-2">{sold}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Export qilingan</p>
              <p className="text-2xl font-bold mt-2">{exported}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Jami pul</p>
              <p className="text-2xl font-bold mt-2">{money.toLocaleString()} so'm</p>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
