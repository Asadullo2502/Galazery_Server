const router = require("express").Router()


const { verify }= require("../../../util/jwt")
const orders = require("./model")

/*
  Get all order
*/
router.get("/", async (req, res) => {
  try {
    const user = verify(req.headers.access_token)
    if(user.role == 1) {

      res.status(201).send(await orders.allOrders())

    }
    else {
    res.status(401).end()

    }
  } catch(e) {
    console.log(e)
    res.statusMessage = e.message
    res.status(401).end()
  }
})

/*
  Create Order
*/
router.post("/", async (req, res) => {

  try {
    const order = await orders.createOrder(req.body)

    if(order) {
      res.status(200).send(order)
    } else {
      res.status(401).end()
    }
  } catch(e) {
    console.log(e)
    res.statusMessage = e.message
    res.status(401).end()
  }
})


/*
  DELETE order
*/
router.delete("/del/:id", async(req, res)=> {

  const ordersId = req.params.id

  const user = await verify(req.headers.access_token)

  if(user.role == 1) {

    const deleteOrder = await orders.deleteOrder(ordersId)

    if(deleteOrder) {

      res.status(201).send(deleteOrder)
    } else{
      res.status(400).end()
    }
  }else {
    res.status(400).end()
  }

})

module.exports = router