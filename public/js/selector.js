$(".year").on('click', function () {
	$(".year").removeClass("current");
	$(this).addClass("current");
});

$('.overlay').on('click', reset);

function reset(){
	$('input[type="checkbox"]').removeAttr('checked');
}

function demo(){
	setTimeout(function() {
		var chkbox = document.querySelector('input[type="checkbox"]:not([checked])');
		chkbox.click();
		chkbox.setAttribute('checked', 'checked');
	},1000);
}

// if (document.location.pathname.indexOf('fullcpgrid') > -1) {
	demo();
// }