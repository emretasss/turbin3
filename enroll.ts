import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import wallet from "./dev-wallet.json";

// Keypair ve Bağlantı oluştur
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

// Github hesap adınızı UTF-8 Buffer olarak hazırlayın
const github = Buffer.from("emretasss", "utf8");

// Program ID'sini tanımlayın
const programId = new PublicKey("PROGRAM_ID_HERE"); // PROGRAM_ID_HERE'yi gerçek program ID'nizle değiştirin

// Anchor Sağlayıcı oluştur
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

// Anchor Programı oluştur
const program = new Program<WbaPrereq>(IDL, programId, provider);

// PDA (Program-Derived Address) oluştur
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Transaksiyonu gerçekleştirin
(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
