import axios from 'axios';
import {useEffect, useState} from 'react';

function Character() {
  
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios({
        method: 'get',
        url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2128939953945151/732`,
      })
      setCharacters(data);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {
        <div>
          <h2>{characters.name}</h2>
          <img src={characters.image} alt={characters.name}/>
        </div>
      }
    </div>
  )
}

export default Character