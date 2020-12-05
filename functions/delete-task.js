require("dotenv").config();
const helpers = require("./helpers");
var ObjectId = require('mongodb').ObjectId; 


exports.handler = async function(event, context) {
    const {user} = context.clientContext;
    helpers.checkUser(user);
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    const db = client.db("project-m-database");    
    const body = JSON.parse(event.body);
    var o_id = ObjectId(body._id);
    const all = await db.collection('tasks').deleteOne( {"_id": o_id});
    //const all = await db.collection('tasks').findOneAndDelete({_id:o_id}) 
    /*var id = req.params.gonderi_id;       
var o_id = new ObjectId(id);
db.test.find({_id:o_id})

    const all = await db.collection('tasks').findOneAndDelete({})
    
    */
    client.close();
    return {
        statusCode: 200,
        body: JSON.stringify(all)
    };
}