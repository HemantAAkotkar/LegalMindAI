import React from "react";
import { assets } from "../assets/assets";
import "./Court.css"

export default function CourtCard(props) {
   
    return (
        <div className="Court-card">
            <div className="head">
            <img src={assets.Court_img} alt=""  />
            <h3>{props.name}</h3>
            <p>{props.description}</p>

            </div>
            <div className="element">
                <div className="pending">
                    <p>{props.pending}</p>
                    <p>Pending</p>
                </div>
                <div className="disposed">
                    <p>{props.disposed}</p>
                    <p>Disposed ({props.disposedMonth})</p>
                </div>
            </div>

        </div>
    );
}