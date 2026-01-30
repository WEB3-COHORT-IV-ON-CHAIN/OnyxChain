import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

function Settings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const storedPhrase = localStorage.getItem("originalPhrase");
  const [seedPhrase] = useState<string[] | null>(() => {
    return storedPhrase ? storedPhrase.split(" ") : null;
  });

  const handleCopySeed = async () => {
    if (!seedPhrase) {
      showToast("No seed phrase found", "error");
      return;
    }

    await navigator.clipboard.writeText(seedPhrase.join(" "));
    showToast("Seed phrase copied!", "success");
  };

  const handleLock = () => {
    showToast("Wallet locked!", "success");
    navigate("/");
  };

  return (
    <div className="min-h-full bg-black flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-400 hover:text-blue-300 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white ml-4">Settings</h1>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        {/* Show Seed Phrase */}
        <button
          onClick={() => setShowSeedPhrase(!showSeedPhrase)}
          className="w-full flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="text-white text-sm">Show Seed Phrase</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-blue-400 transition-transform ${showSeedPhrase ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Seed Phrase Display */}
        {showSeedPhrase && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-yellow-400 text-xs">
                Never share this with anyone!
              </span>
            </div>
            <div>
              {seedPhrase ? (
                <div className="grid grid-cols-3 gap-2">
                  {seedPhrase.map((word, i) => (
                    <span
                      key={i}
                      className="text-white text-sm border-2 rounded-xl border-yellow-300 p-3">
                      <span className="text-blue-400 text-xs">{i + 1}.</span>{" "}
                      <span className="text-white text-xs ml-1">{word}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-red-400">
                  Seed phrase not found. Please restart setup.
                </p>
              )}

              {/* {seedPhrase?.map((word, index) => (
                <div
                  key={index}
                  className="bg-black/30 rounded px-2 py-1 text-center">
                  
                  
                </div>
              ))} */}
            </div>
            <button
              onClick={handleCopySeed}
              className="w-full py-2 text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </button>
          </div>
        )}

        {/* Network */}
        <button
          onClick={() => showToast("Network selection coming soon!", "info")}
          className="w-full flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <span className="text-white text-sm">Network</span>
          </div>
          <span className="text-blue-300/50 text-sm">Ethereum</span>
        </button>

        {/* Currency */}
        <button
          onClick={() => showToast("Currency selection coming soon!", "info")}
          className="w-full flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white text-sm">Currency</span>
          </div>
          <span className="text-blue-300/50 text-sm">USD</span>
        </button>

        {/* Lock Wallet */}
        <button
          onClick={handleLock}
          className="w-full flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-white text-sm">Lock Wallet</span>
          </div>
        </button>

        {/* Reset Wallet */}
        <button
          onClick={() => {
            showToast("Wallet reset! (UI only)", "info");
            navigate("/");
          }}
          className="w-full flex items-center justify-between p-4 bg-red-900/20 border border-red-500/30 rounded-lg hover:bg-red-900/30 transition-colors mt-4">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-red-400 text-sm">Reset Wallet</span>
          </div>
        </button>
      </div>

      {/* Version */}
      <p className="text-center text-blue-300/30 text-xs mt-auto pt-6">
        OnyxChain v1.0.0
      </p>
    </div>
  );
}

export default Settings;
