import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import { validateSeedPhraseStrong, verifyPhrase } from "../utils/wallet";
import { AlertCircle, CheckCircle, Eye, EyeOff, Trash2 } from "lucide-react";

interface ValidationCheck {
  valid: boolean;
  message: string;
}

interface ValidationChecks {
  wordCount?: ValidationCheck;
  noDuplicates?: ValidationCheck;
  validChars?: ValidationCheck;
  validLength?: ValidationCheck;
  validCrypt?: ValidationCheck;
  validPhrase?: ValidationCheck;
}

interface ValidationResult {
  isValid: boolean;
  title: string;
  message: string;
  checks: ValidationChecks;
  wordCount?: number;
}

const SeedPhraseValidator = () => {
  const userPhrase: string | null = localStorage.getItem("seed-phrase");
  console.log(userPhrase);

  const { showToast } = useToast();
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [showPhrase, setShowPhrase] = useState<boolean>(false);

  useEffect(() => {
    const words = phrase
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);

    // Clear result when user types
    if (result) setResult(null);
  }, [phrase]);

  const validatePhrase = (): void => {
    const trimmed = phrase.trim().toLowerCase();
    const errors: string[] = [];
    const checks: ValidationChecks = {};

    if (!trimmed) {
      setResult({
        isValid: false,
        title: "Empty Input",
        message: "Please enter a seed phrase to validate.",
        checks: {},
      });
      return;
    }

    const words = trimmed.split(/\s+/).filter((w) => w.length > 0);
    const count = words.length;

    // Word count check
    const isValidCount = count === 12 || count === 24;
    checks.wordCount = {
      valid: isValidCount,
      message: `${count} words (need 12 or 24)`,
    };
    if (!isValidCount) {
      errors.push(`Invalid word count: ${count}`);
    }

    // Duplicate check
    const uniqueWords = new Set(words);
    const hasDuplicates = uniqueWords.size !== words.length;
    checks.noDuplicates = {
      valid: !hasDuplicates,
      message: hasDuplicates
        ? "Contains duplicate words"
        : "No duplicate words",
    };
    if (hasDuplicates) {
      errors.push("Contains duplicate words");
    }

    // Character validation
    const hasInvalidChars = words.some((word) => /[^a-z]/.test(word));
    checks.validChars = {
      valid: !hasInvalidChars,
      message: hasInvalidChars
        ? "Contains invalid characters"
        : "All lowercase letters",
    };
    if (hasInvalidChars) {
      errors.push("Contains invalid characters");
    }

    // Word length validation
    const hasInvalidLength = words.some(
      (word) => word.length < 3 || word.length > 8,
    );
    checks.validLength = {
      valid: !hasInvalidLength,
      message: hasInvalidLength
        ? "Some words too short/long"
        : "Word lengths valid",
    };
    if (hasInvalidLength) {
      errors.push("Invalid word lengths");
    }

    const isCryptoValid = validateSeedPhraseStrong(trimmed);
    checks.validCrypt = {
      valid: isCryptoValid,
      message: isCryptoValid
        ? "The phrase is cryptographically valid"
        : "The phrase is not cryptographically valid",
    };
    if (!isCryptoValid) {
      errors.push("Invalid seed phrase");
    }

    const isValidSeedPhrase = verifyPhrase(trimmed);
    checks.validPhrase = {
      valid: isValidSeedPhrase.isMatch,
      message: isValidSeedPhrase.isMatch
        ? "Valid pass phrase entered"
        : "Invalid pass phrase entered",
    };
    if (!isValidSeedPhrase.isMatch) {
      errors.push("Seed phrase does not match");
    }

    const isValid = errors.length === 0;

    setResult({
      isValid,
      title: isValid ? "Valid Format! ✓" : "Invalid Format ✗",
      message: isValid
        ? "Your seed phrase is Valid. You're all Set Up!"
        : "Your seed phrase does not meet the required format. Please check the details below.",
      checks,
      wordCount: count,
    });

    showToast(
      "Passphrase has been verified Please procede to the login page",
      "success",
    );

    navigate("/setup");
  };

  const clearForm = (): void => {
    setPhrase("");
    setResult(null);
    setWordCount(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      validatePhrase();
    }
  };

  const getWordCountColor = (): string => {
    if (wordCount === 0) return "bg-gray-700";
    return wordCount === 12 || wordCount === 24 ? "bg-green-500" : "bg-red-500";
  };

  const getTextareaClasses = (): string => {
    const baseClasses =
      "w-full px-4 py-3 border-2 rounded-xl text-blue-200/80 text-base font-mono resize-y min-h-32 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    if (!result) return `${baseClasses} border-gray-300`;
    return result.isValid
      ? `${baseClasses} border-green-500 bg-green-900/50`
      : `${baseClasses} border-red-500 bg-red-900/50`;
  };

  return (
    <div className="min-h-full bg-black overflow-x-auto p-6">
      <div className="bg-black rounded-3xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
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
            <h1 className="text-xl font-bold text-white ml-4">
              Confirm Passphrase
            </h1>
          </div>
          <p className="text-blue-300/70 text-center mb-8 max-w-sm">
            Enter your 12 or 24-word recovery phrase to validate
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8 max-w-sm">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200/80">
              <strong className="font-semibold">Security Notice:</strong> Never
              share your seed phrase with anyone. This validator runs locally in
              your browser.
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-5">
          <label
            htmlFor="seedPhrase"
            className="block text-sm font-semibold text-blue-700 mb-2">
            Enter Your Pass-Phrase
          </label>
          <div className="relative">
            <textarea
              id="seedPhrase"
              value={phrase}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPhrase(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Enter your seed phrase here (separate words with spaces)..."
              className={getTextareaClasses()}
              style={
                {
                  WebkitTextSecurity: showPhrase ? "none" : "disc",
                  fontFamily: showPhrase ? "monospace" : "inherit",
                } as React.CSSProperties
              }
            />
            <div
              className={`absolute right-4 bottom-4 ${getWordCountColor()} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {wordCount} word{wordCount !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Show/Hide Toggle */}
          <label className="flex items-center mt-3 cursor-pointer text-sm text-blue-300/70 hover:text-blue-500/80">
            <input
              type="checkbox"
              checked={showPhrase}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowPhrase(e.target.checked)
              }
              className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="flex items-center gap-2">
              {showPhrase ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {showPhrase ? "Hide" : "Show"} seed phrase
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={validatePhrase}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl ">
            Validate Phrase
          </button>
          <button
            onClick={clearForm}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300">
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`p-5 rounded-xl border-2 animate-in slide-in-from-top-2 duration-300 ${
              result.isValid
                ? "bg-green-900/20 border-green-500"
                : "bg-red-900/20 border-red-500"
            }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="text-l">{result.isValid ? "✅" : "❌"}</div>
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    result.isValid ? "text-green-800" : "text-red-800"
                  }`}>
                  {result.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    result.isValid ? "text-green-700" : "text-red-700"
                  }`}>
                  {result.message}
                </p>
              </div>
            </div>

            {/* Validation Checks */}
            {Object.keys(result.checks).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                {Object.entries(result.checks).map(([key, check]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span
                      className={
                        check.valid
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }>
                      {check.valid ? "✓" : "✗"}
                    </span>
                    <span
                      className={
                        check.valid ? "text-green-700" : "text-red-600"
                      }>
                      {check.message}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 my-8 max-w-sm">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200/80">
              <strong className="font-semibold block mb-1">
                What is a seed phrase?
              </strong>
              A seed phrase (also called recovery phrase or mnemonic) is a list
              of 12 or 24 words that stores all the information needed to
              recover your crypto wallet.
            </div>
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <p className="mt-4 text-xs text-blue-200 text-center">
          💡 Tip: Press{" "}
          <kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl</kbd> +{" "}
          <kbd className="px-2 py-1 bg-gray-700 rounded">Enter</kbd> to validate
        </p>
      </div>
    </div>
  );
};

export default SeedPhraseValidator;
