import { MongoClient } from "mongodb";
import { Env } from "../../constants/Env";

const uri = Env.MONGO_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}


export async function getMongoClient() {

  let client
  let clientPromise

  if (!uri) {
    throw new Error("MongoClient URI not setIsLoading");
  }

  if (Env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
  return clientPromise
}

export default async function getMongoDb() {
  const mongoClient = await getMongoClient();
  return mongoClient.db()
}

