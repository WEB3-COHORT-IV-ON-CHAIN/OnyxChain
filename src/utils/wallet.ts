import { HDNodeWallet } from "ethers";

export function generateWallet() {
  return HDNodeWallet.createRandom();
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
