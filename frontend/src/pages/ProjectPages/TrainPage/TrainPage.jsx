import "./TrainPage.css";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
function TrainPage() {
  return (
    <div className="TrainPageAll" >
      <div className="TrainPageMain">
        <div className="TrainPageCenter">
          <div className="TrainPageButtonBack">
          <Link to="/Dashboard">
            <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
              >
                <path
                  d="M1.5 6H16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            </Link>
          </div>
          <div className="TrainPageContent">
            <div className="HeaderTitle">
              <span className="Tags">“</span>Get better by reading tips it's
              like having a secret weapon for success!
              <span className="Tags">”</span>
            </div>
            <div className="TrainPageTexts">
              <div className="TrainPageText1">
                <div className="TextAllTrain">
                  <span className= "TPT">
                    Sed ut perspiciatis
                  </span>
                  <p className= "PTP">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                  </p>
                </div>
                <div className="TextAllTrain">
                  <span className="TPT">
                    Lorem ipsum dolor
                  </span>
                  <p className= "PTP">
                    Amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris
                    nisi.
                  </p>
                </div>
              </div>
              <div className="TrainPageText1">
                <div className="TextAllTrain">
                  <span className= "TPT">
                    Nemo enim ipsam
                  </span>
                  <p className="PTP">
                    Consequuntur magni dolores eos qui ratione voluptatem sequi
                    nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                    dolor sit amet, consectetur, adipisci velit, sed quia non
                    numquam.
                  </p>
                </div>
                <div className="TextAllTrain">
                  <span className= "TPT">
                    Tempor incididunt
                  </span>
                  <p className= "PTP">
                    Eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet,
                    consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora.
                  </p>
                </div>
              </div>
            </div>
            <div className="ButtonOk">
              <Button variant="filled" color="#388E3C" w={100}>
                Ok
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainPage;
