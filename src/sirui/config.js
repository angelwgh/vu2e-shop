// 页面的一些数据


// 对象继承
function inherit(sub, superType) {
	var prototype = superType.prototype;
	prototype.constructor = sub;
	sub.prototype = prototype
}

// 数据库对象
function Database() {
	this.data = {
		list: []
	}
}

Database.prototype = {
	constructor: Database,

	// 查找一个
	findOne: function (key, value) {
		var list = this.data.list;
		var len = list.length
		if(key){
			for(var i = 0; i < list.length; i++){
				if(list[i][key] == value) return list[i]
			}
		}else {
			return list[0]
		}
		
	},

	find: function (count, key, value) {
		console.log(count)
		var list = this.data.list;
		var len = list.length
		var arr = []
		var num = 0;
		for(var i = 0; i < list.length; i++){
			if(key){
				if(list[i][key] === value){
					arr.push(list[i])
					num ++
				}
			}else {
				arr.push(list[i])
				num ++
			}

			if(count && num >= count){
				return arr
			}
			// if(list[i][key] === value) return list[i]
		}
		return arr
	},

	count: function (key, value) {
		var list = this.data.list;
		var len = list.length
		var num = 0;
		for(var i = 0; i < list.length; i++){
			if(key){
				if(list[i][key] === value){
					num ++
				}
			}else {
				num ++
			}

			// if(list[i][key] === value) return list[i]
		}
		return num
	}
};

// 代理数据

function Agent() {
	Database.call(this)

	this.data = {
		list: [
			{	
				id:0,
				type:'organization',
				'imgsrc': '../content/images/2.jpg',
		        'typeName': '代理机构',
		        'name': '司睿知识产权有限公司',
		        'price': '待议',
		        'adress': '浙江省金华市义乌市'
			},
			{	
				id:1,
				type: 'organization',
				'imgsrc': '../content/images/2.jpg',
		        'typeName': '代理机构',
		        'name': '司睿知识产权有限公司',
		        'price': '待议',
		        'adress': '浙江省金华市义乌市'
			},
			{
				id:2,
				type:'person',
				'imgsrc': '../content/images/agent/1.jpg',
		        'typeName': '代理人',
		        'name': '王宝睿',
		        'price': '待议',
		        'adress': '浙江省 金华市 义乌市'
			},
			{
				id:3,
				type: 'person',			
				'imgsrc': '../content/images/agent/1.jpg',
		        'typeName': '代理人',
		        'name': '王宝睿',
		        'price': '待议',
		        'adress': '浙江省 金华市 义乌市'
			}
		]
	}
}


// 版权数据

function Copyright(argument) {
	Database.call(this)

	this.data = {
		list: [
			{
				'id':1,
				'imgsrc':'../content/images/parent/001.png',
				'name':'XBYZshop微连锁系统[简称：XBYZshop]V8.0',
				'sellStatus':'待出售',
				'makeCode':'2017SR014655',
				'lawStatus':'',
				'makeDate':'',
				'validDate':'',
				'price':null,
				'copyrightType':'软件作品',
				'worksType':'',
				'copyrightOwner':'义乌市兴邦网络科技有限公司',
				'author':'',
				'complateDate':'2016年11月17日',
				'complateAdress':'',
				'isPublish':'',
				'publishDate':'2016年11月18日',
				'publishAdress':'',
				'doc':''

			},
			{
				'id':2,
				'imgsrc':'../content/images/parent/001.png',
				'name':'兴邦云指O2O系统[简称：XBYZO2O]',
				'sellStatus':'待出售',
				'makeCode':'2017SR171993',
				'lawStatus':'',
				'makeDate':'',
				'validDate':'',
				'price':null,
				'copyrightType':'软件作品',
				'worksType':'',
				'copyrightOwner':'义乌市兴邦网络科技有限公司',
				'author':'',
				'complateDate':'2017年03月01日',
				'complateAdress':'',
				'isPublish':'',
				'publishDate':'2017年03月02日',
				'publishAdress':'',
				'doc':''

			},
			{
				'id':3,
				'imgsrc':'../content/images/parent/001.png',
				'name':'兴邦云指分销系统[简称：兴邦云指]V8.0',
				'sellStatus':'待出售',
				'makeCode':'2017SR019376',
				'lawStatus':'',
				'makeDate':'',
				'validDate':'',
				'price':null,
				'copyrightType':'软件作品',
				'worksType':'',
				'copyrightOwner':'义乌市兴邦网络科技有限公司',
				'author':'',
				'complateDate':'2016年11月17日',
				'complateAdress':'',
				'isPublish':'',
				'publishDate':'2016年11月18日',
				'publishAdress':'',
				'doc':''

			}
		]
	}
}

