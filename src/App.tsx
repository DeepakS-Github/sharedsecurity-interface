import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./components/Navigation/SideBar";
import { RecoilRoot } from "recoil";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Box, Divider, Flex } from "@chakra-ui/react";
import Overwiew from "./pages/Overwiew";
import Aez from "./pages/Aez";
import Governance from "./pages/Governance";
import Assets from "./pages/Assets";
import Validators from "./pages/Validators";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Flex className="App">
          <SideBar />
          {/* <Divider orientation="vertical" /> */}
          <Box
            maxH={"100vh"}
            overflowY={"scroll"}
            px={"50px"}
            mt={"20px"}
            flex={"1"}
          >
            <Routes>
              <Route path="/" element={<Overwiew />} />
              <Route path="/aez" element={<Aez />} />
              <Route path="/gov" element={<Governance />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/validators" element={<Validators />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
      <Header />
    </RecoilRoot>
  );
}

export default App;
