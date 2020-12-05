require("dotenv").config();
const helpers = require("./helpers");
exports.handler = async function(event, context) {
    const {user} = context.clientContext;
    helpers.checkUser(user);
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    const db = client.db("project-m-database");    
    const all = await db.collection('tasks').find({}).toArray();
    
    /* await db.collection("tasks").insertOne({
        title:"Do stuff",
        dueAt: Date.now(),
        addedAt:Date.now()-5000,
        description:"Bla, bla",
        assigned:[]
     });*/
    client.close();
    return {
        statusCode: 200,
        body: JSON.stringify(all)
    };
}