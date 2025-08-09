import Web3 from "web3";
import ABI from "./ABI.json";

//This hash is only valid for this contract.
const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

export async function connectContract() {
  if (!window.ethereum) throw new Error("No wallet detected");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet detected or permission denied");

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
    from: accounts[0],
  });
}

export async function addLink({ url, linkId, feeInWei }) {
  const contract = await connectContract();

  return contract.methods.addLink(url, linkId, feeInWei).send();
}
