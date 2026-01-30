import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { sendTransaction, getBalance } from '../utils/wallet';

function Send() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  const address = localStorage.getItem('originalAddress');

  useEffect(() => {
    if (address) {
      getBalance(address).then(setBalance);
    }
  }, [address]);

  const handleSend = async () => {
    if (!recipient) {
      showToast('Please enter a recipient address', 'error');
      return;
    }
    if (!recipient.startsWith('0x') || recipient.length !== 42) {
      showToast('Invalid Ethereum address', 'error');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      showToast('Insufficient balance', 'error');
      return;
    }

    setLoading(true);
    const result = await sendTransaction(recipient, amount);
    setLoading(false);

    if (result.success) {
      showToast('Transaction sent successfully!', 'success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      showToast(result.error || 'Transaction failed', 'error');
    }
  };

  const handleMax = () => {
    // Leave some for gas
    const maxAmount = Math.max(0, parseFloat(balance) - 0.001);
    setAmount(maxAmount.toFixed(6));
  };

  return (
    <div className="min-h-full bg-black flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white ml-4">Send</h1>
      </div>

      {/* Token Selection */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <p className="text-blue-300 text-xs mb-2">Asset</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-300 font-bold text-sm">ETH</span>
            </div>
            <div>
              <p className="text-white font-medium">Sepolia ETH</p>
              <p className="text-blue-300/70 text-xs">Balance: {parseFloat(balance).toFixed(4)} ETH</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Input */}
      <div className="mb-6">
        <label className="block">
          <span className="text-blue-200 text-sm mb-2 block">Recipient Address</span>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </label>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block">
          <div className="flex justify-between mb-2">
            <span className="text-blue-200 text-sm">Amount</span>
            <button 
              onClick={handleMax}
              className="text-blue-400 text-xs hover:text-blue-300"
            >
              MAX
            </button>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.0001"
              className="w-full bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 pr-16 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 text-xl"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 font-medium">ETH</span>
          </div>
        </label>
      </div>

      {/* Network Info */}
      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-blue-300 text-sm">Network</span>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-white text-sm">Sepolia Testnet</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default Send;
