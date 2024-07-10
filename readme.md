# Token Info Script

This script allows you to fetch and display information about a Solana token, including its metadata and balance for a specific wallet. It uses the Metaplex SDK and Solana web3.js library to interact with the Solana blockchain.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Setup

1. Clone this repository or create a new directory for your project.

2. Navigate to your project directory in the terminal.

3. Install the required dependencies by running:

   ```
   npm install @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/umi @metaplex-foundation/mpl-token-metadata @solana/spl-token @solana/web3.js dotenv
   ```

4. Create a `.env` file in your project root with the following content:

   ```
   RPC_ENDPOINT=https://api.devnet.solana.com
   TOKEN_ADDRESS=your_token_address_here
   WALLET_ADDRESS=your_wallet_address_here
   ```

   Replace `your_token_address_here` and `your_wallet_address_here` with your actual token and wallet addresses.

5. Create a file named `tokenInfo.js` and copy the script into it.

## Usage

Run the script using Node.js:

```
node tokenInfo.js
```

### Example Output

```
Token Metadata:
  Name: TATA
  Symbol: TATA
  URI: https://example.ipfs.dweb.link/metadata.json
Token Supply: 30000000000000
Token account exists for this wallet
Token Balance: 5000000000
```

## Understanding the Output

- **Token Metadata**: Displays the name, symbol, and URI of the token's metadata.
- **Token Supply**: Shows the total supply of the token.
- **Token account exists for this wallet**: Indicates whether the specified wallet has an associated token account for this token.
- **Token Balance**: If the token account exists, this shows the balance of tokens in the specified wallet.

## Troubleshooting

If you encounter any errors:

1. Ensure all dependencies are correctly installed.
2. Check that your `.env` file is set up correctly with valid addresses.
3. Verify that you're connected to the correct Solana network (Mainnet, Devnet, etc.).

## Customization

You can modify the `fetchTokenInfo` function in `tokenInfo.js` to fetch additional information or perform other operations with the token data.

Example: To fetch the token's decimals, add this line after fetching the digital asset:

```javascript
console.log("Token Decimals:", digitalAsset.mint.decimals);
```

## Contributing

Feel free to fork this project and submit pull requests with any enhancements.

## License

This project is open source and available under the [MIT License](LICENSE).