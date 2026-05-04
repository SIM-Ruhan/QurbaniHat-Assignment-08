"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


const DetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/data.json")
      .then((res) => res.json())
      .then((data) => {
        const models = Array.isArray(data[0]) ? data[0] : data;

        const found = models.find(
          (item) => item.id === parseInt(id)
        );

        setAnimal(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="p-12 flex flex-col items-center space-y-4">
        <p className="text-2xl font-bold text-gray-700">
          Animal not found!
        </p>
        <Link href={"/"}>
          <button className="btn btn-soft bg-red-200">
            Go back to home
          </button>
        </Link>
      </div>
    );
  }

 
  const handleBooking = (e) => {
    e.preventDefault();

   
    if (!user) {
      toast.error("Please login to book an animal");
      return;
    }

    toast.success("Booking successful !");
    e.target.reset();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <Image
          src={animal.image}
          alt={animal.name}
          width={800}
          height={500}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 space-y-2">
          <h1 className="text-3xl font-bold">{animal.name}</h1>

          <p><strong>Type:</strong> {animal.type}</p>
          <p><strong>Breed:</strong> {animal.breed}</p>
          <p><strong>Age:</strong> {animal.age} years</p>
          <p><strong>Weight:</strong> {animal.weight} kg</p>
          <p><strong>Location:</strong> {animal.location}</p>
          <p><strong>Category:</strong> {animal.category}</p>

          <p className="text-gray-700 mt-3">
            {animal.description}
          </p>

          <p className="text-2xl font-semibold text-green-600 mt-4">
            ৳ {animal.price.toLocaleString()}
          </p>
        </div>
      </div>


      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Book This Animal
        </h2>

        <form onSubmit={handleBooking} className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="border p-2 rounded"
            defaultValue={user?.name || ""}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="border p-2 rounded"
            defaultValue={user?.email || ""}
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Address"
            required
            className="border p-2 rounded"
          ></textarea>

          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;