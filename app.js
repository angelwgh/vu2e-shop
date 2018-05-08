const express = require('express')

const app = express()

// app.use('/static', express.static('src'));
app.use('/sirui', express.static('src/sirui'))
// app.use('/m-sirui', express.static('src/sirui/mobile'))
app.get('', (req, res) => {
	res.send('')
})

app.listen(8007, () => {
	console.log('服务器启动成功')
	// console.log(111)
})