

export default async function DataHandler({ query: { id } }, res) {

    const response = await fetch('http://localhost:3000/api/foodID/catchedData')
    const data = await response.json()

    const filtered = data.filter((p) => p.id == id)

    if (filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({ message: `User with id: ${id} not found.` })
    }
}