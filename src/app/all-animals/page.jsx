import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const Allanimals = async () => {
  const res = await fetch("http://localhost:8000/models/");
  const data = await res.json();
  const models = data[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Animals</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
        <Image
              src={model.image}
              alt={model.name}
              width={400}
              height={300}
              className="w-full h-52 object-cover" />
           
           
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {model.name}
              </h2>

              <p className="text-sm text-gray-600">
                <strong>Breed:</strong> {model.breed}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Age:</strong> {model.age} years
              </p>
              <p className="text-sm text-gray-600">
                <strong>Weight:</strong> {model.weight} kg
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {model.location}
              </p>

              <p className="text-lg font-semibold text-green-600">
                ৳ {model.price}
              </p>

              <Link href={`/details/${model.id}`}>
                <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
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