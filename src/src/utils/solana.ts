import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";

const network = clusterApiUrl("devnet");
const connection = new Connection(network, "confirmed");

export function getProvider(wallet: any) {
  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
}

export async function loadProgram(idl: Idl, programId: string, wallet: any) {
  const provider = getProvider(wallet);
  return new Program(idl, new PublicKey(programId), provider);
}
