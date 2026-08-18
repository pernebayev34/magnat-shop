import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://backend.magnateshop.uz/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.success) {
          localStorage.setItem("accessToken", res.data.accessToken);
          navigate("/dashboard");
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Xatolik yuz berdi");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Magnat Shop</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Admin panelga kirish</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Login</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login kiriting" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Parol</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parolni kiriting" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <button disabled={loading} className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
