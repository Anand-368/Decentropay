# How to Run DecentroPay

Follow these steps to run the project locally.

## Prerequisities
- Node.js installed
- MetaMask extension installed in your browser

## Step 1: Install Dependencies
Open a terminal in the project root (`.../decentropay`) and run:
```sh
npm install
cd frontend
npm install
cd ..
```

## Step 2: Start Local Blockchain
Open a **new terminal**, go to the project root, and run:
```sh
npx hardhat node
```
This will start a local blockchain and give you 20 test accounts with 10000 ETH each.
**Keep this terminal running.**

## Step 3: Deploy Smart Contract
Open a **new terminal**, go to the project root, and run:
```sh
npx hardhat run scripts/deploy.js --network localhost
```
Copy the deployed address from the output (e.g., `PaymentGateway deployed to: 0x...`).
**Note:** The default address is usually `0x5FbDB2315678afecb367f032d93F642f64180aa3` if it's the first key, but confirming in output is best.

## Step 4: Configure Frontend
1. Open [`frontend/src/App.jsx`](file:///c:/Users/USER/OneDrive/Blockchain_projects/QR-PaymentDapp/decentropay/frontend/src/App.jsx).
2. Update the `PAYMENT_GATEWAY_ADDRESS` constant (line 8) with the address you copied in Step 3.
   ```javascript
   const PAYMENT_GATEWAY_ADDRESS = "YOUR_COPIED_ADDRESS";
   ```

## Step 5: Run Frontend
In the terminal (inside `frontend` directory), run:
```sh
npm run dev
```
Open the link shown (usually `http://localhost:5173`) in your browser.

## Step 6: Connect MetaMask
1. Open MetaMask and switch network to **Localhost 8545**.
   - If you don't see it, go to Settings > Networks > Add Network > Add a network manually.
   - **Network Name**: Localhost 8545
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
2. Import one of the test accounts from Step 2 into MetaMask using its **Private Key**.
3. Click "Connect Wallet" on the web app.

Now you can send payments and see them in the history!
