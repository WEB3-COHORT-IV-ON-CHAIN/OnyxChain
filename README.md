# OnyxChain Wallet

OnyxChain is a minimal Ethereum wallet browser extension built with React, TypeScript, and Vite. It focuses on core wallet fundamentals: secure login, key generation, and ETH transfers, without unnecessary complexity.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Core Functionalities](#core-functionalities)
- [Installation](#installation)
- [Development](#development)
- [Learning Goals](#learning-goals)
- [License](#license)

---

## Features

### Wallet Management
- Create new wallets with secure seed phrase generation
- Import existing wallets (seed phrase or private key)
- Multi-account support from a single seed phrase
- Account naming and organization

### Asset Management
- View ETH balance in real-time
- Add and manage ERC-20 tokens
- Custom token support
- Token price tracking (via CoinGecko API)
- Portfolio value calculation

### Transactions
- Send ETH and ERC-20 tokens
- Transaction history with filtering
- Gas price customization (Slow/Average/Fast)
- Transaction status tracking
- Pending transaction management

### Network Support
- Ethereum Mainnet
- Sepolia Testnet
- Goerli Testnet
- Custom RPC networks
- Automatic network switching for dApps

### dApp Integration
- Web3 provider injection
- Connect to decentralized applications

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| ethers.js | Blockchain library |
| Chrome Extension API | Browser extension platform |

---

## Project Structure

```
onyxchain-wallet/
│
├── src/
│   ├── components/        # React UI components
│   ├── pages/             # Extension views (Login, Wallet, Send)
│   ├── utils/             # Wallet + crypto helpers
│   ├── background/        # Background scripts (key handling, tx signing)
│   ├── content/           # Injected scripts (dApp support)
│   └── main.tsx           # App entry point
│
├── public/
│   └── manifest.json      # Browser extension manifest
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Architecture

OnyxChain follows the standard Chrome Extension architecture with three main components:

### 1. Background Script (Service Worker)

**Location**: `src/background/index.ts`

**Responsibilities**:
- Manage wallet state and private keys
- Handle RPC calls to Ethereum networks
- Process transaction signing requests
- Manage extension lifecycle
- Handle messages from popup and content scripts

**Key Features**:
- Persistent state management
- Automatic network switching
- Transaction queueing
- Session management with auto-lock

**Example**:
```typescript
// Background message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'SIGN_TRANSACTION':
      handleTransactionSigning(request.data)
        .then(sendResponse)
        .catch(error => sendResponse({ error: error.message }));
      break;
    // ... other actions
  }
  return true; // Keep channel open for async response
});
```

### 2. Content Script

**Location**: `src/content/index.ts`

**Responsibilities**:
- Inject Web3 provider into web pages
- Bridge communication between dApps and extension
- Handle dApp connection requests
- Emit Ethereum provider events

**Example**:
```typescript
// Provider injection
window.ethereum = {
  isOnyxChain: true,
  request: async ({ method, params }) => {
    // Forward request to background script
    return chrome.runtime.sendMessage({
      action: 'ETH_REQUEST',
      method,
      params
    });
  },
  // ... other provider methods
};
```

### 3. Popup UI

**Location**: `src/popup/`

**Responsibilities**:
- User interface for wallet interactions
- Display account information
- Transaction creation and approval
- Settings and preferences

**Key Features**:
- React-based responsive UI
- Real-time balance updates
- Transaction history
- Network switching

---

## Core Functionalities

### Wallet Creation
- Uses `ethers.Wallet.createRandom()`
- Derives:
  - Private key
  - Public Ethereum address

### Login
- User authenticates with a password
- Wallet state unlocks locally
- No backend or remote authentication

### Sending ETH
User inputs:
- Recipient address
- Amount

Transaction is:
- Signed locally
- Sent via Ethereum JSON-RPC provider

---

## Installation

### Prerequisites
- Node.js v18.0.0 or higher
- npm or yarn
- Chrome/Edge/Brave browser

### Steps

```bash
# Clone repository
git clone https://github.com/yourusername/onyxchain-wallet.git
cd onyxchain-wallet

# Install dependencies
npm install

# Start development server
npm run dev
```

### Load Extension in Browser

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `dist/` directory

---

## Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint code
npm run lint
```

### Environment Setup

Create a `.env` file in the root:

```env
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
VITE_NETWORK=sepolia
```

---

## Learning Goals Behind OnyxChain

- Understand wallet internals
- Learn browser extension architecture
- Practice secure key management
- Build intuition for Ethereum transaction flow

---

## License

MIT License

Copyright (c) 2025 OnyxChain

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

---

**Built for learning Ethereum development**

[Report Bug](https://github.com/yourusername/onyxchain-wallet/issues) | [Request Feature](https://github.com/yourusername/onyxchain-wallet/issues)
