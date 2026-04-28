import ajoAbi from "./ajo-abi.json";

export const AJO_CONTRACT_ADDRESS = "0x9110C80Ab218b510940F83D7b5b791c894Cf1076";

export const ajoContract = {
  address: AJO_CONTRACT_ADDRESS as `0x${string}`,
  abi: ajoAbi,
} as const;
