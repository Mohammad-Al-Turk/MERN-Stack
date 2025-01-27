import React, { useState } from 'react';
import './App.css'; // ملف CSS للتنسيق

const App = () => {
    const [boxes, setBoxes] = useState([]); // حالة لتخزين قائمة الصناديق
    const [color, setColor] = useState(''); // حالة لتخزين لون الصندوق الحالي

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!color.trim()) return; // منع إضافة صندوق بدون لون

        // إضافة الصندوق الجديد إلى قائمة الصناديق
        setBoxes([...boxes, color]);

        // مسح حقل الإدخال بعد الإرسال
        setColor('');
    };

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Color:
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Enter a color (e.g., red or #FF5733)"
                    />
                </label>
                <button type="submit">Add Box</button>
            </form>
            <div className="boxes-container">
                {boxes.map((boxColor, index) => (
                    <div
                        key={index}
                        className="box"
                        style={{ backgroundColor: boxColor }}
                    ></div>
                ))}
            </div> 
        </div>
    );
};

export default App;
