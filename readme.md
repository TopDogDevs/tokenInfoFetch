I apologize for the confusion. The error you're encountering is due to a mismatch between CommonJS and ES modules. Let's create a new script that avoids these issues. Here's a step-by-step guide to run a simplified version of the script:

1. Create a new directory for this project:
   ```
   mkdir metaplex-token-info
   cd metaplex-token-info
   ```

2. Initialize a new Node.js project:
   ```
   npm init -y
   ```

3. Install the required dependencies:
   ```
   npm install @solana/web3.js @solana/spl-token

   npm install dotenv
   ```

4. Create a new file named `tokenInfo.js` and paste the following code:

   ```javascript
   const { Connection, PublicKey } = require("@solana/web3.js");
   const { getAssociatedTokenAddress } = require("@solana/spl-token");

   async function fetchTokenInfo(tokenAddress, walletAddress) {
     // Connect to the Solana network (use your preferred RPC endpoint)
     const connection = new Connection("https://api.mainnet-beta.solana.com");

     // Convert addresses to PublicKeys
     const mintPublicKey = new PublicKey(tokenAddress);
     const walletPublicKey = new PublicKey(walletAddress);

     try {
       // Check if the token account exists
       const associatedTokenAddress = await getAssociatedTokenAddress(
         mintPublicKey,
         walletPublicKey
       );
       const tokenAccountInfo = await connection.getAccountInfo(associatedTokenAddress);

       if (tokenAccountInfo) {
         console.log("Token account exists for this wallet");
       } else {
         console.log("Token account does not exist for this wallet");
       }

       // Fetch token supply
       const tokenSupply = await connection.getTokenSupply(mintPublicKey);
       console.log("Token Supply:", tokenSupply.value);

       // Fetch token account balance if it exists
       if (tokenAccountInfo) {
         const balance = await connection.getTokenAccountBalance(associatedTokenAddress);
         console.log("Token Balance:", balance.value);
       }

     } catch (error) {
       console.error("Error fetching token information:", error);
     }
   }

   // Usage
   const tokenAddress = "YOUR_TOKEN_ADDRESS";
   const walletAddress = "YOUR_WALLET_ADDRESS";
   fetchTokenInfo(tokenAddress, walletAddress);
   ```

5. Replace `YOUR_TOKEN_ADDRESS` with the address of the token you want to check, and `YOUR_WALLET_ADDRESS` with the address of the wallet you want to check.

6. Run the script:
   ```
   node tokenInfo.js
   ```

This script will:
- Check if an Associated Token Account exists for the given wallet and token.
- Fetch the token's total supply.
- If the token account exists, it will also fetch the token balance for the given wallet.

Note: This script doesn't use Metaplex, which was causing the module compatibility issues. If you specifically need Metaplex functionality, we would need to set up a more complex project structure to handle ES modules correctly.

If you encounter any issues or need to fetch additional information, please let me know, and I'll be happy to help you modify the script accordingly.