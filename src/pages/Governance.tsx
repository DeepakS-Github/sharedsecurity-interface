import { Box, Skeleton } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";
import { vpList } from "../utils/constant";
import InfoSection from "../components/Governance/InfoSection";
import OpSection from "../components/Governance/OpSection";
import { useCosmosGovQuery } from "../hooks/chains/cosmos/useCosmosGovQuery";
import { useEffect, useRef, useState } from "react";
import { ILpCardProps } from "../components/Governance/LpCard";
import { useNeutronGovQuery } from "../hooks/chains/neutron/useNeutronGovQuery";
import { useStrideGovQuery } from "../hooks/chains/stride/useStrideGovQuery";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { proposalsState } from "../context/proposalsState";
import { compareProposals } from "../utils/common";

const Governance = () => {
  const [loading, setLoading] = useState(false);
  const { getLpList, getOpList, getCosmosVotingPower } = useCosmosGovQuery();
  const { getNeutronLpList, getNeutronOpList } = useNeutronGovQuery();
  const { getStrideLpList, getStrideOpList } = useStrideGovQuery();
  const neutronLpList = useRef<ILpCardProps[]>([]);
  const neutronOpList = useRef<ILpCardProps[]>([]);
  const strideLpList = useRef<ILpCardProps[]>([]);
  const strideOpList = useRef<ILpCardProps[]>([]);
  const { sortedLpList, sortedOpList, userVotingPower } =
    useRecoilValue(proposalsState);
  const setAllProposals = useSetRecoilState(proposalsState);

  useEffect(() => {
    if (!sortedLpList?.length || !sortedOpList?.length) fetchAllProposalsList();
  }, []);

  const fetchAllProposalsList = async () => {
    setLoading(true);
    const lpList = await getLpList();
    // setAllProposals((prev) => {
    //   return {
    //     ...prev,
    //     sortedLpList: [...prev.sortedLpList, ...lpList],
    //   };
    // });
    neutronLpList.current = await getNeutronLpList();
    strideLpList.current = await getStrideLpList();
    const opList = await getOpList();
    neutronOpList.current = await getNeutronOpList();
    strideOpList.current = await getStrideOpList();
    const updatedState = {
      userVotingPower,
      sortedLpList: [
        ...neutronLpList.current,
        ...lpList,
        ...strideLpList.current,
      ].sort(compareProposals),
      sortedOpList: [
        ...neutronOpList.current,
        ...opList,
        ...strideOpList.current,
      ].sort(compareProposals),
    };
    setAllProposals(updatedState);
    setLoading(false);
  };

  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} isLoading={loading} />
        <LpSection isLoading={loading} lpList={sortedLpList} />
        <InfoSection />
        <OpSection isLoading={loading} opList={sortedOpList} />
      </Box>
    </Box>
  );
};

export default Governance;
