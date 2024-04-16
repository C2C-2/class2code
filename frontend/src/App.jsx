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
import ContactUs from "./pages/OtherPages/ContactUs/ContactUs";
import HomePage from "./pages/OtherPages/Home/HomePage";
import FAQQuestion from "./pages/OtherPages/FAQQuestion/FAQQuestion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPost from "./pages/CompanyAdsPages/EditPost/EditPost";
import EditTeam from "./pages/TeamPages/EditTeam/EditTeam";
import Chat from "./pages/chat/Chat";
import { useEffect, useState } from "react";
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
            <Route path={Paths.Login} element={<LogInFigma />} />
            <Route path={Paths.SignUpFigma} element={<SignUpFigma />} />
            <Route
              path={Paths.Home}
              element={
                <TokenChecker>
                  <Dashboard />
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
            <Route path={Paths.Chat} element={<Chat />} />
            <Route
              path={Paths.MyCompaniesTeams}
              element={<MyCompaniesTeams />}
            />
            <Route path={Paths.CreateTeam} element={<CreateTeam />} />
            <Route path={Paths.CreateTask} element={<CreateTask />} />
            <Route path={Paths.AddPost} element={<AddPost />} />
            <Route path={Paths.EditPost} element={<EditPost />} />
            <Route path={Paths.EditTask} element={<EditTask />} />
            <Route path={Paths.EditTeam} element={<EditTeam />} />
            <Route path={Paths.ProjectPage} element={<ProjectPage />} />
            <Route path={Paths.TaskPage} element={<TaskPage />} />
            <Route
              path={Paths.TeamsWorkingWith}
              element={<MyCompaniesTeams />}
            />
            <Route path={Paths.CreateCompany} element={<CreateCompany />} />
            <Route path={Paths.MyCompanies} element={<MyCompanies />} />
            <Route
              path={Paths.CompanyWorkingWith}
              element={<CompanyWorking />}
            />
            <Route path={Paths.MyCompanyTask} element={<MyCompanyTask />} />
            <Route path={Paths.ForgetPassword} element={<ForgetPassword />} />
            <Route path={Paths.NotFound} element={<NotFound />} />
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
