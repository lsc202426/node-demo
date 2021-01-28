const { pool, router, Result } = require('../../../connect')
router.all('/', (req, res) => {
  pool.getConnection((err, conn) => {
    //从连接池中哪一个连接
    conn.query('SELECT * FROM students', (e, r) =>
      res.json(new Result({ data: r }))
    )
    conn.release() //释放连接池
  })
})
module.exports = router;
