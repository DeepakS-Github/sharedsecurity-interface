import "./App.css";
import SideBar from "./components/Navigation/SideBar";
import { RecoilRoot } from "recoil";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Overwiew from "./pages/Overwiew";
import Aez from "./pages/Aez";
import Governance from "./pages/Governance";
import Assets from "./pages/Assets";
import Validators from "./pages/Validators";
import Proposal from "./pages/Proposal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Flex className="App">
          <SideBar />
          {/* <Divider orientation="vertical" /> */}
          <Box
            maxH={"100vh"}
            overflowY={"scroll"}
            p={"50px"}
            mt={"20px"}
            flex={"1"}
          >
            <Routes>
              <Route path="/overview" element={<Overwiew />} />
              <Route path="/aez" element={<Aez />} />
              <Route path="/gov" element={<Governance />} />
              <Route path="/gov/:chain/:proposalId" element={<Proposal />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/validators" element={<Validators />} />
              <Route path="/" element={<Navigate to="/overview" replace />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
      <Header />
      <ToastContainer style={{ textAlign: "left" }} />
    </RecoilRoot>
  );
}

export default App;
