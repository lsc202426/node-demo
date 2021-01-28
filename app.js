

const { app, pool, Result } = require('./connect')
const api = require('./api/index')

app.all('*', (req, res, next) => {
    //如果请求头中没有x-token，跳过路由中间件
    // if(!req.headers['x-token']){
    //     return next('router')
    // }
  //处理全局拦截
  next()
})

app.all('/', (req, res) => {
  pool.getConnection((err, conn) => {
      console.log(11)
    res.json({ a: 'b' })
    conn.release() //释放连接池，等待别的链接使用
  })
})
//遍历添加接口
api.map(item=>{
    app.use(item.title,item.url)
})
app.listen(82, () => {
  console.log('服务启动')
})
