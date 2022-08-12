import { type Db, MongoClient } from 'mongodb';
import Config from '@lib/config';

let client;
let clientPromise;

if (!Config.databaseURI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(Config.databaseURI as string);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(Config.databaseURI as string);
  clientPromise = client.connect();
}

const db = clientPromise.then((client) => client.db('teamfindr'));

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default db as Promise<Db>;
