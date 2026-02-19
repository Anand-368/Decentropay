import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import PaymentGatewayUtils from '../utils/PaymentGateway.json';

const PAYMENT_GATEWAY_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('0.0');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          window.location.reload();
        } else {
          setAccount(null);
          setContract(null);
          setBalance('0.0');
          setTransactions([]);
        }
      });
    }
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        setAccount(accounts[0]);
        await initContract(ethereum, accounts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast.error('Please install MetaMask!');
        throw new Error('Please install MetaMask!');
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await initContract(ethereum, accounts[0]);
      toast.success('Wallet connected!');
      return true;
    } catch (err) {
      if (err?.message !== 'Please install MetaMask!') {
        toast.error(err?.message || 'Failed to connect');
      }
      throw err;
    }
  };

  const initContract = async (ethereum, currentAccount) => {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const paymentGatewayContract = new ethers.Contract(
        PAYMENT_GATEWAY_ADDRESS,
        PaymentGatewayUtils.abi,
        signer
      );
      setContract(paymentGatewayContract);
      const bal = await provider.getBalance(currentAccount);
      setBalance(ethers.formatEther(bal).substring(0, 6));
      await fetchTransactions(paymentGatewayContract);
    } catch (err) {
      console.error('Error initializing contract:', err);
    }
  };

  const fetchTransactions = async (contractInstance) => {
    try {
      const txs = await contractInstance.getAllTransactions();
      const formatted = txs.map((tx) => ({
        from: tx.from,
        to: tx.to,
        amount: ethers.formatEther(tx.amount),
        message: tx.message,
        timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
      }));
      setTransactions(formatted.reverse());
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const refreshBalance = async () => {
    if (!account || !window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const bal = await provider.getBalance(account);
    setBalance(ethers.formatEther(bal).substring(0, 6));
  };

  const value = {
    account,
    contract,
    balance,
    transactions,
    loading,
    setLoading,
    connectWallet,
    fetchTransactions,
    refreshBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
