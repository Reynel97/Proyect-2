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
  const [backg,setBackf] = useState(true)

  const btnClick = () => {
    if (btn == true) {
      setBtn(false);
    } else {
      setBtn(true);
    }
   // setBtn(!btn)
  };


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position?.latitude}&lon=${position?.longitude}&appid=2b0d5318b26f62bdea23c1c0f33101d4`)
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => console.log(error));
  }, [position]);

  const degree = btn
  ? `${(allData?.main.temp - 273.1).toFixed(0)} °C` 
  :`${(((allData?.main.temp - 273.1) * 9) / 5 + 32).toFixed(0)} F`

  const theme = backg
  ? "background: radial-gradient(#D5F3FF 0%, #51B4E8 100%)"
  : "background: radial-gradient(#53388f 0%, #2f2958 100%)"
  
  const changeBacgr = () => { setBackf(!backg)}
  

document.body.style = theme 
  
  
  return (
    
    <main>
     <div class = 'toggle-switch'>
            <label>
                <input type = 'checkbox'/>
                <span onClick={changeBacgr} class = 'slider'></span>
            </label>
            <a href = 'https://dribbble.com/shots/14199649-Dark-Light-Mode-Toggle-Switch-Pattern-A11y'>
                
            </a>
        </div>
   
    
    <div className="section_card">
      <h1>{allData?.name}</h1>
      <h2>{allData?.sys.country}</h2>
      <img className="photo" src={`/${allData?.weather[0].icon.at(1)}.svg`} alt="" />
      <h2>{degree}</h2>
      
      
    </div>
      
      <div className="div">
      <button className="Button" onClick={btnClick}>Grados {btn ? "C" : "F"}</button>
      </div>
   
    </main>
  );
}

export default App;