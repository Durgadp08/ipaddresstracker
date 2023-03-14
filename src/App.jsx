import React, { useState, useEffect } from "react";
import Ma from "./components/Mymap";
import Details from "./components/details";

function App() {
  const [data, setData] = useState("");
  const [ip, setIp] = useState("");
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  async function getdata() {
    const response = await fetch("https://ipaddresstracker-api-production.up.railway.app/");
    const data = await response.json();
    return data;
  }
  const failureMessage = {query:"Sorry pal" , city:"Your", region: "Hmm", zip:"🤨😐😴", timezone:"You'r Undetectable" , isp:"Not Me" }
  useEffect(()=>{
    getdata()
    .then(res =>{
      if(res.status === "success"){
        setData(res);
        setMapCenter([res.lat,res.lon]);
      }
      else{
        setData(failureMessage);
      }
    } )
    .catch(err => console.error(err));
  },[ip])

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { input: ip };
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(options.body);
    const response = await fetch("https://ipaddresstracker-api-production.up.railway.app/", options);
    const result = await response.json();
    console.log(result);
    setIp('');
  }
 
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
            <Details data={data.status==="success" ? data :failureMessage }/>
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
