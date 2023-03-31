import { compile } from "@noir-lang/noir_wasm";
import { acir_read_bytes } from "@noir-lang/noir_wasm";
import path from "path";
import fs from "fs";

import {
  setup_generic_prover_and_verifier,
  create_proof,
  verify_proof,
} from "@noir-lang/barretenberg/dest/client_proofs";
import { path_to_uint8array } from "./utils";

async function main() {
  // This does not work for now
  // console.log(`compiling...`);
  // const compiled_program = compile(path.resolve(__dirname, "src/main.nr"));
  // const circuit = compiled_program.circuit;
  const artifact = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./target/circuit.json"), "utf-8")
  );
  const circuit = artifact.circuit;

  // let acirByteArray = path_to_uint8array(
  //   path.resolve(__dirname, "./target/circuit.json")
  // );
  // const acir = acir_read_bytes(acirByteArray);
  // let acir_bytes = new Uint8Array(Buffer.from(circuit, "hex"));

  console.log(`getting acir...`);
  let acir_bytes = new Uint8Array(circuit);
  const acir = acir_read_bytes(acir_bytes);

  console.log(`setup prover/verifier pair...`);
  const [prover, verifier] = await setup_generic_prover_and_verifier(acir);

  console.log(`creating proof for 3,4...`);
  const proof = await create_proof(prover, acir, { x: 3, y: 4 });

  console.log(`verifying proof...`);
  const verified = await verify_proof(verifier, proof);

  console.log({ verified });
}

main();
