import BackHomePage2 from "./HomePage2Img1.png";
import BackHomePage21 from "./HomePage2Img2.png"
import Logo from "./logo2 22.png"
import "./HomePage.css"
import { Button } from "@mantine/core";
function HomePage() {
  return (
    <div className='HomePageAll'>
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
    </div>
  )
}

export default HomePage