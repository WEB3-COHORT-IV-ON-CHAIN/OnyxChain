import { HDNodeWallet, Mnemonic } from "ethers";
interface WalletVerificationResult {
  isMatch: boolean;
  originalAddress: string;
  enteredAddress: string;
  message: string;
}

/**
 * Generates a real wallet address
 */
export function generateWallet() {
  const wallet = HDNodeWallet.createRandom();
  localStorage.setItem("originalAddress", wallet.address);
  localStorage.setItem("originalPhrase", wallet.mnemonic!.phrase);

  return wallet;
}

/**
 * Validates if a seed phrase has the correct format
 * NOTE: This only checks format, not cryptographic validity
 */
export function validateSeedPhrase(phrase: string): boolean {
  const words = phrase.trim().toLowerCase().split(/\s+/);
  return words.length === 12 || words.length === 24;
}

/**
 * Validates if a seed phrase has cryptographic validity
 * NOTE: This only checks not cryptographic validity
 */
export function validateSeedPhraseStrong(phrase: string): boolean {
  try {
    Mnemonic.fromPhrase(phrase); // This validates against BIP39 wordlist
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a seed phrase entered by the user is the one generated at start of the signup process
 * NOTE: This verifies the seed phrase entered by user against on the earlier generated seed phrase in order to enforce passphrase storage.
 */
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

/**
 * Generates a mock wallet address
 * NOTE: This is NOT a real address - for UI demo only
 */
export function generateMockAddress(): string {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}
