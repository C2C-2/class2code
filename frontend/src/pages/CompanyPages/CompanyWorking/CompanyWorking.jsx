import "./CompanyWorking.css";
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar.jsx";
import NavBar from "../../../components/NavBar/NavBar.jsx";
import { Button, Autocomplete, Input, TextInput } from "@mantine/core";
import { useQuery, gql } from "@apollo/client";
import CompanyWorkingCard from "../../../components/CompanyWorkingCard/CompanyWorkingCard";
import { Link } from "react-router-dom";
const GET_USER_QUERY = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      WorkCompanies {
        CompanyDescription
        CompanyName
        Domain
        Rate
        CreateDate
        _id
      }
    }
  }
`;

const SEARCH_WORKS_COMPANIES = gql`
  query SearchInWorksCompanies($userId: String!, $word: String!) {
    searchInWorksCompanies(userId: $userId, word: $word) {
      CompanyDescription
      Domain
    }
  }
`;
const FILTER_WORKS_COMPANIES = gql`
  query FilterWorksCompanies($userId: String!, $filterType: String) {
    filterWorksCompanies(userId: $userId, filterType: $filterType) {
      CreateDate
      Rate
    }
  }
`;
function CompanyWorking({ userId }) {
  const [searchWord, setSearchWord] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [sortingType, setSortingType] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("desc");
  const handleSortByRate = () => {
    setSortingType("Rate");
    setSortingOrder(sortingOrder === "desc" ? "asc" : "desc");
  };

  const handleSortByCreateDate = () => {
    setSortingType("CreateDate");
    setSortingOrder(sortingOrder === "desc" ? "asc" : "desc");
  };
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER_QUERY, {
    variables: {
      userId,
    },
  });
  const { loading, error, data } = useQuery(FILTER_WORKS_COMPANIES, {
    variables: {
      userId: userId,
      filterType: sortingType,
    },
  });

  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_WORKS_COMPANIES, {
    variables: {
      userId: userId,
      word: searchWord,
    },
  });
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#";
  }, [receivedData]);

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value);
  };
  const dummyData = [
    {
      _id: "6",
      CompanyName: "Dummy Company 1",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over",
      Domain: "Technology",
      Rate: 4.3,
      CreateDate: "2024-04-18",
    },
    {
      _id: "7",
      CompanyName: "Dummy Company 2",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over",
      Domain: "Finance",
      Rate: 3.8,
      CreateDate: "2024-04-17",
    },
    {
      _id: "8",
      CompanyName: "Asel",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over",
      Domain: "SOA",
      Rate: 3.8,
      CreateDate: "2024-04-17",
    },
   
    {
      _id: "7",
      CompanyName: "Dummy Company2 2",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over",
      Domain: "Finance",
      Rate: 3.8,
      CreateDate: "2024-04-13",
    },

  
    // Add more dummy company objects as needed
  ];

  return (
    <div className="MainCompanyWorkOn" id="man">
      <SideBar colorSide={receivedData} />
      <div className="CompanyImWorkOn">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="Part2CompanyWorkingOn">
          <div className="FakeDivWorkingOn"></div>
          <div className="ButtonCompanyWorkOn">
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
          <div className="ContentCompanyWorkOn">
            <div className="SearchCompanyWorkOn">
              <div className="SearchPartCompanyWorkOn">
                <TextInput
                  className="TextPartCompanyWorkOn"
                  placeholder="Search for Companies"
                  value={searchWord}
                  variant="unstyled"
                  onChange={handleSearchChange}
                  data={["React", "Angular", "Vue", "Svelte"]}
                />

                <div className="SvgPartCompanyWorkOn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.3547 12.9681C8.67003 15.0575 4.78756 14.869 2.31969 12.4011C-0.352547 9.72885 -0.352769 5.39584 2.31969 2.72338C4.99215 0.0509178 9.32517 0.0511395 11.9974 2.72338C14.4653 5.19124 14.6538 9.07371 12.5645 11.7584L15.6265 14.8205C15.7872 14.9812 15.8712 15.1902 15.8766 15.3998C15.8832 15.6271 15.8001 15.8567 15.6265 16.0302C15.2925 16.3643 14.7512 16.3646 14.4168 16.0302L11.3547 12.9681ZM10.7877 3.93309C12.7925 5.93786 12.792 9.18705 10.7877 11.1914C8.78336 13.1957 5.53418 13.1961 3.52941 11.1914C1.52464 9.18661 1.52508 5.93742 3.52941 3.93309C5.53373 1.92877 8.78292 1.92832 10.7877 3.93309Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="ButtonPartCompanyWorkOn">
                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  w={100}
                  onClick={handleSortByRate}
                >
                  Rate
                </Button>
                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  w={120}
                  onClick={handleSortByCreateDate}
                >
                  Create Date
                </Button>
              </div>
            </div>
            <div className="Part3CompanyWorkOnCard">
              {dummyData.map((company, index) => (
                <CompanyWorkingCard
                  key={index}
                  colorProp={receivedData}
                  company={company}
                />
              ))}

              {/* {searchData &&
                searchData.searchInWorksCompanies.map((company, index) => (
                  <CompanyWorkingCard
                    key={index}
                    colorProp={receivedData}
                    company={company}
                  />
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyWorking;
