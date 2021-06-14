const path = require("path")
const router = require("express").Router()
const { v4 } = require("uuid")

const { verify } = require("../../../util/jwt")


const projects = require("./model.js")

/*
  GET all Project
*/
router.get("/", async (req, res)=> res.send(await projects.projects()))

/*
  CREATE Project
*/
router.post("/", async (req, res) => {

  try {

    // const user = await verify(req.headers.access_token)
    let user = {role: 1}

    if(user.role == 1) {

      let { projectPhoto } = req.files
      const mimetype = projectPhoto.mimetype.split("/")


      let photoName = v4()


      const imgPath = path.resolve("public", 'images', photoName + "." + mimetype[1])


      if(mimetype[0] === "image") {
        projectPhoto.mv(imgPath, (err) =>{

        })

        const newProject =  await projects.createProject({...req.body, projectPhoto: photoName + "." + mimetype[1]})

        if(newProject) {
          res.status(201).send(newProject)
        }else {
          res.status(400).end()
        }
      }
      else {
        res.status(401).end()
      }

    }

  }
  catch(err) {
    res.statusMessage = err
    res.status(401).end()
    console.log(err);
  }

})

/*
  DELETE Project
*/
router.delete("/del/:id", async(req, res)=> {

  const projectId = req.params.id

  const user = await verify(req.headers.access_token)

  if(user.role == 1) {

    const deleteProject = await projects.deleteProject(projectId)

    if(deleteProject) {

      res.status(201).send(deleteProject)
    } else{
      res.status(400).end()
    }
  }else {
    res.status(400).end()
  }

})



module.exports = router