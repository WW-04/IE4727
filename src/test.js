import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://weiwenyapw_db_user:06woyEPwtl3Ms8OO@ie4727.gzmv7vl.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("movies");
    const movies = database.collection("movies");
    const query={title:"The Odyssey"};
    // Execute query
    const movie = await movies.findOne(query);
    // Print the document returned by findOne()
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
