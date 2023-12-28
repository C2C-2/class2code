import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { SideBar } from "./User/Features/AI Chat/Compnents/SideBar/SideBar";
import { Main } from "./User/Features/AI Chat/Compnents/Main/Main";
import { AIChat } from "./User/Features/AI Chat/AIChat";

function App() {
  return <MantineProvider>
     {/* <SideBar/> 
    <Main/> */}
    <AIChat/>
  </MantineProvider>;
}

export default App;
