"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    fetch("https://qurbani-hat-assignment-08-we22.vercel.app/data.json")
      .then((res) => res.json())
      .then((data) => {
        const models = Array.isArray(data[0]) ? data[0] : data;
        setAnimals(models);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const featured = animals.slice(0, 4);

  return (
    <div className="space-y-16">

      
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        
        <Image
          src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Qurbani Banner"
          fill
          className="object-cover brightness-50"
          
        />

        <div className="relative text-center px-4 space-y-4">
          <h1 className="text-xl lg:text-6xl font-bold">
            Find Your Perfect Qurbani Animal
          </h1>

          <p className="text-gray-200 md:text-lg">
            Healthy, verified livestock for your Qurbani needs
          </p>

          <Link href="/all-animals">
            <button className="bg-[#843534] px-6 py-3 rounded-lg hover:bg-green-700 cursor-pointer transition">
              Browse Animals
            </button>
          </Link>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Animals
        </h2>

        {loading ? (
          <p className="text-center"><span className="loading loading-spinner text-warning"></span></p>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {featured.map((animal, index) => (
              <div
                key={`${animal.id}-${index}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <Image
                  src={animal.image}
                  alt={animal.name}
                  width={400}
                  height={250}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg">{animal.name}</h3>

                  <p className="text-green-600 font-semibold">
                    ৳ {animal.price.toLocaleString()}
                  </p>

                  <Link href={`/all-animals/${animal.id}`}>
                    <button className="w-full bg-[#843534] text-white py-2 rounded cursor-pointer hover:bg-green-700">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center mb-8">
            Qurbani Tips
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            
            <div className="bg-white p-6 rounded-xl shadow">
              Choose healthy animals with no visible defects
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              Ensure proper age and weight before purchase
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              Always buy from trusted sellers
            </div>

          </div>
        </div>
      </section>

    
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Breeds
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-xl">Sahiwal Cow</h3>
            <p>Strong, healthy and high quality breed</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-xl">Black Bengal Goat</h3>
            <p>Most popular goat breed in Bangladesh</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-xl">Friesian Cow</h3>
            <p>Large and premium dairy breed</p>
          </div>

        </div>
        </div>
      </section>

    </div>
  );
}