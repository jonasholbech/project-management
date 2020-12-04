require("dotenv").config();
const ObjectId = require('mongodb').ObjectId; 

exports.handler = async function(event, context) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    const db = client.db("project-m-database");    
    const body = JSON.parse(event.body);
    const o_id = ObjectId(body._id);
    const person = body.person;
    const all = await db.collection('tasks').findOneAndUpdate( 
        {"_id": o_id, "assigned.initials":person.initials},
        {$set: {"assigned.$.completed":body.completed}},
        {returnOriginal:false})
        .then(doc=>doc);
    
    client.close();
    return {
        statusCode: 200,
        body: JSON.stringify(all.value)
    };
}