import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SecondSignup from "./pages/SecondSignup/SecondSignup";
import SignUpFigma from "./pages/SignUp/SignUpFigma";
import LogInFigma from "./pages/LogIn/Login";
import AIChat from "./pages/AI Chat/AIChatDef/AIChat";
import AIChatResponse from "./pages/AI Chat/AIChatResponse/AIChatResponse";
import MyCompanies from "./pages/CompanyPages/MyCompanies/MyCompanies";
import OtherCompanyProfile from "./pages/CompanyPages/OtherCompanyProfile/OtherCompanyProfile";
import CreateCompany from "./pages/CompanyPages/CreateCompany/CreateCompany";
import CompanyWorking from "./pages/CompanyPages/CompanyWorking/CompanyWorking";
import EditMyCompanyProfile from "./pages/CompanyPages/EditMyCompanyProfile/EditMyCompanyProfile";
import AvailableProjects from "./pages/ProjectPages/AvailableProjects/AvailableProjects";
import TrainPage from "./pages/ProjectPages/TrainPage/TrainPage";
import ShowAllPosts from "./pages/CompanyAdsPages/ShowAllPost/ShowAllPosts";
import AddPost from "./pages/CompanyAdsPages/AddPosts/AddPost";
import EditTask from "./pages/TaskPages/EditTask/EditTask";
import ShowMyPost from "./pages/CompanyAdsPages/ShowMyPost/ShowMyPost";
import ProjectPage from "./pages/ProjectPages/ProjectPage/ProjectPage";
import CreateTeam from "./pages/TeamPages/CreateTeam/CreateTeam";
import MyCompaniesTeams from "./pages/TeamPages/MyCompaniesTeams/MyCompaniesTeams";
import CreateTask from "./pages/TaskPages/CreateTask/CreateTask";
import TaskPage from "./pages/TaskPages/TaskPage/TaskPage";
import MyCompanyTask from "./pages/TaskPages/MyCompanyTask/MyCompanyTask";
import Dashboard from "./pages/OtherPages/Dashboard/Dashboard";
import NotFound from "./pages/OtherPages/NotFound/NotFound";
import ForgetPassword from "./pages/OtherPages/ForgetPassword/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPost from "./pages/CompanyAdsPages/EditPost/EditPost";
import EditTeam from "./pages/TeamPages/EditTeam/EditTeam";
import Chat from "./pages/chat/Chat";
import { Paths } from "./assets/Paths";
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path={Paths.Login} element={<LogInFigma />} />
            <Route path={Paths.SignUpFigma} element={<SignUpFigma />} />
            <Route
              path={Paths.Home}
              element={
                <TokenChecker>
                  <Dashboard />
                </TokenChecker>
              }
            /> */}
            <Route
              path={Paths.Home}
              element={
                // <TokenChecker>
                  <CompanyWorking />
                // </TokenChecker>
              }
            />
            {/* <Route
              path={Paths.AvailableProject}
              element={
                <TokenChecker>
                  <AvailableProjects />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.ShowAllPost}
              element={
                <TokenChecker>
                  <ShowAllPosts />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.Chat}
              element={
                <TokenChecker>
                  <Chat />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.MyCompaniesTeams}
              element={
                <TokenChecker>
                  <MyCompaniesTeams />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.CreateTeam}
              element={
                <TokenChecker>
                  <CreateTeam />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.CreateTask}
              element={
                <TokenChecker>
                  <CreateTask />
                </TokenChecker>
              }
            /> */}
            {/* <Route
              path={Paths.AddPost}
              element={
                <TokenChecker>
                  <AddPost />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.EditPost}
              element={
                <TokenChecker>
                  <EditPost />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.EditTask}
              element={
                <TokenChecker>
                  <EditTask />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.EditTeam}
              element={
                <TokenChecker>
                  <EditTeam />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.ProjectPage}
              element={
                <TokenChecker>
                  <ProjectPage />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.TaskPage}
              element={
                <TokenChecker>
                  <TaskPage />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.MyCompaniesTeams}
              element={
                <TokenChecker>
                  <MyCompaniesTeams />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.CreateCompany}
              element={
                <TokenChecker>
                  <CreateCompany />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.MyCompanies}
              element={
                <TokenChecker>
                  <MyCompanies />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.CompanyWorkingWith}
              element={
                <TokenChecker>
                  <CompanyWorking />
                </TokenChecker>
              }
            />
            <Route
              path={Paths.MyCompanyTask}
              element={
                <TokenChecker>
                  <MyCompanyTask />
                </TokenChecker>
              }
            />
            <Route path={Paths.ForgetPassword} element={<ForgetPassword />} />
            <Route path={Paths.NotFound} element={<NotFound />} />
            <Route
              path={Paths.SecondSignup}
              element={
                <TokenChecker>
                  <SecondSignup />
                </TokenChecker>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  );
}

const TokenChecker = ({ children }) => {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "null"
  ) {
    window.location.replace(Paths.Login);
  } else {
    return children;
  }
};

export default App;
