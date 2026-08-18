import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold">Magnat Shop</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>

      <nav className="p-4">
        <NavLink to="/dashboard" end className={({ isActive }) => "block px-4 py-3 rounded-lg text-sm font-medium mb-1 " + (isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100")}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/products" className={({ isActive }) => "block px-4 py-3 rounded-lg text-sm font-medium mb-1 " + (isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100")}>
          Mahsulotlar
        </NavLink>
        <NavLink to="/dashboard/categories" className={({ isActive }) => "block px-4 py-3 rounded-lg text-sm font-medium mb-1 " + (isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100")}>
          Kategoriyalar
        </NavLink>
        <NavLink to="/dashboard/settings" className={({ isActive }) => "block px-4 py-3 rounded-lg text-sm font-medium mb-1 " + (isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100")}>
          Sozlamalar
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button onClick={() => { localStorage.removeItem("accessToken"); navigate("/login"); }} className="w-full px-4 py-3 rounded-lg text-sm text-left text-gray-600 hover:bg-red-50 hover:text-red-600">
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
