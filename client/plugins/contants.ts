import DarkSeaMarketABI from "./contract-abi/DarkSeaMarket.json";
import DarkForestABI from "./contract-abi/DarkForest.json";

export const MARKET_CONTRACT_ADDRESS =
  "0xbf54A070E443890074C4aEE9E4666BC4b94519eB"; //round3-test3
  // "0x41ED5eA4478C9947cE513BEFE9dC6a3625119D94";
// "0x3775d393bB86EBcBB3307f1f7055221BE4cDC14a"; //round3-test2
// "0x384C8B28fed42F76c903f503ba85f0703a8B8774";
// "0x048493E78Ea89f60088e7fEdE47F694b23ad87DE";
// df.ethConnection.getProvider().network.chainId == 300 ? "0x06187833f809E41511A68276369B72C480adA113" : "0x4F3Dce4014f804c313d9c28B513C99e40316Bd11";

export const TOKENS_CONTRACT_ADDRESS =
  "0xa0e198cbd1b5f8749f57aa8d60a8660d23b96957"; //round3
// "0xb987b301559f579d3384e31e4c2fd3afe5ac687f"; //round3-test3
// "0xc2eed1adaae36b640f64c06fef8cd32f7473afaa";
// "0x168037e0651820690c6952Cbb89ED29716B276AE"; //round3-test2
// "0x500cf53555c09948f4345594f9523e7b444cd67e";
// "0x0560D24fE3dAdEb0E217a19b7b5e310DB7A76308"; //round3-test1
// "0x9d8ef472b01566e8d88ea7f2438e9542032d300e"; //round3-test
// export const TOKENS_CONTRACT_ADDRESS : string = df.contractsAPI.contractAddress || "0x621ce133521c3B1cf11C0b9423406F01835af0ee";

export const TOKENS_APPROVAL_ABI = DarkForestABI;
// [
//   {
//     type: "function",
//     stateMutability: "nonpayable",
//     outputs: [],
//     name: "setApprovalForAll",
//     inputs: [
//       { internalType: "address", name: "operator", type: "address" },
//       { internalType: "bool", name: "approved", type: "bool" },
//     ],
//   },
//   {
//     type: "function",
//     stateMutability: "view",
//     payable: false,
//     outputs: [{ type: "bool", name: "", internalType: "bool" }],
//     name: "isApprovedForAll",
//     inputs: [
//       { type: "address", name: "owner", internalType: "address" },
//       { type: "address", name: "operator", internalType: "address" },
//     ],
//     constant: true,
//   },
// ];

export const REFRESH_INTERVAL = 20000;

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
//@ts-expect-error
export const own = df.getAccount();
//@ts-expect-error
export const notifyManager = df.getNotificationsManager();
//@ts-expect-error
export const isGameAdmin =
  own.toLowerCase() === df.contractConstants.adminAddress.toLowerCase();
const officialRound = [
  "0x8e7Fc9c67Cf2bc5D001682d17355dc5c7f41e4C1",
  "0x5da117b8aB8b739346F5EdC166789E5aFb1a7145",
];
export const isOfficialRound =
  officialRound.indexOf(TOKENS_CONTRACT_ADDRESS) > -1;

export const MARKET_CONTRACT_ABI = DarkSeaMarketABI;
