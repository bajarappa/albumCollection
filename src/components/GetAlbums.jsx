import React from "react";

export default function GetAlbum({ album, deleteAlbum }) {
  return (
    <>
      <div className="bg-gray-100 p-4  rounded-lg flex flex-col gap-4">
        <h1>{album.title}</h1>
        <div className="flex gap-x-2">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>

          <button
            onClick={() => deleteAlbum(id)}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
