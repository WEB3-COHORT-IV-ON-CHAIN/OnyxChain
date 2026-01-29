import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

function Send() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    if (!recipient) {
      showToast('Please enter a recipient address', 'error');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    showToast('Transaction sent successfully! (UI only)', 'success');
    setTimeout(() => navigate('/dashboard'), 1000);
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
              <p className="text-white font-medium">Ethereum</p>
              <p className="text-blue-300/70 text-xs">Balance: 0.00 ETH</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Recipient Input */}
      <div className="mb-6">
        <label className="block">
          <span className="text-blue-200 text-sm mb-2 block">Recipient Address</span>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter address or ENS name"
              className="w-full bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 pr-12 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
          </div>
        </label>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block">
          <div className="flex justify-between mb-2">
            <span className="text-blue-200 text-sm">Amount</span>
            <button className="text-blue-400 text-xs hover:text-blue-300">MAX</button>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 pr-16 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 text-xl"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 font-medium">ETH</span>
          </div>
        </label>
        <p className="text-blue-300/50 text-xs mt-2">≈ $0.00 USD</p>
      </div>

      {/* Gas Fee Info */}
      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-blue-300 text-sm">Estimated Gas Fee</span>
          <span className="text-white text-sm">~0.001 ETH</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-blue-300/50 text-xs">Network: Ethereum Mainnet</span>
          <span className="text-blue-300/50 text-xs">≈ $2.50</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30"
      >
        Send
      </button>
    </div>
  );
}

export default Send;
