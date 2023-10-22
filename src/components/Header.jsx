import React, { useState } from "react";

export default function Header({ onOpenDialogue }) {
  return (
    <>
      <nav className="bg-gray-100 p-4 mx-auto max-w-7xl sm:my-4 sm:rounded-lg  ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Album Collection</h1>
          <button
            onClick={onOpenDialogue}
            type="button"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add album
          </button>
        </div>
      </nav>
    </>
  );
}
