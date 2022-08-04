import { MongoClient } from "mongodb";


export default async function DataHandler({ query: { id } }, res) {


    const client = await MongoClient.connect(
        "mongodb+srv://fahemvai:fahemvai@fooding.qvvsa6g.mongodb.net/fooding?retryWrites=true&w=majority")

    const db = client.db();

    const yourCollection = db.collection("selectedFoods");


    const yourData = await yourCollection.find({ 'id': `${id}` }).toArray();

    client.close();
    res.status(200).json(yourData);
}