const { pool, router, Result } = require('../../../connect')
//请求地址'/login'
router.all('/', (req, res) => {
  pool.getConnection((err, conn) => {
    //从连接池中哪一个连接
    conn.query('SELECT * FROM students', (e, r) => {
      let arr = r
      let obj = { name: '小刘', sex: '男', age: 24, address: '北京', id: 7 }
      arr.push(obj)
      res.json(new Result({ data: arr }))
    })
    conn.release() //释放连接池
  })
})
//请求地址'/login/login'
router.all('/login', (req, res) => {
  pool.getConnection((err, conn) => {
    //从连接池中哪一个连接
    let obj = { name: '小刘', sex: '男', age: 24, address: '北京', id: 7 }
    let arr = []
    arr.push(obj)
    res.json(new Result({ data: arr }))
    conn.release() //释放连接池
  })
})
module.exports = router