function TradeMark() {
	Database.call(this)

	this.data = {
			list :[
			{
				id:1,
				imgsrc: '../content/images/parent/01.png',
				formby: '持有人',
				name: '地球人',
				catgory: "14 珠宝钟表",
				price:null,
				sellStatus:'出售中',
				'service': '表盒（礼品）；表链；电子钟表，日晷，手表，手表带，钟，钟表构建，钟表盘（钟表制造），钟表指针（钟表制造）',
		    	'info':'表盒（礼品）；表链；电子钟表，日晷，手表，手表带，钟，钟表构建，钟表盘（钟表制造），钟表指针（钟表制造）',
		    	'cscode':'1325',
		    	'csdate':'2012年8月27日',
		    	'zccode':'1337',
		    	'zcdate':'2012年11月28日',
		    	'qixian':'2012年11月28日 至 2022年11月27日',
		    	'code': '10006316',
		    	'type':'一般',
		    	'beizhu': '表盒（礼品）；表链；电子钟表，日晷，手表，手表带，钟，钟表构建，钟表盘（钟表制造），钟表指针（钟表制造）'
			},
			{
				id:2,
				imgsrc: '../content/images/parent/02.png',
				formby: '持有人',
				name: 'XBYZshop',
				catgory: "42 技术服务",
				price:null,
				sellStatus:'待出售',
				'service': '计算机编程；计算机软件更新；计算机软件出租；计算机程序复制；替他人创建和维护网站；计算机程序和数据的数据转换（非有形转换）；网络服务器出租；通过网站提供计算机技术和编程信息；云计算；软件运营服务（SaaS）',
		    	'info':'计算机编程；计算机软件更新；计算机软件出租；计算机程序复制；替他人创建和维护网站；计算机程序和数据的数据转换（非有形转换）；网络服务器出租；通过网站提供计算机技术和编程信息；云计算；软件运营服务（SaaS）',
		    	'cscode':'1554',
		    	'csdate':'2017年06月06日',
		    	'zccode':'1566',
		    	'zcdate':'2017年09月07日',
		    	'qixian':'2017年09月07日 至 2027年09月06日',
		    	'code': '20662453',
		    	'type':'一般',
		    	'beizhu': '计算机编程；计算机软件更新；计算机软件出租；计算机程序复制；替他人创建和维护网站；计算机程序和数据的数据转换（非有形转换）；网络服务器出租；通过网站提供计算机技术和编程信息；云计算；软件运营服务（SaaS）'
			},
			{
				id:3,
				imgsrc: '../content/images/parent/03.png',
				formby: '持有人',
				name: '异盟',
				catgory: "42 技术服务",
				price:null,
				sellStatus:'待出售',
				'service': '替他人创建和维护网站；网络服务器出租；通过网站提供计算机技术和编程信息；计算机软件设计；技术项目研究；提供互联网搜索引擎；计算机病毒和防护服务；计算机技术咨询；计算机硬件设计和开发咨询；替他人研究和开发新产品	',
		    	'info':'替他人创建和维护网站；网络服务器出租；通过网站提供计算机技术和编程信息；计算机软件设计；技术项目研究；提供互联网搜索引擎；计算机病毒和防护服务；计算机技术咨询；计算机硬件设计和开发咨询；替他人研究和开发新产品	',
		    	'cscode':'1554',
		    	'csdate':'2017年06月06日',
		    	'zccode':'1566',
		    	'zcdate':'2017年09月07日',
		    	'qixian':'2017年09月07日 至 2027年09月06日',
		    	'code': '20662649',
		    	'type':'一般',
		    	'beizhu': '替他人创建和维护网站；网络服务器出租；通过网站提供计算机技术和编程信息；计算机软件设计；技术项目研究；提供互联网搜索引擎；计算机病毒和防护服务；计算机技术咨询；计算机硬件设计和开发咨询；替他人研究和开发新产品	'

			},
			{
				id:4,
				imgsrc: '../content/images/parent/04.png',
				formby: '持有人',
				name: '遇见美',
				catgory: "26 花边配饰",
				price:null,
				sellStatus:'出售中',
				'service': '胸罩衬骨',
		    	'info':'胸罩衬骨',
		    	'cscode':'1436',
		    	'csdate':'2014年12月20日',
		    	'zccode':'1566',
		    	'zcdate':'2015年03月21日',
		    	'qixian':'2015年03月21日 至 2025年03月20日',
		    	'code': '12523984',
		    	'type':'一般',
		    	'beizhu': '胸罩衬骨'

			}
		]
	}
}

