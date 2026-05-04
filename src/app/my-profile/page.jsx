"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const MyProfile = () => {
  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <p className="text-xl font-semibold">You are not logged in</p>
        <Link href="/login" className="btn mt-4">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex items-center">
      <div className="avatar">
  <div className="w-24 rounded-full">
    <Image
                 src={user?.image}
                 alt="profile"
                 width={100}
                 height={100} className="object-cover rounded-full"
               unoptimized
               />
  </div></div>


        <p className="text-2xl font-bold">
           {user.name}
        </p>

        <p className="text-gray-500">
           {user.email}
        </p>

        
        <Link href="/my-profile/update">
          <button className="btn btn-primary mt-4">
            Update Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;