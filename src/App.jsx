import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./containers/TopBarComponent/TopBarComponent";
import Client from "./containers/Client/Client";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBarComponent from "./containers/SideBarComponent/SideBarComponent";
import Form from "./containers/Form/Form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Themes";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <div className="app">
            <SideBarComponent isSidebar={isSidebar}/>
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/" element={<Client />} />
                <Route path="/form" element={<Form />} />
              </Routes>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
