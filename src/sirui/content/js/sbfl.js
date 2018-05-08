
;(function (root, factory) {
	root.trademark = factory(root)
	// if(root.trademark){

	// }
})(this, function (window) {

	//弹窗
	function Dialog() {
		// options = options || {}
		// this.title = options.title || '弹窗'
		// console.log(this.title)
		this.isShow = false;
		this.init()
	}

	Dialog.prototype = {
		init: function () {
			this.opt = {
				title: '弹窗',
				content: '<div>弹窗内容</div>'
			}
			this.renderDialogTemplate()
		},

		renderDialogTemplate: function () {
			var self = this;
			var html = '<div class="m-dialog" style="display: none">\
							<div class="inner-box">\
								<div class="dialog-header">\
									<div class="dialog-title"></div>\
									<span class="dialog-close" id="J_dialog_close">X</span>\
								</div>\
								<div class="dialog-content">\
								提示框内容\
								</div>\
								<div class="dialog-footer"></div>\
							</div>\
							\
						</div>'
			var $el = this.$el = $(html)
			$('body').append(this.$el)
			$el.find('.inner-box').height($(window).height() - 200)
			$el.find('.dialog-content').height($(window).height() - 300)
			// console.log($(window).height())

			this.$el.on('click', function () {
				// console.log(this)
				// console.log(event.target)
				if(this == event.target){
					self.hide()
				}
				// self.hide()

			})

			this.$el.find('.dialog-close').on('click', function () {
				// console.log(event.target)
					self.hide()
			})

			$(document).on('keyup', function (event) {
				// console.log(event.keyCode)
				if(event.keyCode == 27){
					self.hide()
				}
			})
		},
		renderDialog: function (options) {
			console.log(options)
			var opt = this.opt = options || this.opt;
			this.$el.find('.dialog-title').text(opt.title)
			this.$el.find('.dialog-content').html('').append(opt.content)
		},
		show: function (options) {
			this.renderDialog(options);

			if(this.isShow) return
			this.$el.fadeIn(200)
			this.isShow = true;
		},

		hide: function () {
			this.$el.fadeOut(200)
			this.isShow = false;
		}
	};

	

	// 商标分类页面
	function Trademark() {
		// body...
		this.init()
	}

	Trademark.prototype =  {
		constructor: Trademark,

		init: function () {
			this.dialog = new Dialog()
		},

		config: function (options) {
			// console.log(options)
			this.options = options;
			this.nav_data = options.nav_data;
			this.main_data = options.main_data
			this.detail_data = options.detail_data
			return this
		},

		render: function () {
			
			this.renderClassNav()
			this.renderMain()
			this.addEvent()
		},

		// 渲染商标导航
		renderClassNav: function () {
			var $nav =  this.$trademarkNav= $('#J_trademark_nav');
			var data = this.nav_data
			for(var i = 0; i < data.length; i++){
				var $div = $('<div>')
				$div.addClass('dw');
				$div.html('<a href="'+data[i].href+'">'+data[i].text+'</a>');
				$nav.append($div)
			}
			// var $item = $('<div>')
		},
		// 切换隐藏还是显示商标导航
		toggleNavShow: function (el) {
			$(el).text($(el).text() == '展开' ? '隐藏' : '展开')
			this.$trademarkNav.toggle(200)
		},

		// 渲染主页面数据
		renderMain: function () {
			var $main = this.$trademarkMain= $("#J_main_data");
			var data = this.main_data;

			for(var i = 0; i < data.length; i++){
				var $right = $('<div>').addClass('right')
				var list = data[i].list;


				$.each(list,function (index, item) {
					var $item = $('<div>').addClass('small-category')
								.attr({'data-category': [i,index].join('-')});
					var html = '<span>'+item.title+'</span><a>'+item.content+'</a>'
					$right.append($item.html(html))
				})
				var $div = $('<div>').attr({'id': 'fl' + (i+1)})
						  .addClass('big-category')
						  .append($('<div>').addClass('sbfl2')
						  	.append($('<div>').addClass('left')
						  		.append($('<h1>').text(data[i].title))
						  		.append($('<span>').addClass('line'))
						  		.append($('<h3>').html(data[i].comment))
						  	)
						  	.append($right)
						  )

				// console.log(data[i].list)
						  // .append($('<h1>').text(data[i].title))
				// console.log($div)
				$main.append($div)
			}

		},

		renderDetail: function (options) {
			var big = this.category.big_category;
			var small = this.category.small_category;
			var data = this.detail_data[big]
			var len = data.list.length;
			var item = data.list[small]
			console.log(data)
			console.log(options)

			var html = '<div class="sbfl-dialog">'
							// <div class="left">\
								// <h1>'+data.title+'</h1>\
								// '
				// for(var i = 0; i < len; i++){
				// 		html += '<div class="sbflhf">\
				// 					<h3 data-small="'+i+'">'+data.list[i].title+'</h3>\
				// 				</div>'
				// }
				// html +=		'</div>'
				
				html += '<div class="sbfl-cell">\
							<div class="title">\
								'+item.content[0].title+'(<span style="color:red">'+item.content[0].ver+'</span>)\
							</div>\
							<div class="content">'+(item.content[0].content || '')+'</div>\
						</div>\
						<div class="sbfl-cell">\
							<div class="title">\
								'+item.content[1].title+'(<span style="color:red">'+item.content[1].ver+'</span>)\
							</div>\
							<div class="content">'+(item.content[1].content||'')+'</div>\
						</div>'
				
					html +=	'</div>'

			var dialog = this.dialog
			dialog.show({title: data.title, content: html})

		},
		// 添加事件
		addEvent: function () {
			var self = this
			var $main = this.$trademarkMain;
			
			$main.find('.small-category').on('click', function () {
				// dialog.show()
				var categorys = $(this).data().category.split('-')
				// console.log(categorys)
				self.category = {
					big_category:categorys[0],
					small_category:categorys[1]
				}
				self.renderDetail()
			})

			$('.m-dialog').on('click', '.sbflhf',function (event) {
				console.log($(event.target).data().small)
				self.category.small_category = $(event.target).data().small
				self.renderDetail()
			})

		}

	};

	// console.log(window)


	return new Trademark()

})