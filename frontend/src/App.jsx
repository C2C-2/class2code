import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
<<<<<<< HEAD
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SecondSignup from "./pages/SecondSignup/SecondSignup";
=======
import { SideBar } from "./User/Features/AI Chat/Compnents/SideBar/SideBar";
import { Main } from "./User/Features/AI Chat/Compnents/Main/Main";
import { AIChat } from "./User/Features/AI Chat/AIChat";
import { LogIn } from "./User/Features/AI Chat/Compnents/Login/LogIn";
import SignUp from "./User/Features/AI Chat/Compnents/Signup/SignUp";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
>>>>>>> f7568075f3063d67c612900812de50f8ef8446e5
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <MantineProvider>
<<<<<<< HEAD
        <SecondSignup/>
=======
        {/* <SideBar/> 
         <Main/> */}
        {/* <AIChat /> */}
        {/* <LogIn></LogIn> */}
        <SignUp />
>>>>>>> f7568075f3063d67c612900812de50f8ef8446e5
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
