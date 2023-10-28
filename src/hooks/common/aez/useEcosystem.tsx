import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { coinConvert } from "../../../utils/common";
import axios from "axios";
import { toast } from "react-toastify";
import { StargateClient } from "@cosmjs/stargate";

export const useEcosystem = () => {
  const getAllCoinPrices = async (coinRegistry: any) => {
    let id = "";
    try {
      for (const token in coinRegistry) {
        id +=
          coinRegistry[token as keyof typeof coinRegistry].coingecko_id + "%2C";
      }

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );
      return response.data;
    } catch (error) {
      console.log(error);

      toast.error(`Request failed with message ${(error as Error).message}`);
    }
  };

  const getAllContractBalances = async (
    client: CosmWasmClient | undefined,
    coinRegistry: any,
    contractList: Array<any>
  ) => {
    type IConstractList = typeof contractList;
    // console.log(client, coinRegistry, contractList);

    try {
      let tvl = 0;
      const prices = await getAllCoinPrices(coinRegistry);
      console.log(prices);

      const stclient = await StargateClient.connect(
        "https://rpc-kralum.neutron-1.neutron.org"
      );

      //   const poolList = pairs;

      // Iterate through all the pair contracts
      for (const j in contractList) {
        let totalAmount = 0;

        //For every contract find the balance of each token
        let balances = await stclient.getAllBalances(
          contractList[j].contract_addr
        );
        console.log(j, balances);

        for (const i in balances) {
          const { amount, denom } = balances[i];

          console.log(j, i, totalAmount);

          //Convert it to decimal places
          const balanceInDenom = coinConvert(
            amount as string,
            coinRegistry[denom as keyof IConstractList].decimals,
            "human"
          );

          //Calculate the rate in usd
          const rateInUsd =
            prices[coinRegistry[denom as keyof IConstractList].coingecko_id]
              .usd;

          //Calculate the balance in usd
          const balanceInUsd = Number(balanceInDenom) * Number(rateInUsd);

          //Sum up the usd balances to get the total amount held by the contract.
          totalAmount = totalAmount + balanceInUsd;
        }
        console.log(contractList[j].contract_addr, totalAmount);
        //Sum up the total balances of each contract
        tvl += totalAmount;
      }
      console.log(tvl);
      return tvl;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCoinPrices, getAllContractBalances };
};
