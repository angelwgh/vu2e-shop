const express = require('express')

const app = express()


app.use('/sirui', express.static('src/sirui'))
app.use('/hpp', express.static('src/hpp'))

app.get('', (req, res) => {
	res.send('')
})

app.listen(8007, () => {
	console.log('服务器启动成功')
	// console.log(111)
})