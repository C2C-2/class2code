import { AppShell } from '@mantine/core'
import React from 'react'
import { SideBar } from './Compnents/SideBar/SideBar'
// import { Main } from './Compnents/Main/Main'
import { Main2 } from './Compnents/Main2/Main2'

export const AIChat = () => {
  return (
<AppShell>
    <AppShell.Navbar>
        <SideBar/>
    </AppShell.Navbar>
    <AppShell.Main>
        <Main2/>
    </AppShell.Main>
</AppShell>
  )
}
