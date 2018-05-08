// 首页脚本



(function (root, factory) {
	root.Index = factory(root)
})(this, function (window) {

	$(function(){
	   
	});
	function Index() {
		this.init()
	}

	Index.prototype = {
		
		// 初始化
		init: function () {
			// this.render()
		},

		/**
		* 渲染页面
		*/
		// render: function () {
		// 	this.renderSlider();
		// 	this.renderAgent()
		// },


		/**
		*	渲染轮播图
		*/
		renderSlider: function () {
			$('.navbanner').flexslider({
			    animation: "slide",
			    after: function(){
		         	var nowindex = $(".navbanner .flex-active-slide").index();
		         	switch(nowindex){
			            case 1:
			                $(".nav_slider .nav_slider_broker").addClass("active").siblings().removeClass("active");
			                break;
			            case 2:
			                $(".nav_slider .nav_slider_agent").addClass("active").siblings().removeClass("active");
			                break;
			            case 3:
			                $(".nav_slider .nav_slider_release").addClass("active").siblings().removeClass("active");
			                break;
			            default:
			                break;
		         	}
			     }
			});
		    $(".nav_slider_item").mouseover(function(){
		        $(".new_section .flex-control-nav li").eq($(this).index()).children("a").click();
		    })
		    $('.trade_scroll').flexslider({
		        animation: "slide"
		    });


		    // $(".nav_right").removeClass('hide');
		    // $('.sub[data-id="1"]').removeClass('hide');
		    // u轮播图上面的导航
		    $('.containor').on('mouseenter', function() {
		        $(".nav_right").removeClass('hide');

		    }).on('mouseleave', function() {
		        $(".nav_right").addClass('hide');
		        $(".sub").addClass('hide');
		        $(".nav_right").css("z-index","0");
		    }).on('mouseenter',"li", function(e) {
		        var li_data = $(this).attr('data-id');
		        $(".sub").addClass('hide');
		        $('.sub[data-id="' + li_data + '"]').removeClass('hide');
		        $(".nav_right").css("z-index","100");
		    })
		},

		/**
		*	渲染代理页面
		*/
		renderAgent: function (data) {
			
			

		    var temptext = doT.template($('#J_agent_temp').html())
		    $('#J_agent_view').html(temptext(data))

		    $('.recmd').flexslider({
		        animation: "slide"
		    });
		}


	};




	return Index
})