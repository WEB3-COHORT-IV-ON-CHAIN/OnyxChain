import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { generateSeedPhrase } from '../utils/wallet';

function CreateWallet() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [showSeed, setShowSeed] = useState(false);

  const handleGenerateSeed = () => {
    const phrase = generateSeedPhrase(12);
    setSeedPhrase(phrase);
    setShowSeed(true);
    showToast('Seed phrase generated successfully!', 'success');
  };

  const handleCopySeed = () => {
    navigator.clipboard.writeText(seedPhrase.join(' '));
    showToast('Seed phrase copied to clipboard!', 'success');
  };

  const handleContinue = () => {
    if (seedPhrase.length === 0) {
      showToast('Please generate a seed phrase first', 'error');
      return;
    }
    showToast('Wallet created successfully!', 'success');
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div className="min-h-full bg-black overflow-y-auto flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white ml-4">Create Wallet</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center">
        {!showSeed ? (
          <>
            <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Create a New Wallet
            </h2>
            <p className="text-blue-300/70 text-center mb-8 max-w-sm">
              This will generate a new wallet with a secure seed phrase. (UI only)
            </p>

            {/* Info Box */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8 max-w-sm">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-200/80 text-sm">
                  Your seed phrase is the master key to your wallet. Never share it with anyone.
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateSeed}
              className="w-full max-w-sm py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30"
            >
              Generate Seed Phrase
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-2 text-center">
              Your Seed Phrase
            </h2>
            <p className="text-blue-300/70 text-center mb-6 text-sm">
              Write down these 12 words in order and keep them safe
            </p>

            {/* Seed Phrase Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6 w-full max-w-sm">
              {seedPhrase.map((word, index) => (
                <div
                  key={index}
                  className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-3 py-2 text-center"
                >
                  <span className="text-blue-400 text-xs">{index + 1}. </span>
                  <span className="text-white text-sm">{word}</span>
                </div>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopySeed}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Copy Seed Phrase</span>
            </button>

            {/* Warning Box */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 max-w-sm">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-yellow-200/80 text-sm">
                  Never share your seed phrase. Anyone with it can access your wallet.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Continue Button */}
      {showSeed && (
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30 mt-6"
        >
          I've Saved My Seed Phrase
        </button>
      )}
    </div>
  );
}

export default CreateWallet;