inherit(Agent, Database)
inherit(Copyright, Database)
inherit(TradeMark, Database)



;(function (root, factory) {
	root.configData = factory(root);

})(this, function (window) {
	var agent = new Agent()
	var trademark = new TradeMark()
	var copyright = new Copyright();

	function ConfigData() {
		this.init()
	}

	ConfigData.prototype = {
		constructor: ConfigData,

		init: function() {
			this.noop = function() {}

			// this.getTradeMarkDetaail()
		},


		// 模拟代理数据
		getAgentsData: function (opt) {
			// console.log(Mock)
			
			var success = opt.success || this.noop;
			var type = opt.type || 'all';
			var key = type === 'all' ? null : 'type';
			var pageNo = opt.pageNo || 4;
			var data = {};


			data = Mock.mock({
			    'list': agent.find(pageNo, key, type)
			})
			
			success(data)
		},
		// 模拟商标市场
		getTradeMarkList: function (opt) {
			
			var success = opt.success || this.noop;
			var catgorys = ["01 化学原料", "02 颜料油漆", "03 化妆品", "04 燃料油脂", "05 医药", "06 五金金属", "07 机械设备", "08 手工器械", "09 电子电脑", "10 医疗器械", "11 家用电器", "12 运输工具", "13 军火烟火", "14 珠宝钟表", "15 乐器", "16 办公文具", "17 橡胶制品", "18 皮革箱包", "19 建筑材料", "20 家具", "21 厨房洁具", "22 绳网袋篷", "23 纺织纱线", "24 布料床单", "25 服装鞋帽", "26 花边配饰", "27 地毯席垫", "28 体育玩具", "29 食品", "30 小食配料", "31 水果花木", "32 啤酒饮料", "33 酒", "34 烟草烟具", "35 广告贸易", "36 金融物管", "37 建筑修理", "38 通讯传媒", "39 运输旅行", "40 材料加工", "41 教育娱乐", "42 技术服务", "43 餐饮酒店", "44 医疗园艺", "45 法律"];
			var hotTypes = ['服装纺织', '食品饮料', '餐饮酒店', '化妆美容', '医药设备', '日常用品', '家居用具', 'IT互联网', '化工能源', '电子仪器', '机械制造', '建材五金'];
			var fromby = ['持有人', '平台经纪', '代理'];
			var tmTypes = ['中文', '英文', '图形', '中文+英文', '数字']
			data = Mock.mock({
				'jsonBody':trademark.find(),
				'pageNo':opt.pageNo || 1,
				'pageSize': opt.pageSize || 24,
				'totalSize': trademark.count()
			})
			setTimeout(function () {
				success(data)
			})
			
		},
		// 模拟专利列表
		getPatentsList: function (opt) {
			var success = opt.success || this.noop;
			var hotTypes= ['生活家居','机械','物理','化学','电学','固定建筑','物流运输','纺织','医疗','教育','其他'];
			var patentsType = ['发明专利','实用新型专利','外观设计专利'];
			var lawStatus = ['转让','授权/许可']
			var names = ['治疗癌症的中草药','一种调节血糖奶粉的制备方法','可调稳频稳压变频变压电源','雷奈酸锶七水合物的制备方法','艾拉莫德口服双层控释制剂','一种口腔粘贴片及其制备方法']
			data = Mock.mock({
				'jsonBody|6':[{
					'id|50000-100000':1,
					'imgsrc':'https://img.393.com/patent//201802/05/9d589ffdc8ccf1b6950c0cf6cbe46433.jpg',
					'patentsType|1': patentsType,
					'name|1':names,
					// 'catgory|1':catgorys,
					'price|10000-100000':1,
					'hotTypes|1': hotTypes,
					'info': '一种调节血糖奶粉的制备方法，以铬元素、有机锌元素、膳食纤维、蜂胶和植物提取物为功能成分生产调节血糖奶粉基料，调节血糖奶粉基料与脱脂奶粉按1∶9重量比混合后得到调节血糖奶粉。本发明用植物油部分取代动物脂肪，含有大量油酸、亚油酸，减少了胆固醇和高饱和脂肪对糖尿病患者产生的不利影响。最终产品是奶粉或奶片，营养丰富，食用方便，适合中老年人食用。'
				}],
				'pageNo':opt.pageNo || 1,
				'pageSize': opt.pageSize || 24,
				'totalSize': 100
			})
			setTimeout(function () {
				success(data)
			})
		},

		// 模拟版权列表
		getCopyrightList: function (opt) {
			
			var success = opt.success || this.noop;
			var pageSize = opt.pageSize || 10
			var copyrightType= ['文字作品','美术作品','音乐、舞蹈等艺术作品','建筑作品','摄影作品','影视作品','软件作品','工程作品','其他'];
			// var patentsType = ['发明专利','实用新型专利','外观设计专利'];
			var lawStatus = ['转让','授权/许可']
			var names = ['无字天书（有内容）','力蒙互联企业宣言与约章','基于安卓平台的河源美吃宝APP软件','50首音乐作品','基于IOS平台的河源美吃宝APP软件','数控车床DNC控制软件V1.0']
			data = Mock.mock({
				'jsonBody':copyright.find(),
				'pageNo':opt.pageNo || 1,
				'pageSize': opt.pageSize || 24,
				'totalSize': copyright.count()
			})
			setTimeout(function () {
				success(data)
			})
		},

		// 模拟代理列表
		getAgentList: function (opt) {
			var success = opt.success || this.noop;
			var pageSize = opt.pageSize || 10
			var copyrightType= ['文字作品','美术作品','音乐、舞蹈等艺术作品','建筑作品','摄影作品','影视作品','软件作品','工程作品','其他'];
			var agentType=['代理机构','代理人'];
			var lawStatus = ['转让','授权/许可']
			var names = ['北京中物商协国际知识产权代理有限公司','南京政道财务咨询有限公司','无锡佳信知识产权代理有限公司','佛山市科智知识产权代理有限公司','深圳市爵朗知识产权有限公司']
			data = Mock.mock({
				'jsonBody|16':[{
					'id|50000-100000':1,
					'imgsrc':'../content/images/2.jpg',
					'agentType|1': agentType,
					'name|1':names,
					'adress': '@city(true)',
					// 'catgory|1':catgorys,
					'price|10000-100000':1,
					// 'hotTypes|1': hotTypes,
					// 'info': '一种调节血糖奶粉的制备方法，以铬元素、有机锌元素、膳食纤维、蜂胶和植物提取物为功能成分生产调节血糖奶粉基料，调节血糖奶粉基料与脱脂奶粉按1∶9重量比混合后得到调节血糖奶粉。本发明用植物油部分取代动物脂肪，含有大量油酸、亚油酸，减少了胆固醇和高饱和脂肪对糖尿病患者产生的不利影响。最终产品是奶粉或奶片，营养丰富，食用方便，适合中老年人食用。'
				}],
				'pageNo':opt.pageNo || 1,
				'pageSize': opt.pageSize || 24,
				'totalSize': 100
			})
			setTimeout(function () {
				success(data)
			})
		},

		// 获取详情数据
		getDetail: function (opt) {
			var id = opt.data.id;
			var type = opt.data.type;
			var success = opt.success || this.noop;
			console.log(type)
			var data = this['getDetail_'+ type](id)
			

			setTimeout(function () {
				success(data)
			})
		},

		// 商标详情
		getDetail_mark: function (id) {
			var sellStatus = ['未上架','出售中','已售出'];
			var catgorys = ["01 化学原料", "02 颜料油漆", "03 化妆品", "04 燃料油脂", "05 医药", "06 五金金属", "07 机械设备", "08 手工器械", "09 电子电脑", "10 医疗器械", "11 家用电器", "12 运输工具", "13 军火烟火", "14 珠宝钟表", "15 乐器", "16 办公文具", "17 橡胶制品", "18 皮革箱包", "19 建筑材料", "20 家具", "21 厨房洁具", "22 绳网袋篷", "23 纺织纱线", "24 布料床单", "25 服装鞋帽", "26 花边配饰", "27 地毯席垫", "28 体育玩具", "29 食品", "30 小食配料", "31 水果花木", "32 啤酒饮料", "33 酒", "34 烟草烟具", "35 广告贸易", "36 金融物管", "37 建筑修理", "38 通讯传媒", "39 运输旅行", "40 材料加工", "41 教育娱乐", "42 技术服务", "43 餐饮酒店", "44 医疗园艺", "45 法律"];
			console.log(trademark.findOne('id',id))
			
			var data = Mock.mock({
			    'jsonBody':[trademark.findOne('id',id)]
			})

			return data
		},
		// 专利详情
		getDetail_patent: function (id) {
			console.log(id)
			var sellStatus = ['未上架','出售中','已售出'];
			var patentsType = ['发明专利','实用新型专利','外观设计专利'];
			var hotTypes= ['生活家居','机械','物理','化学','电学','固定建筑','物流运输','纺织','医疗','教育','其他'];
			return Mock.mock({
				'jsonBody':[{
					'id':id,
					'imgsrc':'https://img.393.com/patent//201802/05/9d589ffdc8ccf1b6950c0cf6cbe46433.jpg',
					'name':'一种调节血糖奶粉的制备方法',
					'sellStatus|1':sellStatus,
					'patentsType|1':patentsType,
					'patentCode': 'CN200610019591.2',
					'hotTypes|1': hotTypes,
					'makeDate':'',
					'validDate':'',
					'lawStatus':'',
					'price|10000-100000':1,
					'info':'一种调节血糖奶粉的制备方法，以铬元素、有机锌元素、膳食纤维、蜂胶和植物提取物为功能成分生产调节血糖奶粉基料，调节血糖奶粉基料与脱脂奶粉按1∶9重量比混合后得到调节血糖奶粉。本发明用植物油部分取代动物脂肪，含有大量油酸、亚油酸，减少了胆固醇和高饱和脂肪对糖尿病患者产生的不利影响。最终产品是奶粉或奶片，营养丰富，食用方便，适合中老年人食用。'
				}]
			})
		},
		// 著作权详情
		getDetail_copyright: function (id) {
			var sellStatus = ['未上架','出售中','已售出'];
			var copyrightType= ['文字作品','美术作品','音乐、舞蹈等艺术作品','建筑作品','摄影作品','影视作品','软件作品','工程作品','其他'];

			console.log(id)
			return Mock.mock({
				'jsonBody':[copyright.findOne('id',id)]
			})
		}
	};


	return new ConfigData()
})