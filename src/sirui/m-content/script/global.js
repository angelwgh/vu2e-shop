(function (root, factory) {
	root.global = factory(root)
})(this, function (window) {
	window.ontouchstart = null
	// console.log(window)
})