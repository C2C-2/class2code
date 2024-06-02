import "./LightMyCompanies.css";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Textarea, TextInput } from "@mantine/core";
import MyCompaniesCard from "../../../components/MyCompaniesCard/MyCompaniesCard";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const GET_USER_COMPANIES = gql`
  query MyCompanies($userId: String!) {
    getUser(userId: $userId) {
      MyCompanies {
        _id
        CompanyName
        CompanyDescription
        Rate
      }
    }
  }
`;
const GET_USER_COMPANIES_Filter = gql`
  query FilterMyCompanies(
    $userId: String!
    $filterType: String
    $desc: Boolean
  ) {
    filterMyCompanies(userId: $userId, filterType: $filterType, desc: $desc) {
      _id
      CreateDate
      Rate
      CompanyName
      CompanyDescription
    }
  }
`;
const SEARCH_IN_MY_COMPANIES = gql`
  query SearchInMyCompanies($userId: String!, $word: String!) {
    searchInMyCompanies(userId: $userId, word: $word) {
      _id
      CompanyName
      CompanyDescription
      Rate
    }
  }
`;

const CREATE_COMPANY = gql`
  mutation Mutation($company: CompanyInput!, $userId: String!) {
    createNewCompany(company: $company, userId: $userId) {
      _id
    }
  }
`;
function MyCompanies() {
  const [filterType, setFilterType] = useState("");
  const [descRate, SetRateDesc] = useState(false);
  const [descDate, SetDateDesc] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const user_id = localStorage.getItem("id");
  const [companies, setCompanies] = useState([]);
  const [CompanyDescription, setCompanyDescription] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Domain, setDomain] = useState("");

  const navigate = useNavigate();

  const { data: companiesData, refetch: refetchCompanies } = useQuery(
    GET_USER_COMPANIES,
    {
      variables: { userId: user_id },
    }
  );

  const [filterCompanies, { data: filteredData }] = useLazyQuery(
    GET_USER_COMPANIES_Filter
  );

  useEffect(() => {
    if (companiesData) {
      console.log(companiesData.getUser.MyCompanies);
      setCompanies(companiesData?.getUser?.MyCompanies);
    }
  }, [companiesData]);

  useEffect(() => {
    if (filteredData) {
      setCompanies(filteredData?.filterMyCompanies);
    }
  }, [filteredData]);

  const [search, { data: searchData }] = useLazyQuery(SEARCH_IN_MY_COMPANIES);

  useEffect(() => {
    if (searchData) {
      setCompanies(searchData?.searchInMyCompanies);
    }
  }, [searchData]);

  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: () => {
      refetchCompanies();
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="SearchMy">
              <div className="PostsSearchPart">
                <Button
                  justify="center"
                  variant="filled"
                  color="#283739"
                  radius="md"
                  onClick={() => {
                    navigate(-1);
                  }}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    search({
                      variables: { userId: user_id, word: searchWord },
                    });
                    setCompanies(searchData?.searchInMyCompanies);
                  }}
                  className="SearchPartShowAllPosts"
                >
                  <Input
                    type="text"
                    placeholder="Search for Posts"
                    className={"TextPartShowAllPosts"}
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    radius="md"
                  ></Input>
                  <Button
                    type="submit"
                    variant="filled"
                    color="green"
                    radius="md"
                  >
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
                  </Button>
                </form>
              </div>
              <div className="ButtonPart">
                <div>
                  <Modal
                    xOffset={"30%"}
                    yOffset={"8%"}
                    padding={"xl"}
                    size={"lg"}
                    opened={opened}
                    onClose={close}
                    title="Create New Company"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createCompany({
                          variables: {
                            company: {
                              CompanyName,
                              Domain,
                              CompanyDescription,
                            },
                            userId: user_id,
                          },
                        });
                        close();
                        setCompanyName("");
                        setDomain("");
                        setCompanyDescription("");
                      }}
                    >
                      <TextInput
                        label="Company Name"
                        placeholder="Abu Dhabi"
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                        }}
                        value={CompanyName}
                        required
                      />
                      <br />
                      <TextInput
                        label="Domain"
                        placeholder="Shopping"
                        onChange={(e) => {
                          setDomain(e.target.value);
                        }}
                        value={Domain}
                        required
                      />
                      <br />
                      <Textarea
                        label="Description"
                        placeholder="Enter Description"
                        onChange={(e) => {
                          setCompanyDescription(e.target.value);
                        }}
                        value={CompanyDescription}
                        required
                      />

                      <br />
                      <div className="w-100 d-flex justify-content-end">
                        <Button type="submit" variant="filled" color="#388E3C">
                          Create
                        </Button>
                      </div>
                    </form>
                  </Modal>

                  <Button onClick={open} variant="filled" color="#388E3C">
                    New
                  </Button>
                </div>

                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  onClick={() => {
                    filterCompanies({
                      variables: {
                        userId: user_id,
                        filterType: "CreateDate",
                        desc: !descDate,
                      },
                    });
                    SetDateDesc(!descDate);
                  }}
                  rightSection={descDate ? <FaArrowUp /> : <FaArrowDown />}
                >
                  Date
                </Button>
                <Button
                  variant="filled"
                  c="black"
                  color="rgba(222, 224, 222, 1)"
                  onClick={() => {
                    filterCompanies({
                      variables: {
                        userId: user_id,
                        filterType: "Rate",
                        desc: !descRate,
                      },
                    });
                    SetRateDesc(() => !descRate);
                  }}
                  rightSection={descRate ? <FaArrowUp /> : <FaArrowDown />}
                >
                  Rate
                </Button>
              </div>
            </div>
            <div className="Part3My">
              {companies?.map((company) => {
                return (
                  <MyCompaniesCard
                    key={company?._id}
                    Company_id={company?._id}
                    CompanyName={company?.CompanyName}
                    CompanyDescription={company?.CompanyDescription}
                    Rate={company?.Rate || 0}
                    refetchCompanies={refetchCompanies}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanies;
