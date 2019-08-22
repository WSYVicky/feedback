//(1)引入模块
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

//(2)写数据
var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

//（3）创建web服务器
http.
    createServer(function(req,res){
      //（4）路径转为对象
      var parseObj = url.parse(req.url,true)
      //（5）获取URL中？之后的内容
      var pathname = parseObj.pathname

      //（6）路径判断
      if(pathname === '/'){
        fs.readFile('./views/index.html',function(err,data){
          if(err){
            return res.end('404 Not Found.')
          }
          var htmlStr = template.render(data.toString(),{
            comments: comments
          })
          res.end(htmlStr)
        })
      }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function (err,data) {
          if(err){
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
        // 统一处理请求路径以/public/开头的
      }else if(pathname.indexOf('/public/') === 0){
        fs.readFile('.'+pathname,function(err,data){
          if(err){
            return res.end('404 Not Found')
          }
          res.end(data)
        })
      }else if(pathname === '/pinglun'){
        var comment = parseObj.query
        comment.dateTime = '2015-10-16'
        comments.unshift(comment)

        res.statusCode = 302
        res.setHeader('Location','/')
        res.end()
      }else{
        fs.readFile('./views/404.html',function (err,data) {
          if(err){
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
      }
    })
    .listen(3000,function () {
      console.log('running...')
    })