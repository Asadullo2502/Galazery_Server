const { rows, row } = require("../../../util/database")

/*
  Get Orders
*/
const allOrdersSQL = `
  select
    o.order_id,
    o.order_about,
    o.tel,
    o.created_at,
    s.service_name
  from
    orders as o
  join
    services as s on s.service_id = o.service_id;
`

const allOrders = () => rows(allOrdersSQL)


/*
  Create Order
*/
const createOrderSQL = `
  insert into orders(service_id, order_about, tel)
  values
    ($1, $2, $3)
  returning *
`

const createOrder = ({serviceId, orderAbout, tel}) => row(createOrderSQL, serviceId, orderAbout, tel)


/*
  DELETE Order model
*/
const deleteOrderSQL = `
  delete from orders
  where
    order_id = $1
  returning *
`

const deleteOrder = (ordersId) => row(deleteOrderSQL, ordersId)

module.exports.allOrders = allOrders
module.exports.createOrder = createOrder
module.exports.deleteOrder = deleteOrder