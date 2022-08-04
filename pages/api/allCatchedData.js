export default async function messageExamples(req, res) {


    const response = await fetch('http://localhost:3000/api/foodID/catchedData')
    const data = await response.json()

    res.status(200).json(data)
}
