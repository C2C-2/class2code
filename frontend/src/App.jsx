import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { SideBar } from "./User/Features/AI Chat/Compnents/SideBar/SideBar";
import { Main } from "./User/Features/AI Chat/Compnents/Main/Main";
import { AIChat } from "./User/Features/AI Chat/AIChat";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <MantineProvider>
        {/* <SideBar/> 
         <Main/> */}
        <AIChat />
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
