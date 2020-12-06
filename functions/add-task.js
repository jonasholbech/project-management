//user stuff done and checked
require("dotenv").config();
const helpers = require("./helpers");
exports.handler = async function(event, context) {
    const {user} = context.clientContext;
    helpers.checkUser(user);

    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_ATLAS_KEY;
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    const db = client.db("project-m-database");
    const body = JSON.parse(event.body); 
    const task = await db.collection("tasks").insertOne({
        title:body.title,
        dueAt: body.dueAt,
        addedAt:Date.now(),
        createdBy:helpers.getInitials(user.email),
        description:body.description,
        assigned:[]
    }).then(({ ops }) => ops[0]);
    client.close();
    return {
        statusCode: 200,
        body: JSON.stringify(task)
    };
}