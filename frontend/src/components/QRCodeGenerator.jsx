import React, { useState } from "react";
import axios from "axios";
import API from "../utils/api";

const QRCodeGenerator = () => {
    const [text, setText] = useState("");
    const [qrCode, setQrCode] = useState("");

    const generateQRCode = async () => {
        if (!text) return;

        try {
            const response = await API.post(`/api/qrcode/generate-qr`, { text });
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">QR Code Generator</h2>
                <input 
                    type="text" 
                    value={text}    
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter text for QR code" 
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                    onClick={generateQRCode} 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                    Generate QR Code
                </button>
                <div className="mt-4 flex justify-center">
                    {qrCode && (
                        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                            <img src={qrCode} alt="Generated QR Code" className="w-40 h-40"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
