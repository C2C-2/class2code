import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import './App.css'

import SecondSignup from "./pages/SecondSignup/SecondSignup";
import SignUpFigma from "./pages/SignUp/SignUpFigma";
import LogInFigma from "./pages/LogIn/Login";
import AIChat from "./pages/AI Chat/AIChatDef/AIChat";
import MyCompanies from "./pages/CompanyPages/MyCompanies/MyCompanies";
import CompanyWorking from "./pages/CompanyPages/CompanyWorking/CompanyWorking";
import AvailableProjects from "./pages/ProjectPages/AvailableProjects/AvailableProjects";
import ShowAllPosts from "./pages/CompanyAdsPages/ShowAllPost/ShowAllPosts";
import EditTask from "./pages/TaskPages/EditTask/EditTask";
import ProjectPage from "./pages/ProjectPages/ProjectPage/ProjectPage";
import CreateTeam from "./pages/TeamPages/CreateTeam/CreateTeam";
import CreateTask from "./pages/TaskPages/CreateTask/CreateTask";
import TaskPage from "./pages/TaskPages/TaskPage/TaskPage";
import MyCompanyTask from "./pages/TaskPages/MyCompanyTask/MyCompanyTask";
import Dashboard from "./pages/OtherPages/Dashboard/Dashboard";
import NotFound from "./pages/OtherPages/NotFound/NotFound";
import ForgetPassword from "./pages/OtherPages/ForgetPassword/ForgetPassword";
import EditPost from "./pages/CompanyAdsPages/EditPost/EditPost";
import EditTeam from "./pages/TeamPages/EditTeam/EditTeam";
import Chat from "./pages/chat/Chat";
import ContactUs from "./pages/OtherPages/ContactUs/ContactUs";
import FAQuestion from "./pages/OtherPages/FAQQuestion/FAQQuestion";
import MyPosts from "./pages/CompanyAdsPages/ShowMyPost/ShowMyPost";
import OtherCompanyProfile from "./pages/CompanyPages/OtherCompanyProfile/OtherCompanyProfile";
import EditMyCompanyProfile from "./pages/CompanyPages/EditMyCompanyProfile/EditMyCompanyProfile";
import { Paths } from "./assets/Paths";
import UserProfile from "./pages/UserPages/UserProfile/UserProfile";
import EditPassword from "./pages/OtherPages/EditPassword/EditPassword";
import EditEmail from "./pages/OtherPages/EditEmail/EditEmail";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Applys from "./pages/CompanyAdsPages/Applys/Applys";
import { TeamTask } from "./pages/TaskPages/TeamTasks/TeamTask";
import TeamUsers from "./pages/TeamPages/TeamUsers/TeamUsers";
import { UserTask } from "./pages/TaskPages/UserTasks/UserTask";
import { MyTasks } from "./pages/TaskPages/MyTasks/MyTasks";
import OtherUserProfile from "./pages/OtherPages/OtherUserProfile/OtherUserProfile";
import TeamUsersOthers from "./pages/TeamPages/TeamUsersOthers/TeamUsersOthers";
import Lodaer from "./components/Lodaer/Lodaer";
import { useEffect, useState } from "react";

const TokenChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation to check token
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the timeout as needed
  }, []);

  if (loading) {
    return <Lodaer />;
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/LogIn" />;
  }

  return (
    <>
      <NavBar />
      <SideBar />
      {children}
    </>
  );
};

