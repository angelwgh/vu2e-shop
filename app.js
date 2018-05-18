const express = require('express')

const app = express()

app.set("viewengine",'ejs');// 使用模板引擎
app.set("views",__dirname+"/views");



app.use('/sirui', express.static('src/sirui'))
app.use('/hpp', express.static('src/hpp'))
app.use('/demo', express.static('src/demo'))

app.get('/',  (req, res) => {
	res.render('index.ejs', {name: 'ejs'})
})
app.get('/jsonp', (req, res)=>{
	console.log(req.url)
	res.send('alert("jsonp")')
})

app.listen(8007, () => {
	console.log('localhost:8007')
	console.log('服务器启动成功')
	// console.log(111)
})


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}