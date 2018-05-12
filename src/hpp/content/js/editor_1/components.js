//用于加载各自定义组件

define([
		'js/components/commom/hpp-navBar',
		'js/components/panels/hpp-panels',
		'js/components/panels/hpp-text-style'
	],function (
			hppNavbar,
			hppPanels,
			hppTextStyle
		) {

	// console.log(hppNavbar)
	function Components() {
		var c = this;

		c.install = function (Vue) {
			Vue.component(hppNavbar.name,hppNavbar)
			Vue.component(hppPanels.name,hppPanels)
			Vue.component(hppTextStyle.name,hppTextStyle)
		}
	}




	return new Components()
})