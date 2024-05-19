import "./UserTask.css";
import { Button, Modal, Textarea, TextInput, Table } from "@mantine/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";

const GET_TASK_USER = gql`
query GetUser($userId: String!) {
    getUser(userId: $userId) {
      WorkCompanies {
        Teams {
          Tasks {
            CompanyName
            EndDate
            TaskName
            TaskStatus
            TeamName
            Comments
          }
        }
      }
    }
  }
`;

export const UserTask = () => {
  const navigation = useNavigate();
  const user_id = localStorage.getItem("id");
  const { team_id, company_id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Open");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState("");
  const [priority, setPriority] = useState();
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const {
    loading: loadingTeams,
    error: errorTeams,
    data: dataTeams,
  } = useQuery(GET_TASK_USER, {
    variables: { userId: user_id},
  });

  useEffect(() => {
    if (dataTeams) {
      setTaskName(dataTeams?.getTeam?.TaskName);
      setTaskStatus(dataTeams?.getTeam?.TaskStatus);
      setComments(dataTeams?.getTeam?.Comments);
      setEndDate(dataTeams?.getTeam?.EndDate);
    }
  }, [dataTeams]);

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="EditMyCompaniesContentData">
              <Button
                w={"fit-content"}
                justify="center"
                variant="filled"
                color="#283739"
                radius="md"
                size="lg"
                h={70}
                onClick={() => navigation(-1)}
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
              <div className="DashboardUnderPart2 pt-5">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Deadline</Table.Th>
                      <Table.Th>Team</Table.Th>
                      <Table.Th>Company</Table.Th>
                      <Table.Th>Status</Table.Th>

                      <Table.Th className="d-flex  w-50 justify-content-center">
                        Actions
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {dataTeams?.getTeam?.Tasks.map((task, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{task?.TaskName}</Table.Td>
                        <Table.Td>
                          <div className="TableDesign">
                            <span className="TableDesignText1 justify-content-center">
                              IN {task?.EndDate}
                            </span>
                          </div>
                        </Table.Td>
                        <Table.Td>{dataTeams?.getTeam?.TeamName}</Table.Td>
                        <Table.Td>{task?.CompanyName}</Table.Td>
                        <Table.Td>{task?.TaskStatus}</Table.Td>
                        <Table.Td className="d-flex gap-2">
                          
                        
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
