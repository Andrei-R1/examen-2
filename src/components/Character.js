import axios from "axios";
import { useEffect, useState } from "react";
import CharacterList from "./CharacterList";

function RndCharacter(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <h1 className="text-center py-4">My Hero List</h1>
      <button
        className="btn btn-primary"
        onClick={() => props.setId(Math.floor(Math.random() * 732) + 1)}
      >
        Get New Random Hero
      </button>
    </header>
  );
}

function Favorites(props) {
  const [favoritos, setFavoritos] = useState(false);

  function addFavorites() {
    setFavoritos(true);
  }
  function removeFavorites() {
    setFavoritos(false);
  }
  useEffect(() => {
    try {
      if (favoritos === true) {
        localStorage.setItem(props.id, JSON.stringify(props.characters));
        document.getElementById("favoritos").innerHTML =
          "Remove from Favorites";
      } else {
        localStorage.removeItem(props.id);
        document.getElementById("favoritos").innerHTML = "Add to Favorites";
      }
    } catch (error) {
      console.log(error);
    }
  }, [favoritos, props.characters, props.id]);

  return (
    <div>
      <button
        id="favoritos"
        className="btn btn-primary"
        onClick={() => {
          favoritos ? removeFavorites() : addFavorites();
        }}
      ></button>
    </div>
  );
}

function Character(props) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const randomId = Math.floor(Math.random() * 732) + 1;
  const [id, setId] = useState(randomId);

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios({
          method: "get",
          url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2128939953945151/${id}`,
        });
        setLoading(false);

        setCharacters(data);
        console.log(data);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <RndCharacter id={id} setId={setId} />
      <CharacterList />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-center p-5">
          <h3>{characters.name}</h3>
          <img src={characters.image.url} alt={characters.name} />
        </div>
      )}
      <Favorites characters={characters} id={id} />
    </div>
  );
}

export default Character;
