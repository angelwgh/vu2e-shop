;(function(){
	 var ua = window.navigator.userAgent.toLowerCase();
	 console.log(ua)
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
       // window.location.href = "../pages/index.html";
    }
    else if (ua.indexOf("iphone") > 0 || ua.indexOf("android") > 0) {
    	console.log(111)
       window.location.href = "../mobile/index.html";
    } 
})()

;(function (root, factory) {
	factory(root)
})(this, function () {
	
	$(function () {
		$('body').animate({
			opacity:'1'
		},100)
	})
	

})