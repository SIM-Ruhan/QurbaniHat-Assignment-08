"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { PiCowDuotone } from "react-icons/pi";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
  };
                                               
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/all-animals"}>All Animals</Link>
              </li>
              <li>
                <Link href={"/my-profile"}>My Profile</Link>
              </li>
            </ul>
          </div>

          <a className="btn btn-ghost font-bold md:text-2xl">
            <PiCowDuotone />
            QurbaniHat
          </a>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold gap-4">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/all-animals"}>All Animals</Link>
            </li>
            <li>
                <Link href={"/my-profile"}>My Profile</Link>
              </li>
          </ul>
        </div>

   
        <div className="navbar-end gap-2">
          {user ? (
            <>
          
              <div className="flex items-center gap-1">
                  
               <div className="avatar">
  <div className="w-24 rounded-full">
    <Image
                 src={user?.image}
                 alt="profile"
                 width={100}
                 height={100} className="object-cover rounded-full"
                 referrerPolicy="no-referrer"
               unoptimized
               />
  </div></div>
              </div>

              
              <button
                onClick={handleLogOut}
                className="btn text-red-400"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
             
              <Link href={"/login"} className="btn">
                Log In
              </Link>
              <Link href={"/signup"} className="btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;