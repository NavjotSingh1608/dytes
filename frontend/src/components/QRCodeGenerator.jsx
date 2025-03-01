import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";

const QRCodeGenerator = () => {
    const [text, setText] = useState("");

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
                <div className="mt-4 flex justify-center">
                    {text && (
                        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                            <QRCodeCanvas value={text} size={180} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
