import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Ss from "./pages/SecondSignup/Ss";
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <MantineProvider>
        <Ss />
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
