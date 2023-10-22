import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import { useCosmosValidatorQuery } from "../../hooks/chains/cosmos/useCosmosValidatorQuery";
import CustomTable from "../DataDisplay/CustomTable";
import { Center, Grid, Spinner } from "@chakra-ui/react";

const ValidatorsList = () => {
  const { getParsedActiveValidators } = useCosmosValidatorQuery();
  const [activeValidators, setActiveValidators] = useState<any[]>([]);

  useEffect(() => {
    fetchValidators();
  }, []);

  const fetchValidators = async () => {
    const list = await getParsedActiveValidators();
    setActiveValidators(list);
    console.log(list);
  };

  return (
    <Section
      heading="Validators"
      sideText={`${activeValidators.length}/${activeValidators.length}`}
    >
      <Grid></Grid>
      {activeValidators && activeValidators.length ? (
        <CustomTable
          keys={activeValidators && Object.keys(activeValidators[0])}
          data={activeValidators}
          minGridWidth="80px"
          maxGridWidth="100px"
          gridColumnGap="0px"
          pagination={true}
          itemsPerPage={20}
        />
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </Section>
  );
};

export default ValidatorsList;
