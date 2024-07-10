import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

async function fetchTokenInfo(tokenAddress, walletAddress) {
    // Create a UMI instance
    const umi = createUmi(process.env.RPC_ENDPOINT);

    // Convert addresses to PublicKeys
    const mintPublicKey = publicKey(tokenAddress);
    const walletPublicKey = publicKey(walletAddress);

    try {
        // Fetch digital asset (includes metadata)
        const digitalAsset = await fetchDigitalAsset(umi, mintPublicKey);

        console.log("Token Metadata:");
        console.log("  Name:", digitalAsset.metadata.name);
        console.log("  Symbol:", digitalAsset.metadata.symbol);
        console.log("  URI:", digitalAsset.metadata.uri);

        console.log("Token Supply:", digitalAsset.mint.supply.toString());

        // Convert UMI publicKey to Solana web3.js PublicKey
        const solanaWalletPublicKey = new PublicKey(walletPublicKey.toString());
        const solanaMintPublicKey = new PublicKey(mintPublicKey.toString());

        // Check if the token account exists
        const associatedTokenAddress = await getAssociatedTokenAddress(
            solanaMintPublicKey,
            solanaWalletPublicKey
        );

        const tokenAccountInfo = await umi.rpc.getAccount(publicKey(associatedTokenAddress.toString()));

        if (tokenAccountInfo.exists) {
            console.log("Token account exists for this wallet");
            const balance = tokenAccountInfo.data.slice(64, 72);
            const amount = BigInt(new DataView(balance.buffer).getBigUint64(0, true));
            console.log("Token Balance:", amount.toString());
        } else {
            console.log("Token account does not exist for this wallet");
        }

    } catch (error) {
        console.error("Error fetching token information:", error);
    }
}

// Usage
const tokenAddress = process.env.TOKEN_ADDRESS;
const walletAddress = process.env.WALLET_ADDRESS;

if (!tokenAddress || !walletAddress) {
    console.error("Please set TOKEN_ADDRESS and WALLET_ADDRESS in your .env file");
    process.exit(1);
}

fetchTokenInfo(tokenAddress, walletAddress);