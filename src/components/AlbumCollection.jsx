import axios from "axios";
import React, { useEffect, useState } from "react";
import GetAlbum from "./GetAlbums";
import Header from "./Header";
import AddAlbum from "./AddAlbum";

export default function AlbumCollection() {
  // State variables
  const [albums, setAlbums] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch albums from the API on component mount
  useEffect(() => {
    //Function to fetch data from api
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        console.log(response.data);
        setAlbums(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Function to add new album
  const addAlbum = async (newAlbum) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        newAlbum
      );

      const updatedAlbums = [
        ...albums,
        { ...response.data, id: albums.length + 1 },
      ];
      setAlbums(updatedAlbums);
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to delete albums

  const deleteAlbum = async (id) => {
    try {
      const result = await axios.delete(
        `https://jsonplaceholder.typicode.com/albums/${id}`
      );
      console.log(result.data);
      setAlbums(albums.filter((album) => album.id !== id));
      console.log(albums);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header onOpenDialog={() => setOpenDialog(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-3 mx-auto max-w-7xl gap-4 p-4 sm:p-0 mb-4">
        {albums.map((album) => (
          <GetAlbum key={album.id} album={album} deleteAlbum={deleteAlbum} />
        ))}
      </div>
      {openDialog && (
        <AddAlbum
          addAlbum={addAlbum}
          onOpenDialog={() => setOpenDialog(false)}
        />
      )}
    </>
  );
}
