import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { generateWallet } from '../utils/wallet';

function Receive() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const mockAddress = generateWallet().address;;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockAddress);
    showToast('Address copied to clipboard!', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Wallet Address',
        text: mockAddress,
      });
    } else {
      copyToClipboard();
    }
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
        <h1 className="text-xl font-bold text-white ml-4">Receive</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center">
        {/* Network Badge */}
        <div className="flex items-center space-x-2 bg-blue-900/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-blue-300 text-sm">Ethereum Mainnet</span>
        </div>

        {/* QR Code Placeholder */}
        <div className="w-56 h-56 bg-white rounded-2xl p-4 mb-6 flex items-center justify-center">
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span className="text-gray-500 text-xs">QR Code</span>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="w-full max-w-sm">
          <p className="text-blue-300 text-sm text-center mb-3">Your Wallet Address</p>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-white text-sm font-mono text-center break-all leading-relaxed">
              {mockAddress}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 mt-6 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">Copy Address</span>
        </button>

        {/* Warning */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-8 max-w-sm">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-200/80 text-sm">
              Only send Ethereum and ERC-20 tokens to this address. Sending other assets may result in permanent loss.
            </p>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30 mt-6"
      >
        Share Address
      </button>
    </div>
  );
}

export default Receive;
