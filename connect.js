const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser') //解析参数
const app = express()
const router = express.Router()
//数据库基本配置信息
const option = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'test',
  connectTimeout: 5000, //连接超时
  multipleStatements: false, //是否允许一个query中包含多条sql语句
}

app.use(cors()) //解决跨域
app.use(bodyParser.json()) //json请求
app.use(bodyParser.urlencoded({ extended: false })) //表单请求
app.listen(81, () => console.log('服务启动'))
let pool
//建立重连机制
repool()

function Result({ code = 1, msg = '', data = {} }) {
  this.code = code
  this.msg = msg
  this.data = data
}
function repool() {
  pool = mysql.createPool({
      ...option,
      waitForConnections:true,//当无连接池可用时，等待(true)还是报错(false)
      connectionLimit: 100,//连接数限制
      queueLimit:0//最大连接等待数（0为不限制）
  })
  //监听error事件，如果err.code返回了以下字符串，那么我们就重新发起连接
  pool.on(
    'error',
    (err) => err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(reconn, 2000)
  )
}
module.exports={pool,Result,router,app}
