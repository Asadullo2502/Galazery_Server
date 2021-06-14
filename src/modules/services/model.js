const { rows, row } = require("../../../util/database")

/*
  all Services model
*/
const allServicesSQL = `
  select * from services
`
const allServices = () => rows(allServicesSQL)

/*
  create Services model
*/
const createServicesSQL = `
  insert into services(
    service_name
  ) values
  ($1) RETURNING *
`

const createServices = ({serviceName}) => row(createServicesSQL, serviceName)

/*
  DELETE Services model
*/
const deleteServicesSQL = `
  delete from services
  where
    service_id = $1
  returning *
`

const deleteServices = (serviceId) => row(deleteServicesSQL, serviceId)

module.exports.createServices = createServices
module.exports.allServices = allServices
module.exports.deleteServices = deleteServices
