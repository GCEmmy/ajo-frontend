import ajoAbi from "./ajo-abi.json";

export const AJO_CONTRACT_ADDRESS = "0x0e0c2a17D52B9304680A38c00E77dB409Ed99988";

export const ajoContract = {
  address: AJO_CONTRACT_ADDRESS as `0x${string}`,
  abi: ajoAbi,
} as const;
