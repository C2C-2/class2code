import { AppShell } from "@mantine/core";
import { SideBar } from "../../../pages/User/AI Chat/Components/SideBar/SideBar";
// import { Main } from './Compnents/Main/Main'
import { Main2 } from "../../../pages/User/AI Chat/Components/Main2/Main2";

export const AIChat = () => {
  return (
    <AppShell>
      <AppShell.Navbar>
        <SideBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Main2 />
      </AppShell.Main>
    </AppShell>
  );
};
