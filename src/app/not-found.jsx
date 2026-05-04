import Link from 'next/link';
import React from 'react';

const NotfoundPage = () => {
    return (
        <div className="text-center p-10">
        <p className="text-xl font-semibold text-red-600">Maybe You are in the Wrong page!</p>
        <Link href="/" className="btn mt-4">
          Return to home
        </Link>
      </div>
    );
};

export default NotfoundPage ;