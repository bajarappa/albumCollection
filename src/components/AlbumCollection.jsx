import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateAlbum from "./UpdateAlbum";
import GetAlbum from "./GetAlbums";
import AddAlbum from "./AddAlbum";
import Header from "./Header";

export default AlbumCollection = () => {
  // State variables
  const [albums, setAlbums] = useState([]);
  const [openAddDialogue, setOpenAddDialogue] = useState(false);
  const [editAlbumId, setEditAlbumId] = useState(null);

  // Fetch albums from the API on component mount
  useEffect(() => {
    // Fetch albums from the API using async/await
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        setAlbums(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlbums();
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
      setOpenAddDialogue(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Functio to update album
  const updateAlbum = async (updatedAlbum) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`,
        updatedAlbum,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedAlbumData = response.data;
      const updatedAlbums = albums.map((album) =>
        album.id === updatedAlbumData.id ? updatedAlbumData : album
      );
      setAlbums(updatedAlbums);
      setEditAlbumId(null); // Clear the edit state
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete albums
  const deleteAlbum = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete");
      if (confirmDelete) {
        const result = await axios.delete(
          `https://jsonplaceholder.typicode.com/albums/${id}`
        );
        console.log(result.data);
        setAlbums(albums.filter((album) => album.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header onOpenDialogue={() => setOpenAddDialogue(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-3 mx-auto max-w-7xl gap-4 p-4 sm:p-0 mb-4">
        {albums.map((album) => (
          <div key={album.id}>
            {editAlbumId === album.id ? (
              <UpdateAlbum
                album={album}
                onUpdate={updateAlbum}
                onOpenUpdateDialogue={() => setEditAlbumId(null)}
              />
            ) : (
              <GetAlbum
                key={album.id}
                album={album}
                deleteAlbum={() => deleteAlbum(album.id)}
                onOpenUpdateDialogue={() => setEditAlbumId(album.id)}
              />
            )}
          </div>
        ))}
      </div>

      {openAddDialogue && (
        <AddAlbum
          addAlbum={addAlbum}
          onOpenAddDialog={() => setOpenAddDialogue(false)}
        />
      )}
    </div>
  );
};
