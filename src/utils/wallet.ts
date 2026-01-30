import { HDNodeWallet, Mnemonic } from "ethers";
interface WalletVerificationResult {
  isMatch: boolean;
  originalAddress: string;
  enteredAddress: string;
  message: string;
}

// these generate a wallet
export function generateWallet() {
  const wallet = HDNodeWallet.createRandom();
  localStorage.setItem("originalAddress", wallet.address);
  localStorage.setItem("originalPhrase", wallet.mnemonic!.phrase);

  return wallet;
}

// validate seed phrase
export function validateSeedPhrase(phrase: string): boolean {
  const words = phrase.trim().toLowerCase().split(/\s+/);
  return words.length === 12 || words.length === 24;
}


export function validateSeedPhraseStrong(phrase: string): boolean {
  try {
    Mnemonic.fromPhrase(phrase);
    return true;
  } catch {
    return false;
  }
}

export const verifyPhrase = (
  enteredPhrase: string,
): WalletVerificationResult => {
  const originalAddress = localStorage.getItem("originalAddress");

  if (!originalAddress) {
    return {
      isMatch: false,
      originalAddress: "",
      enteredAddress: "",
      message: "No wallet found to verify against",
    };
  }

  try {
    // Restore wallet from entered phrase
    const restoredWallet = HDNodeWallet.fromPhrase(enteredPhrase.trim());
    const enteredAddress = restoredWallet.address;

    // Compare addresses
    const isMatch =
      originalAddress.toLowerCase() === enteredAddress.toLowerCase();

    return {
      isMatch,
      originalAddress,
      enteredAddress,
      message: isMatch
        ? "✅ Phrase matches! Wallet restored successfully."
        : "❌ Phrase does not match the original wallet.",
    };
  } catch (error) {
    return {
      isMatch: false,
      originalAddress,
      enteredAddress: "",
      message: `❌ Invalid seed phrase: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

// these generate a mock wallet
export function generateMockAddress(): string {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}
