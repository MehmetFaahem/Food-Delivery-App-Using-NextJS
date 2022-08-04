import { foodxes } from '../../data'

export default function messageExamples(req, res) {

  if (req.method === 'GET') {

    res.status(200).json(foodxes);

  } else if (req.method === 'POST') {

    const food = req.body.food
    const newFood = {
      id: Date.now(),
      name: food
    }
    foodxes.push(newFood)
    res.status(201).json(newFood)

  } else if (req.method === 'DELETE') {

  }

}
