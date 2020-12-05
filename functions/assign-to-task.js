require("dotenv").config();
const helpers = require("./helpers");
const ObjectId = require('mongodb').ObjectId; 

exports.handler = async function(event, context) {
    const {user} = context.clientContext;
    helpers.checkUser(user);
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    const db = client.db("project-m-database");    
    const body = JSON.parse(event.body);
    const o_id = ObjectId(body._id);
    const assignee = body.assignee;
    
    const all = await db.collection('tasks').findOneAndUpdate( {"_id": o_id},{$push: {assigned:assignee}},{returnOriginal:false}).then(doc=>doc);
    //payload: 
    /*
    {
    "_id":"5fc780d2244fe6039f649573",
    "assignee": {
        "name":"Jonas",
        "initials":"jofh",
        "completed":false
    }
}

    */
    client.close();
    return {
        statusCode: 200,
        body: JSON.stringify(all.value)
    };
}