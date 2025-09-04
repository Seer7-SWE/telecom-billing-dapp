import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
 // written by deploy script

import { ethers } from "ethers";

const Web3Ctx = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
    }
  }, []);

  const connect = async () => {
    if (!provider) return;
    const accs = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setSigner(signer);
    setAccount(ethers.getAddress(accs[0]));
    const c = new ethers.Contract(contracts.TELCO_ADDRESS, ABI, signer);
    setContract(c);
  };

  const disconnect = () => {
    setAccount(null);
    setSigner(null);
    setContract(null);
  };

  const value = useMemo(() => ({ account, provider, signer, contract, connect, disconnect }), [account, provider, signer, contract]);
  return <Web3Ctx.Provider value={value}>{children}</Web3Ctx.Provider>;
}

export const useWeb3 = () => useContext(Web3Ctx);
