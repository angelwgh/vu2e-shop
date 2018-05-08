;(function (root, factory) {
	if(!root.templates){
		root.templates = {}
	}

	root.templates.header = factory(root)

})(this, function (window) {
	function FixedBar() {
        this.temptext = '<div class="gotrack">'+
                            '<a class="gophone">'+
                                '<span>客服中心<span class="gotrack_cont w_200">15088210881</span></span>'+
                            '</a>'+
                            '<a href="faq.html" class="goques"><span>新手帮助</span></a>'+
                            '<a href="javascript:scrollTo(0,0);" class="gotop" id="J_gototop">返回顶部</a>'+
                        '</div>'
    }

    FixedBar.prototype = {
        constructor: FixedBar,


        render: function (opt) {
            $('body').append(this.temptext)
        }     
    }



	var html = '<div class="header_top">\
            <header class="public-top-layout" style="background-color: #fff;">\
                <div class="topBar wrap">\
                    <div class="head_info">\
                        <div class="user-entry">\
                            您好！欢迎光临司睿SlRUl！\
                        </div>\
                        <ul class="login tophead_zr">\
                            <li><a href="javascript:void(0)" class="Log">登入</a></li>\
                            <li><a href="javascript:void(0)" class="zc">注册</a></li>\
                            <li><img src="../content/images/tel.png" /><span>客服热线：15088210881</span></li>\
                        </ul>\
                        <div class="Login2">\
                        </div>\
                    </div>\
                    <div class="clear"></div>\
                </div>\
            </header>\
        </div>\
        <div class="new_header">\
            <!-- nav -->\
            <!-- header -->\
            <div class="header">\
                <h1 class="left logo"><a href="index.html"><img src="../content/images/new_logo.png" alt="司睿交易平台" width="287" height="69"></a></h1>\
                <div class="right ser_box clearfix">\
                    <div class="left ser_form clearfix">\
                        <ul class="clearfix ser_header">\
                            <li class="active ico" id="active_1">商标</li>\
                            <li class="ico" id="active_2">专利</li>\
                            <li class="ico" id="active_3">版权</li>\
                            <li class="ico" id="active_4">代理</li>\
                        </ul>\
                        <div class="ser_form_main left" style="box-sizing: content-box;">\
                            <input class="input" type="text" id="ck_tmvalue" value="" placeholder="请输入您要查询的商标名称">\
                            <select name="" class="head-search" id="J_head_searh_type">\
                                <option selected>商标名称</option>\
                                <option>注册号</option>\
                            </select>\
                            <input class="submit" type="submit" value="查询" id="ck_tmd">\
                            <input type="hidden" value="1" id="he_tmd">\
                        </div>\
                    </div>\
                    <div class="right"><img class="mt_10" src="../content/images/annotation.png"></div>\
                </div>\
            </div>\
            <div class="nav_menu">\
                <ul class="menu_list clearfix">\
                    <li class="home"><a href="index.html" class="menu_but">首页</a></li>\
                    <li><a href="sbfl.html" class="menu_but">商标分类</a></li>\
                    <li><a href="sbsc.html" class="menu_but">商标市场</a></li>\
                    <li><a href="zlsc.html" class="menu_but">专利市场</a></li>\
                    <li><a href="bqsc.html" class="menu_but">版权市场</a></li>\
                    <li><a href="sbdl.html" class="menu_but">商标代理</a></li>\
                    <li><a href="sbzc.html" class="menu_but">商标注册</a></li>\
                </ul>\
            </div>\
        </div>'

    var SEARCHMAPS={
        'sbsc.html': 0,
        'zlsc.html': 1,
        'bqsc.html': 2,
        'sbdl.html': 3
    }

    var SEARCHDATA = [
        {
            type:'mark',
            options: [
                {
                    'name': '商标名称',
                    'placeholder': '请输入要查询的商标名称'

                },
                {
                    'name': '注册号',
                    'placeholder': '请输入要查询的商标注册号'
                }
            ]
        },
        {
            type:'patent',
            options: [
                {
                    'name': '专利名称',
                    'placeholder': '请输入要查询的专利（申请）名称'
                },
                {
                    'name': '专利号',
                    'placeholder': '请输入要查询的专利号'
                }
            ]
        },
        {
            type:'copyright',
             options: [
                {
                    'name': '版权名称',
                    'placeholder': '请输入要查询的版权名称'
                },
                {
                    'name': '登记号',
                    'placeholder': '请输入要查询的版权登记号'
                }
            ]
        },
        {
            type:'agent',
             options: [
                {
                    'name': '代理机构',
                    'placeholder': '请输入要查询的代理机构'
                },
                {
                    'name': '代理人',
                    'placeholder': '请输入要查询的代理人'
                }
            ]
        }
    ]





	function Header() {
		this.temptext = html
        this.init()
	}

	Header.prototype = {
		constructor: Header,

        noop: function() {},
        init: function () {
            this.fixedBar = new FixedBar()
            this.fixedBar.render()
        },

		render: function (opt) {
			var $el = this.$el = typeof opt.el ==='string' ? $(opt.el): opt.el;
            this.searchFn = typeof opt.search === 'function' ? opt.search : this.noop;
            // var dom = 
			$el.append(this.temptext)
            this.handelNav()
            this.handelSearchBar()
		},

        // 导航高亮处理
        handelNav: function () {
            var self = this;
            $(function () {
                var urls = location.href.match(/\/(\w+\.\w+?)$/)
                if(!urls) return;
                var url = self.url = urls[1];
                 $(".menu_list li").removeClass('active').find('a').each(function () {
                     var _url = $(this).attr('href')
                     if(url !== 'index.html' && url === _url){
                        $(this).parent().addClass('active')
                     }
                 })
            });
        },

        // 渲染搜索框
        renderSerachBar: function (index) {
            var self = this
            // console.log(index)
            var data =  this.selectData = SEARCHDATA[index]
                data.index = '0';
                data.name = data.options[0].name
            $('#ck_tmvalue').attr('placeholder', data.options[0].placeholder)
            $('.ser_header .ico').removeClass('active').eq(index).addClass('active')
            
            this.renderSelect()
            
            
            
        },


        // 渲染下拉框
        renderSelect: function () {
          var $el = $('#J_head_searh_type')
          var data = this.selectData
          var options = data.options
          var html = ''
             $.each(options, function (i, item) {
                html += '<option value="'+i+'" '+ (i == 0 ? 'selected' : '')+'>'+item.name+'</option>'
             })

          $el.html(html)
        },


        handelSearchBar: function () {
            var self = this;
            
            $(function () {

                var index = SEARCHMAPS[self.url] || SEARCHMAPS[self.url] == 0 ? SEARCHMAPS[self.url] : 0
                

                self.renderSerachBar(index);
                self.renderSelect()
                $('.ser_header').on('click', '.ico', function () {
                   index = $(this).index()
                   self.renderSerachBar(index);
                })
                $('#ck_tmd').on('click', function () {
                    self.searchFn(self.selectData)
                })

                $('#J_head_searh_type').on('change', function (event) {
                      var data = self.selectData
                      // console.log(data)
                      var index = data.index = $(this).val()
                      data.name = data.options[index].name
                      $('#ck_tmvalue').attr('placeholder', data.options[index].placeholder)
                      // data.index = index
                  })
            })
        }
	}
	return new Header()


})
