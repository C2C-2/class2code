import React from "react";
import "./HomePage2.css";
import { Button } from '@mantine/core';
import BackHomePage2 from "./HomePage2Img1.png";
import BackHomePage21 from "./HomePage2Img2.png"
function HomePage2() {
  return (
    <div className="HomePage2All">
      <div className="HomePage2Title">
        <span className="HomePage2TitleText1">¡Disfruta con nosotros!</span>
        <span className="HomePage2TitleText2">
          Realizamos todo tipo de eventos
        </span>
      </div>
      <div className="HomePage2Center">
        <img
          src={BackHomePage2}
          alt="BackHomePage2"
          className="HomePage2CenterImg"
        />
        
        <div className="HomePage2Center1">
        <span className="HomePage2CenterSpanAll">
            <span className="HomePage2Center1Part1">
          <span className="HomePage2Center1Text1">en Playa Noreste</span>
          <span className="HomePage2Center1Text2">Collaborate</span>
          </span>
          <p className="HomePage2Center1Text3">
            Breve descripción del evento que puede ocupara hasta 3 líneas de
            texto.
          </p>
          </span>
          <Button variant="filled" color="#388E3C" radius="xl">Me interesa</Button>
        </div>
        
      </div>
      <div className="HomePage2Under">
        <div className="HomePage2Under1">
        <span className="HomePage2UnderSpanAll">
            <span className="HomePage2Under1Part1">
          <span className="HomePage2Under1Text1">en Playa Sur</span>
          <span className="HomePage2Under1Text2">Develop</span>
          </span>
          <p className="HomePage2Under1Text3">
            Breve descripción del evento que puede ocupara hasta 3 líneas de
            texto.
          </p>
          </span>
          <Button variant="filled" color="#388E3C" radius="xl">Me interesa</Button>
        </div>
        <img
          src={BackHomePage21}
          alt="BackHomePage21"
          className="HomePage2UnderImg"
        />
      </div>
    </div>
  );
}

export default HomePage2;
