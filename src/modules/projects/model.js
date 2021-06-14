const { row, rows } = require("../../../util/database")

/*
  ALL projects model
*/
const projectsSQL = `
  select * from projects
`

const projects = () => rows(projectsSQL)


/*
  Create project model
*/
const createProjectSQL = `
  insert into projects(project_name, project_photo, project_link) values
    ($1, $2, $3)
  returning *
`

const createProject = ({ projectName, projectPhoto, projectLink }) => row(createProjectSQL, projectName, projectPhoto, projectLink)


/*
  DELETE project
*/
const deleteProjectSQL = `
  delete from projects
  where
    project_id = $1
  returning *
`

const deleteProject = (projectId) => row(deleteProjectSQL, projectId)



module.exports.projects = projects
module.exports.createProject = createProject
module.exports.deleteProject = deleteProject