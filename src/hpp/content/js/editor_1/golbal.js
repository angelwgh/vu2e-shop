define(function () {
	function Golbal() {
		var g = this;

		g.init = function () {
			g.initHeaderStyle()
		}

		g.initHeaderStyle = function () {
			g.header_style = {
				bgColor: '#000',
				color: '#FFF',
				fontSize: '15px',
				show: true,
				title: {
					fontSize: '20px'
				}
			}


		}

		g.panel_data = [
						{
							editors:[
								{
									type: 'img',
									
									componentName: 'hpp-img-editor',
									locked:false,
									src:'',
									top:0,
									left:0,
									width: '100%',
									height: 60,
									rotate:0,
									backgroundColor:'#ff5b83',
									borderColor:'transparent',
									borderWidth:0,
									borderStyle:'solid',
									borderRadiusWidth:30,
									fixed:true,
									borderTopLeftRadius_w:30,
									borderTopLeftRadius_h:30,
									borderTopRightRadius_w:30,
									borderTopRightRadius_h:30,
									borderBottomLeftRadius_w: 0,
									borderBottomLeftRadius_h: 0,
									borderBottomRightRadius_w:0,
									borderBottomRightRadius_h:0,
								},
								{
									type: 'text',
									fixed:false,
									componentName: 'hpp-text-editor',
									content:'嗨披详情页',
									top:10,
									left:'30%',
									defaultWidth:'40%',
									width: '40%',
									defaultHeight:20,
									height: 20,
									lineHeight: 1,
									rotate:0,
									scaleX:1,
									scaleY:1,
									fontFamily: 'Microsoft YaHei',
									fontSize: 20,
									letterSpacing: 0,
									color: '#fff',
									textAlign: 'center',
									locked:false,
									webkitTextStrokeColor: 'transparent',
									webkitTextStrokeWidth: 1,
								},
								{
									type: 'text',
									fixed:false,
									componentName: 'hpp-text-editor',
									content:'HIPI DETAIL',
									top:30,
									left:'30%',
									defaultWidth:'40%',
									width: '40%',
									defaultHeight:20,
									height: 20,
									lineHeight: 1,
									rotate:0,
									scaleX:1,
									scaleY:1,
									fontFamily: 'Microsoft YaHei',
									fontSize: 15,
									letterSpacing: 0,
									color: '#fff',
									textAlign: 'center',
									locked:false,
									webkitTextStrokeColor: 'transparent',
									webkitTextStrokeWidth: 1,
								},
							],
							width:'100%',
							height:60,
							type: 'module',
						},
						{
							editors:[
								{
									type: 'text',
									fixed:false,
									componentName: 'hpp-text-editor',
									content:'嗨披详情页',
									top:10,
									left:'20%',
									defaultWidth:'60%',
									width: '60%',
									defaultHeight:40,
									height: 40,
									lineHeight: 1,
									rotate:0,
									scaleX:1,
									scaleY:1,
									fontFamily: 'Microsoft YaHei',
									fontSize: 40,
									letterSpacing: 0,
									color: '#000',
									textAlign: 'center',
									locked:false,
									webkitTextStrokeColor: 'transparent',
									webkitTextStrokeWidth: 1,
								},
								{
									type: 'img',
									componentName: 'hpp-img-editor',
									locked:false,
									src:'',
									top:450,
									left:'2%',
									width: '96%',
									height: 200,
									borderRadiusWidth:0,

									rotate:0,
									fixed:false,
									borderTopLeftRadius_w:0,
									borderTopLeftRadius_h:0,
									borderTopRightRadius_w:0,
									borderTopRightRadius_h:0,
									borderBottomLeftRadius_w: 0,
									borderBottomLeftRadius_h: 0,
									borderBottomRightRadius_w:0,
									borderBottomRightRadius_h:0,
									backgroundColor:'transparent',
									borderColor:'#ccc',
									borderWidth:1,
									borderStyle:'solid',
								}
							],
							type: 'module',
							left:0,
							bgc:'#fff',
							width:'100%',
							height:800
						}
					]

		g.init()


	}




	return new Golbal()
})