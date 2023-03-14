import React from "react";

function Details(props){
    return             <div className="details">
    <div className="items">
      <p className="item">ip address</p>
      <p className="values">{props.data.query}</p>
    </div>
    <div className="items">
      <p className="item">Location </p>
      <p className="values">{props.data.city},{props.data.region} <br />
        {props.data.zip}</p>
    </div>
    <div className="items">
      <p className="item">Time Zone</p>
      <p className="values">{props.data.timezone}</p>
    </div>
    <div className="items">
      <p className="item">isp</p>
      <p className="values">{props.data.isp}</p>
    </div>
  </div>
}
export default Details;