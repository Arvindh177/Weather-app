import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("Chennai");
  const [photos, setPhotos] = useState([]);
  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=635cb7f584781ada8349035e445368f4&units=metric`
    )
    .then((res) => {
      if(res.ok) {
        console.log(res.status);
        return res.json();
      } else {
        if( res.status === 404) {
          return alert("Error occured!(wrong location)");

        }
        alert("Oops, there seems to be an errror!");
        throw new Error("You have an error");
      }
    })
    .then((data) => {
      console.log(data);
      setWeather(data);
    })
    .catch((error) => console.log(error));
    fetch(`https://api.unsplash.com/search/photos?query=${locations}&client_id=HGwq6YheHVq0llLfY3RYi-nM3PoZBdYGnIL3H9LaSeA`
  ).then((res) => {
    if(res.ok){
      return res.json();
    } else {
      throw new Error("You made a mistake");
    }
  }) .then((data) => {
    console.log(data);
    setPhotos(data?.results[0]?.urls?.raw);
  }) .catch((error) => console.log(error));
  }
  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='search'>
          <input
            type='text'
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder='Enter location'
            className='location_input'
          />
          <button className='location_searcher' onClick={ifClicked}>
            Search location
          </button>
        </div>
    <div className='app_data'>
    <p className="temp">Current Temparature: {weather?.main?.temp}</p>
    </div>
    <img className='app__image' src={photos} alt='' />
      </div>
      Weather app
    </div>
  );
}

export default App;
