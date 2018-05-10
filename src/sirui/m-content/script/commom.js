;(function(){
	 var ua = window.navigator.userAgent.toLowerCase();
	 // console.log(ua)
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
       window.location.href = "../pages/index.html";
    }
    else if (ua.indexOf("iphone") > 0 || ua.indexOf("android") > 0) {
    	console.log()
       // window.location.href = "../mobile/index.html";
    } 
})()

;(function (root, factory) {
	root.commom = factory()
})(this, function () {

	// 	tab选项面板

	function Tab(selector) {
		this.$el = typeof selector ==='string' ? $(selector) : selector;
		this.$navItem = this.$el.find('.tab-nav-item');
		this.$tab = this.$el.find('.tab-item');
		this.index = 0;

		this.switchTabFn = function () {}
		var t = this;

		// t.noop = function () {}

		t.addEvent = function () {

			this.$el.on('click', '.tab-nav-item', function () {
	    		t.index = $(this).index()
	    		t.switchTab()
	    	})
		};

		// 切换选项
		t.switchTab = function (index) {
			t.index = index || t.index;
			t.$navItem.removeClass('active').eq(t.index).addClass('active');
    		t.$tab.hide().eq(t.index).fadeIn(200);
    		t.switchTabFn(t.index)
    		// t.onSwitchTab()

		};

		// 触发切换选项事件
		t.onSwitchTab = function (fn) {
			if (typeof fn == 'function'){
				t.switchTabFn = fn
			}

		}

		t.init = function () {
			t.addEvent()
			t.switchTab()
		}

		t.init()

	}


	// 底部导航
	function Footer(selector) {
		this.$el = typeof selector ==='string' ? $(selector) : selector;

		var f = this;
		this.init()

	}

	Footer.prototype = {
		init: function () {
				this.render()
				// this.renderPopuMenu()
				this.initEvent()
		},

		render: function () {
			console.log('footer')
			var html = '<div class="weui-tabbar">'+
				   		    '<a href="./index.html" class="weui-tabbar__item home">'+
				   		    	'<div class="weui-tabbar__icon">'+
				   		       		'<i class="fa fa-home"></i>'+
				   		    	'</div>'+
				   		    	'<p class="weui-tabbar__label">首页</p>'+
				   		    '</a>'+
				   		    '<a href="javascript:;" class="weui-tabbar__item" id="J_popuMenu">'+
				   		      '<div class="weui-tabbar__icon">'+
				   		        '<i class="fa fa-align-justify"></i>'+
				   		      '</div>'+
				   		      '<p class="weui-tabbar__label">菜单</p>'+
				   		    '</a>'+
				   		'</div>'
			this.$el.append(html)
		},

		initEvent: function () {
			var f = this;
			$('#J_popuMenu').on('click', function (event) {
				window.location.href="./menu.html"
			})
		}


	}


	// 下拉刷新
	function PullToRefresh(options) {
		this.html = '<div class="weui-pull-to-refresh__layer">'+
					    	'<div class=\'weui-pull-to-refresh__arrow\'></div>'+
					    	'<div class=\'weui-pull-to-refresh__preloader\'></div>'+
					    	'<div class="down">下拉刷新</div>'+
					    	'<div class="up">释放刷新</div>'+
					    	'<div class="refresh">正在刷新</div>'+
					  	'</div>';
		this.$el = options.el instanceof jQuery ? options.el : $(options.el || 'body');
		this.noop = function () {}
		this.opt = {
			onRefresh: options.onRefresh || this.noop, //当下拉刷新触发的时候执行的回调 
			onPull: options.onPull || this.noop, // 用户下拉过程中会触发，接收一个百分比表示用户下拉的比例 
			distance: options.distance || 50 //下拉刷新的触发距离， 注意，如果你重新定义了这个值，那么你需要重载一部分CSS才可以
		}
		var p = this;
		// 初始化
		p.init = function () {
			
			p.$el.prepend(p.html).pullToRefresh(p.opt)
		}


		p.init()
	}


// 顶部按钮
	function TopBtns(options) {
		this.options = options || {}
		var t = this;

		t.scrollTop = 0;
		t.$el = $('<div class="m-top-btn-bar"></div>');
		console.log(options)
		if(options.isBack){
			t.$back = $('<div class="btn-item back"><i class="fa fa-angle-left"></i></div>');
		}else{
			t.$back = $('')
		}
		
		t.$gotop = $('<div class="m-gotop"><i class="fa fa-arrow-up"></i></div>')
		t.$listenEl = options.listenEl instanceof jQuery ? options.listenEl : $(options.listenEl || 'body');
		// 箭筒滚动元素
		var BTNMAP = {
			'back': t.$back
		}
		t.init = function () {
			t.initBtns()
			t.addEvent()
			t.setGotopOpacity()
			$('body').append(t.$el)
			$('body').append(t.$gotop)
		}

		t.initBtns = function () {
			var btns = t.options.btns || ['back']

			for(var i = 0; i < btns.length; i++){
				t.$el.append(BTNMAP[btns[i]])
			}
			// console.log(t.$el)
		}

		t.addEvent = function () {
			t.$back.on('click', function () {
				console.log(2222)
				window.history.back()
			})

			t.$listenEl.on('scroll', function (event) {
				t.scrollTop = event.target.scrollTop
				t.setOpacity()
				t.setGotopOpacity()
			})

			t.$gotop.on('click', function () {
				t.$listenEl.animate({scrollTop: 0})
			})
		}

		t.setOpacity = function () {
			// console.log(t.scrollTop)
			var opacity = 1- t.scrollTop/150
				opacity = opacity < 0 ? 0 : opacity
			t.$el.css('opacity', opacity)
		}

		t.setGotopOpacity = function () {
			var opacity = t.scrollTop/150

			t.$gotop.css('opacity', opacity)
		}
		t.init()


	}

	// new TopBtns({
	// 	listenEl:'#J_container'
	// })

	// 新手帮助按钮
	function FaqBtn() {
		
		this.$el = $('<a href="./faq.html" class="m-faq-btn bgc07">?</a>')
		this.$tel = $('<a href="tel:15088210881" class="m-tel-btn bgc07"><i class="fa fa-phone"></i></a>')
		$('body').append(this.$el).append(this.$tel)
	}

	// 页面对象

	function Commom() {
		this.init()
	}

	Commom.prototype = {
		constructor: Commom,

		init: function () {

			this.faq_btn = new FaqBtn()
			this.Tab = Tab
			this.footer = new Footer('.g-footer')


			// this.initPage()
		},

		config: function (option) {
			// 下拉刷新
			this.isPullToRefresh = option.isPullToRefresh || false;
			// 下拉刷新滚动的box
			this.pullToRefreshBox = option.pullToRefreshBox || 'body';
			// 下拉刷新回调函数
			this.onRefresh = option.onRefresh || function() {}
			// 
			this.onPull = option.onPull || function () {}
			// 顶部按钮
			this.isTopBtns = option.isTopBtns || false;
			// 返回
			this.isBack = option.isBack === undefined ? true : option.isBack;
			// 顶部按钮监听滚动的dom
			this.TopBtnsListenEL = option.TopBtnsListenEL || 'body'

			this.initPage()
		},
		// 初始化页面
		initPage: function () {

			this.initPullToRefresh()
			this.initTopBtns()
		},

		// 下拉刷新
		initPullToRefresh: function (){
			if (!this.isPullToRefresh) return;
			var options = {
				el: this.pullToRefreshBox,
				onRefresh: this.onRefresh,
				onPull: this.onPull
			}
			this.pullToRefresh = new PullToRefresh(options)
			return this.pullToRefresh
		},

		// 顶部按钮组
		initTopBtns: function () {

			if(!this.isTopBtns) return
			var options = {
				listenEl : this.TopBtnsListenEL,
				isBack : this.isBack
			}
			this.topBtns = new TopBtns(options)

			return this.topBtns
		}
		

	}


	return new Commom()

	
})

function chatQQ(qq){
    //其中1234567指的是QQ号码
    var qqnum = qq || '2859586682';
    window.location.href="mqqwpa://im/chat?chat_type=wpa&uin="+qqnum+"&version=1&src_type=web&web_src=oicqzone.com";
}