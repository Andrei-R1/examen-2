import { useEffect, useState } from "react";

export function CharacterList(props) {
  const [data, setData] = useState([]);

  const newData = (dataName) => {
    if (!data.find((item) => item.name === dataName)) {
      setData([...data, { name: dataName }]);
    }
  }
}
export function Favorites(props) {
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
        localStorage.setItem(["info", {...JSON.stringify(props.character)} ]);
        // localStorage.setItem('info', JSON.stringify(props.characters));
        document.getElementById("favoritos").innerHTML =
          "Remove from Favorites";
      } else {
        localStorage.removeItem(props.id);
        document.getElementById("favoritos").innerHTML = "Add to Favorites";
      }
    } catch (error) {
      console.log(error);
    }
  }, [favoritos]);

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