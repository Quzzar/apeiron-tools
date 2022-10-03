import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  Center,
  MediaQuery,
} from '@mantine/core';
import { Planet } from 'tabler-icons-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Josefin Sans, sans-serif',
      }}
      withGlobalStyles
      withNormalizeCSS
    >

      <AppShell
        fixed
        navbar={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar width={{ sm: 100, lg: 200 }} styles={{ root: { border: '0px' } }}>
            </Navbar>
          </MediaQuery>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside width={{ sm: 100, lg: 200 }} styles={{ root: { border: '0px' } }}>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={40} p="md" styles={{ root: { border: '0px' } }}>

            <Center>
              <Text color="dimmed" style={{ lineHeight: '1px', fontStyle: 'italic' }}>
                Developed by Quzzar
              </Text>
            </Center>

          </Footer>
        }
        header={
          <Header height={70} p="md" styles={{ root: { border: '0px' } }}>

            <Center>
              <Text pr='sm'>
                <Planet size={40} />
              </Text>
              <Text weight={700} style={{ fontSize: '2.1em', whiteSpace: 'nowrap' }}>Space Campaign Calculations</Text>
            </Center>

          </Header>
        }
      >

        <App />

      </AppShell>


    </MantineProvider>

  </React.StrictMode>
)
