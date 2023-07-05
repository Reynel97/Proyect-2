import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useState } from "react";


function App() {
  const [position, setPosition] = useState();
  
  useEffect(() => {
   
    function success(pos) {
      const crd = pos.coords; 
      setPosition(crd);
     
    }
    
    
    navigator.geolocation.getCurrentPosition(success);
  }, []);


  const [allData, setAllData] = useState();
  const [btn, setBtn] = useState(true);
  const btnClick = () => {
    if (btn == true) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position?.latitude}&lon=${position?.longitude}&appid=2b0d5318b26f62bdea23c1c0f33101d4`)
      .then((response) => {
        setAllData(response.data);
      })
      .then((error) => console.log(error));
  }, [position]);
  
  
  
  
  
  return (
    
    <>
   
    
    <div className="section_card">
      <h1>{allData?.name}</h1>
      <h2>{allData?.sys.country}</h2>
      <img className="photo" src="https://openweathermap.org/img/wn/10d@2x.png" alt="" />
      <h2>{(allData?.main.temp - 273.1).toFixed(0)} °C</h2>
      <h2>{(((allData?.main.temp - 273.1) * 9) / 5 + 32).toFixed(0)} F</h2>
      
    </div>
      
      <div className="div">
      <button className="Button" onClick={btnClick}>Grados {btn ? "C" : "F"}</button>
      </div>
   
    </>
  );
}

export default App;