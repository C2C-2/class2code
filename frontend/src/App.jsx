import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
<<<<<<< HEAD
import SecondSignup from "./pages/SecondSignup/SecondSignup"
import SignUpFigma from "./pages/SignUp/SignUpFigma";
import LogInFigma from "./pages/LogIn/LogInFigma";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import AIChat from "./pages/AI Chat/AIChatDef/AIChat";
import SideBarAI from "./components/SideBarAI/SideBarAI";
import NavBarAI from "./components/NavBarAI/NavBarAI";
import AIChatResponse from "./pages/AI Chat/AIChatResponse/AIChatResponse";
import MyCompanies from "./pages/CompanyPages/MyCompanies/MyCompanies";
import MyCompaniesCard from "./components/MyCompaniesCard/MyCompaniesCard";
import OtherCompanyProfile from "./pages/CompanyPages/OtherCompanyProfile/OtherCompanyProfile";
import CommentComp from "./components/Comments/CommentComp";
import CreateCompany from "./pages/CompanyPages/CreateCompany/CreateCompany";
import MyCompanyProfile from "./pages/CompanyPages/MyComanyProfile/MyCompanyProfile";
import CompanyWorking from "./components/CompanyWorkingCard/CompanyWorking";
import AvailableProjectsCard from "./components/AvailableProjectsCard/AvailableProjectsCard";
import EditMyCompanyProfile from "./pages/CompanyPages/EditMyCompanyProfile/EditMyCompanyProfile";
import AvailableProjects from "./pages/ProjectPages/AvailableProjects/AvailableProjects";
import TrainPage from "./pages/ProjectPages/TrainPage/TrainPage";
import PostsCard from "./components/PostsCard/PostsCard";
import ShowAllPosts from "./pages/CompanyAdsPages/ShowAllPost/ShowAllPosts";
import AddPost from "./pages/CompanyAdsPages/AddPosts/AddPost";
import ShowMyPost from "./pages/CompanyAdsPages/ShowMyPost/ShowMyPost";
import ProjectPage from "./pages/ProjectPages/ProjectPage/ProjectPage";
import CreateTeam from "./pages/TeamPages/CreateTeam/CreateTeam";
import MyCompaniesTeamsCard from "./components/MyCompaniesTeamsCard/MyCompaniesTeamsCard"
import MyCompaniesTeams from "./pages/TeamPages/MyCompaniesTeams/MyCompaniesTeams";
import CreateTask from "./pages/TaskPages/CreateTask/CreateTask";
import TaskPage from "./pages/TaskPages/TaskPage/TaskPage";
import MyCompanyTask from "./pages/TaskPages/MyCompanyTask/MyCompanyTask";
import MyCompanyTaskCard from "./components/MyCompanyTaskCard/MyCompanyTaskCard";
import Dashboard from "./pages/OtherPages/Dashboard/Dashboard"
import NotFound from "./pages/OtherPages/NotFound/NotFound";
import ForgetPassword from "./pages/OtherPages/ForgetPassword/ForgetPassword";
import ContactUs from "./pages/OtherPages/ContactUs/ContactUs";
import HomePage1 from "./pages/OtherPages/Home/HomePage1/HomePage1";
import HomePage2 from "./pages/OtherPages/Home/HomePage2/HomePage2";
import HomePage from "./pages/OtherPages/Home/HomePage";
import FAQQuestion from "./pages/OtherPages/FAQQuestion/FAQQuestion";
import LightDarkMode from "./components/NavBar/Light_DarkMode/LightDarkMode";

import Chat from "./pages/chat/Chat";
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <MantineProvider>

        {/* <AIChat/> */}
        {/* <ShowAllPosts/> */}
        {/* <AddPost/> */}
        {/* <ShowMyPost/> */}
        {/* <ProjectPage/> */}
        {/* <AIChatResponse/> */}
        {/* <CreateTeam/> */}
        {/* <MyCompaniesTeams/> */}
        {/* <CreateTask/> */}
        {/* <TaskPage/> */}
        {/* <MyCompanyTask/> */}
        {/* <Dashboard/> */}
        {/* <NotFound/> */}
        {/* <ForgetPassword/> */}
        {/* <ContactUs/> */}
        {/* <HomePage1/> */}
        {/* <FAQQuestion/> */}
        {/* <HomePage2/> */}
        {/* <HomePage/> */}
        {/* <MyCompanies/> */}
        {/* <OtherCompanyProfile/> */}
        {/* <MyCompanyProfile/> */}
        {/* <EditMyCompanyProfile/> */}
        <AvailableProjects/>
        {/* <TrainPage/> */}
        {/* <SignUpFigma/> */}
        {/* <LogInFigma/> */}
        {/* <SecondSignup/> */}
        <Chat />
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
