1. `nargo check`

   This generate a Verifier.toml and a Prover.toml with empty values

1. `nargo compile <circuit-name>`

   This generate the circuit files in the `target` folder

1. `nargo execute [witness-name]`

   This will execute the program, assuming you filled in the `Prover.toml` values.
   if you pass a `witness-name` it will also generate a witness file (`<witness-name>.tr`) in the `target` folder

   > The witness file can be considered as program inputs parsed for your program's ACIR.

1. `nargo prove <proof-name>`

   This will generate a proof file for the program in the `proofs` folder. This will also automatically edit the `Verifier.toml` file with the public values defined in `Prover.toml`

1. `nargo verify <proof-name>`

   This will verify if the proof is valid for the values taken from `Prover.toml`.
   This will also automatically update `Verifier.toml` with the new public values if any.

1. `nargo codegen-verifier`

   This will generate a verifier smart contract in solidity for the program in the `contract` folder and the `contract/plonk_vk.sol` file

1. `nargo preprocess <build_artifact>`

   This will preprocess the circuit json file generated in the compile step (`target/<build-artifact>.json`) and generate any of these files if they are missing

   - `target/<build-artifact>.checksum`
   - `target/<build-artifact>.pk`
   - `target/<build-artifact>.vk`

   If you run all the command above in order, this preprocess step will have no consequences as these 3 files were already generated in the `compile` step

1. `nargo test [pattern]`

   This will run the test (with decorator `#[test]` ). `<pattern>` can be used to filter test
