"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/submit");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      const newData = { content: inputValue };
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setInputValue("");
        const addedData = await response.json();
        setData((prevData) => [...prevData, addedData]);
      } else {
        console.error("Error submitting data");
      }
    }
  };

  return (
    <div
      id="app-container"
      className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg"
    >
      <h1
        id="main-title"
        className="text-3xl font-bold text-center text-indigo-600 mb-4"
      >
        Submitted Data
      </h1>

      <form onSubmit={handleSubmit} id="submit-form" className="mb-6">
        <div id="form-container" className="flex items-center space-x-4">
          <input
            type="text"
            id="data-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter some data"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
          />
          <button
            type="submit"
            id="submit-button"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>

      <ul id="data-list" className="space-y-4">
        {data.length > 0 ? (
          data.map((item) => (
            <li
              key={item.id}
              id={`data-item-${item.id}`}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <p
                id={`data-item-content-${item.id}`}
                className="text-lg font-semibold text-black"
              >
                {item.content}
              </p>
            </li>
          ))
        ) : (
          <li id="no-data-message" className="p-4 text-center text-gray-500">
            No data available
          </li>
        )}
      </ul>
    </div>
  );
}
