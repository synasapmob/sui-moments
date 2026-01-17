import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { WalrusClient, WalrusFile } from "@mysten/walrus";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { readFileSync } from "fs";

const getSuiClient = new SuiClient({
  network: "testnet",
  url: getFullnodeUrl("testnet"),
});

const walrusClient = new WalrusClient({
  network: getSuiClient.network,
  suiClient: getSuiClient,
  uploadRelay: {
    // host: "https://walrus-upload-relay-production.up.railway.app",

    // where we get sendTip config?, from here: https://upload-relay.testnet.walrus.space/v1/tip-config
    host: "https://upload-relay.testnet.walrus.space",
    sendTip: {
      address:
        "0x4b6a7439159cf10533147fc3d678cf10b714f2bc998f6cb1f1b0b9594cdc52b6",
      kind: { const: 105 },
    },
    timeout: 120_000,
  },
});

const signer = Ed25519Keypair.fromSecretKey(
  "suiprivkey1qpse397ylrv64995m6rcddedhxyn6lwf272nvc7s0g43egtn32nz69xcxuc"
);

const RANDOM_CHARACTER = () => {
  return (Math.random() + 1).toString(6).substring(7);
};

const writeFile = async () => {
  const fileBuffer = readFileSync("./holiday.jpg");

  const webFile = new File([fileBuffer, RANDOM_CHARACTER()], "my_photo.png", {
    type: "image/png",
  });

  const file1 = WalrusFile.from({
    contents: webFile,
    identifier: "file1.bin",
  });

  return await walrusClient.writeFiles({
    epochs: 3,
    signer,
    files: [file1],
    attributes: {
      creator_suins_name: "suins_name",
      creator_suins_avatar: "avatar",
    },
    deletable: true,
  });
};

async function main() {
  const packageId =
    "0x1776db69d55e8474325c64284c214f11c301cd3e1d72c27ed7b0b008b57e3053";
  const transaction = new Transaction();

  const events = await getSuiClient.queryEvents({
    query: {
      MoveEventType: `${packageId}::reactions::ReactionEvent`,

    },
    

    // order: "descending",
  });
  console.log(JSON.stringify(events, null, 4));
  return;

  // const ko = await writeFile();
  // console.log(ko);

  // return;

  transaction.moveCall({
    target: `${packageId}::reactions::like_photo`,
    arguments: [
      transaction.object(
        "0x4e502b5575ba64bfb165cc5d4eb0c7176244b507c51ae19ddc50f53be308765e"
      ),
      transaction.object.clock(),
transaction.pure.string("heart")
    ],

    // target: `${packageId}::photo::upload_photo`,
    // arguments: [
    //   transaction.object(
    //     "0x45d1263fb54c772688a955bba3e001770b19c09c5f38e620226ef7a676709da1"
    //   ),
    //   transaction.object.clock(),
    // ],
  });
  transaction.setSender(signer.toSuiAddress());

  const signAndSend = await getSuiClient.signAndExecuteTransaction({
    signer,
    transaction,
    options: {
      showEvents: true,
      showRawEffects: true,
    },
  });

  console.log(JSON.stringify(signAndSend.events, null, 4));
}

main();
