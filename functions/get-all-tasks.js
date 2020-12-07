require("dotenv").config();
const helpers = require("./helpers");

exports.handler = async function(event, context) {
    const {user} = context.clientContext;
    helpers.checkUser(user);
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = client.db("project-m-database");
    const body = JSON.parse(event.body);
    const setFilter = () =>{
        switch(body.type){
            case "assignedTo":
                return {"assigned.initials":helpers.getInitials(body.email)}
            case "createdBy":
                return {"createdBy":helpers.getInitials(body.email)}
            default:
                return {}
        }
    }    
    const filter = setFilter();
    const all = await db.collection('tasks').find(filter).toArray();
    
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