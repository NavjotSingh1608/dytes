import React, { useContext } from "react";
import QRCodeGenerator from "../components/QRCodeGenerator";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">QR Code Generator</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Welcome, {user?.username || "Guest"}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Home;