const TokenChecker2 = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/LogIn" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.Login} element={<LogInFigma />} />
          <Route path={Paths.SignUpFigma} element={<SignUpFigma />} />
          <Route path={Paths.ForgetPassword} element={<ForgetPassword />} />
          <Route path={Paths.Home} element={<Home />} />

          <Route
            path={Paths.TeamUsersOthers + "/:team_id"}
            element={
              <TokenChecker>
                <TeamUsersOthers />
              </TokenChecker>
            }
          />

          <Route
            path={Paths.Applys + "/:companyId/:id"}
            element={
              <TokenChecker>
                <Applys />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.OtherUserProfile + "/:user_id"}
            element={
              <TokenChecker>
                <OtherUserProfile />
              </TokenChecker>
            }
          />

          <Route
            path={`${Paths.UserTasks}/:company_id/:team_id/:id`}
            element={
              <TokenChecker>
                <UserTask />
              </TokenChecker>
            }
          />

          <Route
            path={`${Paths.TeamUsers}/:company_id/:id`}
            element={
              <TokenChecker>
                <TeamUsers />
              </TokenChecker>
            }
          />

          <Route
            path={Paths.ContactUs}
            element={
              <TokenChecker>
                <ContactUs />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.MyPosts}
            element={
              <TokenChecker>
                <MyPosts />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.AIChat}
            element={
              <TokenChecker2>
                <AIChat />
              </TokenChecker2>
            }
          />
          <Route
            path={Paths.FAQuestion}
            element={
              <TokenChecker>
                <FAQuestion />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.Dashboard}
            element={
              <TokenChecker>
                <Dashboard />
              </TokenChecker>
            }
          />

          <Route path="/" element={<Home />} />
          <Route
            path={Paths.AvailableProject}
            element={
              <TokenChecker>
                <AvailableProjects />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.Posts}
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
            path={Paths.UserProfile}
            element={
              <TokenChecker>
                <UserProfile />
              </TokenChecker>
            }
          />
          <Route
            path={Paths?.EditPassword}
            element={
              <TokenChecker>
                <EditPassword />
              </TokenChecker>
            }
          />
          <Route
            path={Paths?.EditEmail}
            element={
              <TokenChecker>
                <EditEmail />
              </TokenChecker>
            }
          />
          <Route
            path="/CreateTeam"
            element={
              <TokenChecker>
                <CreateTeam />
              </TokenChecker>
            }
          />
          <Route
            path="/CreateTask"
            element={
              <TokenChecker>
                <CreateTask />
              </TokenChecker>
            }
          />
          <Route
            path="/EditPost"
            element={
              <TokenChecker>
                <EditPost />
              </TokenChecker>
            }
          />

          <Route
            path="/EditTask/:task_id"
            element={
              <TokenChecker>
                <EditTask />
              </TokenChecker>
            }
          />
          <Route
            path="/NewTasksUser"
            element={
              <TokenChecker>
                <MyTasks />
              </TokenChecker>
            }
          />
          <Route
            path="/TeamTasks/:team_id/company/:company_id"
            element={
              <TokenChecker>
                <TeamTask />
              </TokenChecker>
            }
          />
          <Route
            path="/EditTeam/:teamId"
            element={
              <TokenChecker>
                <EditTeam />
              </TokenChecker>
            }
          />
          <Route
            path="/ProjectPage/:projectId"
            element={
              <TokenChecker>
                <ProjectPage />
              </TokenChecker>
            }
          />
          <Route
            path="/TaskPage/:task_id"
            element={
              <TokenChecker>
                <TaskPage />
              </TokenChecker>
            }
          />
          <Route
            path="/MyCompanies"
            element={
              <TokenChecker>
                <MyCompanies />
              </TokenChecker>
            }
          />
          <Route
            path="/CompanyWorkingWith"
            element={
              <TokenChecker>
                <CompanyWorking />
              </TokenChecker>
            }
          />
          <Route
            path="/MyCompanyTask"
            element={
              <TokenChecker>
                <MyCompanyTask />
              </TokenChecker>
            }
          />
          <Route
            path={`${Paths.OtherCompanyProfile}/:company_id`}
            element={
              <TokenChecker>
                <OtherCompanyProfile />
              </TokenChecker>
            }
          />
          <Route
            path="/EditMyCompanyProfile/:company_id"
            element={
              <TokenChecker>
                <EditMyCompanyProfile />
              </TokenChecker>
            }
          />
          <Route
            path="/SecondSignup"
            element={
              <TokenChecker>
                <SecondSignup />
              </TokenChecker>
            }
          />
          <Route
            path="*"
            element={
              <TokenChecker>
                <NotFound />
              </TokenChecker>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
