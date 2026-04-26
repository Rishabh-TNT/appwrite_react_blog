import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("69ad739900364c1672ad"); // Your project ID

const storage = new Storage(client);

const result = storage.getFileView({
  bucketId: "<BUCKET_ID>",
  fileId: "<FILE_ID>",
  token: "<TOKEN>", // optional
});

console.log("inside testing");
console.log(result);
