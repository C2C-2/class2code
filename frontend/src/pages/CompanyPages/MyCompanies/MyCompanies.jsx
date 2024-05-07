import "./LightMyCompanies.css";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import MyCompaniesCard from "../../../components/MyCompaniesCard/MyCompaniesCard";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
const FILTER_MY_COMPANIES = gql`
  query FilterMyCompanies($filterType: String) {
    filterMyCompanies(filterType: $filterType) {
      CreateDate
      Rate
    }
  }
`;
const SEARCH_IN_MY_COMPANIES = gql`
  query SearchInMyCompanies($userId: String!, $word: String!) {
    searchInMyCompanies(userId: $userId, word: $word) {
      CompanyDescription
      CompanyName
      Rate
    }
  }
`;
const GET_USER_COMPANIES = gql`
  query MyCompanies($userId: String!) {
    getUser(userId: $userId) {
      MyCompanies {
        CompanyDescription
        CompanyName
        Rate
        _id
      }
    }
  }
`;

function MyCompanies() {
  const [sortBy, setSortBy] = useState("CreateDate");
  const [userId, setUserId] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER_COMPANIES, {
    variables: { userId: userId },
  }); // Default sorting by CreateDate
  const { loading, error, data } = useQuery(
    searchWord ? SEARCH_IN_MY_COMPANIES : FILTER_MY_COMPANIES,
    {
      variables: {
        filterType: sortBy,
        userId: userId,
        word: searchWord,
      },
    }
  );

  const [receivedData, setReceivedData] = useState("");
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#";
  }, [receivedData]);

  const handleSortBy = (criteria) => {
    if (sortBy === criteria) {
      setSortBy(`${criteria}-desc`);
    } else {
      setSortBy(criteria);
    }
  };
  const handleSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const dummyCompanies = [
    {
      _id: "1",
      CompanyName: "Dummy Company 1",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over it. Love the look and feel.",
      Rate: 4.5,
    },
    {
      _id: "2",
      CompanyName: "Dummy Company 2",
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over it. Love the look and feel.",
      Rate: 3.8,
    },
    // Add more dummy company objects as needed
  ];
  return (
    <div className="MainMyCompanies" id="man">
      <SideBar />
      <div className="MyCompanies">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="Part2My">
          <div className="FakeDivNew"></div>
          <div className="ButtonBack">
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
          <div className="ContentMyCompanies">
            <div className="SearchMy">
              <div className="SearchPart">
                <input
                  type="search"
                  placeholder="Search for Companies"
                  className="TextPartInput"
                  onChange={handleSearch}
                ></input>
                <span className="SvgPart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3547 12.9681C8.67003 15.0575 4.78756 14.869 2.31969 12.4011C-0.352547 9.72885 -0.352769 5.39584 2.31969 2.72338C4.99215 0.0509178 9.32517 0.0511395 11.9974 2.72338C14.4653 5.19124 14.6538 9.07371 12.5645 11.7584L15.6265 14.8205C15.7872 14.9812 15.8712 15.1902 15.8766 15.3998C15.8832 15.6271 15.8001 15.8567 15.6265 16.0302C15.2925 16.3643 14.7512 16.3646 14.4168 16.0302L11.3547 12.9681ZM10.7877 3.93309C12.7925 5.93786 12.792 9.18705 10.7877 11.1914C8.78336 13.1957 5.53418 13.1961 3.52941 11.1914C1.52464 9.18661 1.52508 5.93742 3.52941 3.93309C5.53373 1.92877 8.78292 1.92832 10.7877 3.93309Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="ButtonPart">
                <Button
                  variant="filled"
                  color="#388E3C"
                  onClick={() => handleSortBy("CreateDate")}
                >
                  New
                </Button>
                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  onClick={() => handleSortBy("CreateDate")}
                >
                  Date
                </Button>
                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  onClick={() => handleSortBy("Rate")}
                >
                  Rate
                </Button>
              </div>
            </div>
            <div className="Part3My">
              {dummyCompanies &&
                dummyCompanies?.map((company, index) => (
                  <MyCompaniesCard
                    key={index}
                    colorProp={receivedData}
                    Company_id={company._id}
                    CompanyName={company.CompanyName}
                    CompanyDescription={company.CompanyDescription}
                    Rate={company.Rate}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanies;
