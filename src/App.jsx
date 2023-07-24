import React, { useState, useEffect } from "react";
import Ma from "./components/Mymap";
import Details from "./components/details";

function App() {
  const [data, setData] = useState([]);
  const [ip, setIp] = useState("");
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const failureMessage = ["Sorry pal","Your","Hmm","🤨😐😴","You'r Undetectable" ,"Not Me" ]
  
  useEffect(()=>{
  const fetchdata = async ()=>{
  const response = await  fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_PAtB9o8f4rbwD82htyCOHvnWoYugD");
    
    if(response.ok){
      const result = await response.json();
      console.log(result);
      console.log(`in use efffect`);
      setData([result.ip,result.location.city, result.location.country,result.location.postalCode,result.location.timezone, result.isp]);
      
      setMapCenter([result.location.lat, result.location.lng])
    }
    else{ 
 setData(failureMessage);
    }
}
    fetchdata ();
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_PAtB9o8f4rbwD82htyCOHvnWoYugD&ipAddress=${ip}&domain=${ip}`);
    console.log(response);
console.log(`in submit function`);
      if(response.ok){
      const result = await response.json();
      console.log(result);
      setData([result.ip,result.location.city, result.location.country,result.location.postalCode,result.location.timezone, result.isp]);
      
      setMapCenter([result.location.lat, result.location.lng])
    }
    else{ 
 setData(failureMessage);
    }
    setIp('');
  }
console.log(`down here`);
 console.log(data);
  return (
    <div>
      <div className="image">
        <div className="main">
          <div>
            <h1 id="title">IP Address Tracker</h1>
          </div>
          <div id="input-btn">
          <form onSubmit={handleSubmit} >
              <input
                id="input"
                type="text"
                name="input"
                value={ip}
                placeholder="Search for any IP address or domain"
                onChange={(e) => {
                  setIp(e.target.value);
                }}
              />
              <button type="submit" id="btn">
                <span>&gt;</span>
              </button>
            </form>
          </div>
          <div className="box">
            <Details data={data}/>
           </div>
        </div>
      </div>

      <div>
        <Ma mapCenter={mapCenter}/>  
      </div>
    </div>
  );
}

export default App;
