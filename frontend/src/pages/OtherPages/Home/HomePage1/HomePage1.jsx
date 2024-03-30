import React from "react";
import "./HomePage1.css";
import { Button } from "@mantine/core";
import Logo from "./logo2 22.png"

function HomePage1() {
  return (
    <div className="HomePage1HomeAll">
      <div className="HomePage1HomePart1">
        <div className="HomePage1HomePart1Top">
          <div className="HomePage1HomePart1LogoPart">
            <img src={Logo} alt="Logo" />
            <span className="HomePage1HomePart1LogoPartText">Class2Code</span>
          </div>
          <div className="HomePage1HomePart1NavBar">
            <button className="HomePage1HomePart1NavBarButton">Home</button>
            <button className="HomePage1HomePart1NavBarButton">About</button>
            <button className="HomePage1HomePart1NavBarButton">Service</button>
          </div>
        </div>
        <div className="HomePage1HomePartTexts">
          <div className="HomePage1HomePart1Text1">Learn</div>
          <div className="HomePage1HomePart1Text2">Deve</div>
          <div className="HomePage1HomePart1Text3">
            <p className="HomePage1HomePart1Text3Paragraph">
              malesuada nunc vel risus commodo viverra maecenas accumsan lacus
              vel facilisis volutpat est velit egestas dui id ornare arcu odio
              ut sem nulla pharetra diam sit amet nisl suscipit adipiscing
              bibendum est ultricies integer quis auctor elit sed
            </p>
            <span className="HomePage1HomePart1Text3Span">Scroll fo</span>
          </div>
        </div>
      </div>

      <div className="HomePage1HomePart2">
        <div className="HomePage1HomePart2Top">
          <div className="HomePage1HomePart2NavBar">
            <button className="HomePage1HomePart2NavBarButton">s</button>
            <button className="HomePage1HomePart2NavBarButton">How it works</button>
            <button className="HomePage1HomePart2NavBarButton">Contact</button>
          </div>
          <div className="HomePage1HomePart2NavBarButtons">
            <Button variant="filled" color="#EE7214" radius="xl" w={100}>
              Login
            </Button>
            <Button variant="filled" color="#000000" radius="xl" w={120}>
              Try for Free
            </Button>
          </div>
        </div>
        <div className="HomePage1EmptyClass"></div>
        <div className="HomePage1HomePart2CompleteDevelop">Lop</div>
        <div className="HomePage1HomePart2Collaborate">
          <span className="HomePage1HomePart2CollaborateText">Collaborate</span>
        </div>
        <div className="HomePage1HomePart2CompleteScroll">r more</div>
      </div>
    </div>
  );
}

export default HomePage1;
