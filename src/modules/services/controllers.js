const router = require("express").Router()

const service = require("./model")
const { verify } = require("../../../util/jwt")

/*
    GET SERVICES
*/

router.get("/", async(req, res) => {
  const services = await service.allServices()
  res.send(services)
})


/*
    create SERVICES
*/

router.post("/", async (req, res) => {

  try {

    const user = verify(req.headers.access_token)
    // const user = {role: 1}
   
    if(user.role == 1) {

      res.status(201).send(await service.createServices(req.body))
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
  DELETE Services
*/
router.delete("/del/:id", async(req, res)=> {

  const servicesId = req.params.id

  const user = await verify(req.headers.access_token)

  if(user.role == 1) {

    const deleteServices = await service.deleteServices(servicesId)

    if(deleteServices) {

      res.status(201).send(deleteServices)
    } else{
      res.status(400).end()
    }
  }else {
    res.status(400).end()
  }

})

module.exports = router