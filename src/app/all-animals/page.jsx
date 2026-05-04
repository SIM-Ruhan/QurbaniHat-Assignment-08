"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Allanimals = () => {
  const [models, setModels] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("https://qurbani-hat-assignment-08-vz7v-jlxietb4y.vercel.app/data.json")
      .then((res) => res.json())
      .then((data) => {
        setModels(Array.isArray(data[0]) ? data[0] : data);
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  const sortedModels = [...models].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Animals</h1>

      <div className="mb-6 flex items-center gap-4">
        <span className="font-semibold">Sort by price:</span>

        <select
          className="border px-3 py-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sortedModels.map((model, index) => (
          <div
            key={`${model.id}-${index}`}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Image
              src={model.image}
              alt={model.name}
              width={400}
              height={300}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {model.name}
              </h2>

              <p><strong>Breed:</strong> {model.breed}</p>
              <p><strong>Age:</strong> {model.age} years</p>
              <p><strong>Weight:</strong> {model.weight} kg</p>
              <p><strong>Location:</strong> {model.location}</p>

              <p className="text-green-600 font-semibold">
                ৳ {model.price.toLocaleString()}
              </p>

              <Link href={`/all-animals/${model.id}`}>
                <button className="w-full mt-3 bg-[#843534] text-white py-2 rounded-lg cursor-pointer hover:bg-green-700">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allanimals;