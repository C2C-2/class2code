import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import SecondSignup from "./pages/SecondSignup/SecondSignup";
import SignUpFigma from "./pages/SignUp/SignUpFigma";
import LogInFigma from "./pages/LogIn/Login";
import AIChat from "./pages/AI Chat/AIChatDef/AIChat";
import MyCompanies from "./pages/CompanyPages/MyCompanies/MyCompanies";
import CreateCompany from "./pages/CompanyPages/CreateCompany/CreateCompany";
import CompanyWorking from "./pages/CompanyPages/CompanyWorking/CompanyWorking";
import AvailableProjects from "./pages/ProjectPages/AvailableProjects/AvailableProjects";
import ShowAllPosts from "./pages/CompanyAdsPages/ShowAllPost/ShowAllPosts";
import EditTask from "./pages/TaskPages/EditTask/EditTask";
import ProjectPage from "./pages/ProjectPages/ProjectPage/ProjectPage";
import CreateTeam from "./pages/TeamPages/CreateTeam/CreateTeam";
import MyCompaniesTeams from "./pages/TeamPages/MyCompaniesTeams/MyCompaniesTeams";
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
import EditEmail from "./pages/OtherPages/EditEmail/EditEmail"
const TokenChecker = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/LogIn" />;
  }
  return children;
};

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.Login} element={<LogInFigma />} />
          <Route path={Paths.SignUpFigma} element={<SignUpFigma />} />
          <Route path={Paths.ForgetPassword} element={<ForgetPassword />} />
          <Route
            path="/ContactUs"
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
              <TokenChecker>
                <AIChat />
              </TokenChecker>
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

          <Route
            path="/"
            element={
              <TokenChecker>
                <Dashboard />
              </TokenChecker>
            }
          />
          <Route
            path={Paths.AvailableProject}
            element={
              <TokenChecker>
                <AvailableProjects />
              </TokenChecker>
            }
          />
          <Route
            path="/Posts"
            element={
              <TokenChecker>
                <ShowAllPosts />
              </TokenChecker>
            }
          />
          <Route
            path="/Chat"
            element={
              <TokenChecker>
                <Chat />
              </TokenChecker>
            }
          />
           <Route
            path="/UserProfile"
            element={
              <TokenChecker>
                <UserProfile />
              </TokenChecker>
            }
          />
          <Route
            path="/MyCompaniesTeams"
            element={
              <TokenChecker>
                <MyCompaniesTeams />
              </TokenChecker>
            }
          />
           <Route
            path="/EditPassword"
            element={
              <TokenChecker>
                <EditPassword/>
              </TokenChecker>
            }
          />
            <Route
            path="/EditEmail"
            element={
              <TokenChecker>
                <EditEmail/>
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
            path="/TeamsWorkingWith"
            element={
              <TokenChecker>
                <MyCompaniesTeams />
              </TokenChecker>
            }
          />
          <Route
            path="/CreateCompany"
            element={
              <TokenChecker>
                <CreateCompany />
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
            path="/OtherCompanyProfile/:company_id"
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
