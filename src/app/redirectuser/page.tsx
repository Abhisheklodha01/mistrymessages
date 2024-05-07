import Link from "next/link";
import React from "react";

const RedirectPage = () => {
  return (
    <main
      className="flex-grow flex flex-col min-h-screen
    items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white"
    >
      <Link href={"/dashboard"}
       className="py-1 px-3 rounded-lg bg-blue-600 text-white"
      >
        Got To Dashboard
        </Link>
    </main>
  );
};

export default RedirectPage;
