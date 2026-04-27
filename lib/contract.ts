import ajoAbi from "./ajo-abi.json";

export const AJO_CONTRACT_ADDRESS = "0x1fAFD044424bd16A028899C42D03d0Ea31A9Ebf1";

export const ajoContract = {
  address: AJO_CONTRACT_ADDRESS as `0x${string}`,
  abi: ajoAbi,
} as const;
