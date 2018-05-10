(function (root, factory) {
	root.functionBar = factory()
})(this, function (root) {
	var functionItem = {
		template:'<div class="m-function-item">'+
					'<div is="yd-layout">\
						<div :style="{\
									paddingTop: headTop,\
									backgroundColor: headTopColor\
								}"\
							  slot="navbar">\
							<div is="yd-navbar"\
								 :title="title"\
								 :bgcolor="headStyle.bgcolor"\
								 :color="headStyle.color">\
								 <div slot="left" :style="{color: headStyle.color}"\
								 	 v-on:click="back">\
									<div is="yd-navbar-back-icon" :color="headStyle.color">返回</div>\
								 </div>\
							</div>\
						</div>\
						<div class="container">\
							<div class="item-list-group flex">\
								<div class="item"\
								 	  v-for="item in itemList"\
								 	  :key="item.name">\
									<div class="icon" v-on:click="choice(item)">\
										<img :src="item.src"/>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>',
			props:['type'],
			data: function () {
				var head_style = golbal.head_style_white;
				// console.log(head_style)
				var listGroup = {}
					listGroup.addGroup = function (type, name, num) {
						var arr = [];
						for(var i = 0; i < num; i++){
							var cname = name + '_' + (i + 1)
							var obj = {
								src:'../../content/images/editor/'+cname+'.png',
								type: type,
								name: cname,
							}

							arr.push(obj)
						}
						this[type] = arr;
					}
					listGroup.addGroup('text', 'text', 2)
					listGroup.addGroup('img', 'img', 10)
					listGroup.addGroup('add_video', 'add_video', 1)
					listGroup.addGroup('detail', 'module', 12)
					console.log()
				return {
					headTop: golbal.headTop,
					headTopColor: golbal.headTopColor,
					headStyle: {
						bgcolor: head_style.bg_color,
						color: head_style.color
					},
					title:'功能栏',
					listGroup:listGroup
				}
			},
			computed: {
				itemList: function () {
					return this.listGroup[this.type]
				}
			},
			methods: {
				back: function () {
					this.$emit('close')
				},
				choice: function (item) {
					this.$emit('choice', item)	
				}
			},
			created: function () {
				console.log(this.type)
			}
	}



	return {
		components: {
			'function-item': functionItem
		},
		template:'<div class="m-function-bar">'+
					'<div is="yd-layout">\
						<div :style="{\
									paddingTop: headTop,\
									backgroundColor: headTopColor\
								}"\
							  slot="navbar">\
							<div is="yd-navbar"\
								 :title="title"\
								 :bgcolor="headStyle.bgcolor"\
								 :color="headStyle.color">\
								 <div slot="left" :style="{color: headStyle.color}"\
								 	 v-on:touchend="back">\
									<div is="yd-navbar-back-icon" :color="headStyle.color">返回</div>\
								 </div>\
							</div>\
						</div>\
						<div class="container">\
							<div class="top-bar"></div>\
							<div is="yd-cell-group" class="menus-group">\
								<div is="yd-cell-item"\
									v-for="item in menus"\
									:key="item.id"\
									v-on:touchend.native="openFunctonsItem(item)"\
								>\
									<span slot="left" v-text="item.title"></span>\
									<span slot="right"><i class="iconfont icon-right-arrow"></i></span>\
								</div>\
							</div>\
						</div>\
						<transition name="slide-left">\
							<div v-if="showFunctionItem" \
								 v-bind:type="choiceType"\
								 v-on:choice="choice"\
								 v-on:close="closeFunctionItem" is="function-item"></div>\
						</transition>\
					</div>\
				</div>',
		data: function () {

			return {
				headTop: golbal.headTop,
				headTopColor: golbal.headTopColor,
				headStyle: {
					bgcolor: golbal.headStyle.bgColor,
					color: golbal.headStyle.color
				},
				title:'功能栏',
				menus:[
					{
						id: 1,
						name:'text',
						title:'文字编辑'
					},
					{
						id: 2,
						name:'img',
						title:'图形导入'
					},
					{
						id: 3,
						name:'add_video',
						title:'视频导入'
					},
					{
						id: 4,
						name:'detail',
						title:'产品细节图形'
					},
					{
						id: 5,
						name:'other',
						title:'信任、资质、服务、物流标识图片'
					},
				],
				showFunctionItem: false,
				choiceType:''
			}
		},

		methods: {
			back: function () {
				// console.log(this)
				this.$emit('close')
			},
			openFunctonsItem: function (item) {
				// console.log(this.showFunctionItem)
				this.choiceType = item.name;
				this.showFunctionItem = true;
			},
			closeFunctionItem: function () {
				this.showFunctionItem = false;
			},
			choice: function (item) {
				// console.log(item)
				this.$emit('choice', item)
				this.closeFunctionItem()
			}
		}
	}
})