import { catchData } from "../../../catchData";
import { MongoClient } from "mongodb";

export default async function messageExamples(req, res) {

    if (req.method === 'GET') {

        const client = await MongoClient.connect(
            "mongodb+srv://fahemvai:fahemvai@fooding.qvvsa6g.mongodb.net/fooding?retryWrites=true&w=majority")

        const db = client.db();

        const yourCollection = db.collection("selectedFoods");


        const yourData = await yourCollection.find({}).toArray();

        client.close();
        res.status(200).json(yourData);
    } else if (req.method === 'POST') {

        const food = req.body.food
        const SettledLocation = req.body.selectedLocation

        const newFood = {
            food,
            location: SettledLocation
        }

        const client = await MongoClient.connect(
            "mongodb+srv://fahemvai:fahemvai@fooding.qvvsa6g.mongodb.net/fooding?retryWrites=true&w=majority");
        const db = client.db();
        const yourCollection = db.collection("selectedFoods");
        const result = await yourCollection.insertOne(newFood);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Data inserted successfully!" });
        catchData.push(newFood)
        res.status(201).json(newFood)

    }
    else if (req.method === 'DELETE') {

        const ID = req.body.foodID

        const client = await MongoClient.connect(
            "mongodb+srv://fahemvai:fahemvai@fooding.qvvsa6g.mongodb.net/fooding?retryWrites=true&w=majority");
        const db = client.db();
        const yourCollection = db.collection("selectedFoods");
        const result = await yourCollection.deleteOne({ 'id': ID });
        console.log(result);
        client.close();
        res.status(201).json({ message: "Data Deleted successfully!" });
        console.log(ID);

    }

}
