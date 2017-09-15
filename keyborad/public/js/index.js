$(function(){
 	/*进入焦点时触发*/
 	$('#indentify').click(function(){
 		if ($('.keyborad').css('display') == 'none') {
 			$('.keyborad').fadeIn();
 		}
 		else{
 			$('.keyborad').fadeOut();
 		}
 	});

 	$('.keyborad span').click(function(){
 		var txt = $('#indentify').val().trim();
 		var txtLen = txt.length;
 		if($(this).hasClass('delete')){
 			txt = txt.substring(0,txtLen - 1);
 		}
 		else{
 			if (txtLen > 17) {
 				console.log('ok');
 			}
 			else{
 				var _thistxt = $(this).text();
 				txt += _thistxt;
 			}
 		}
 		$('#indentify').val(txt);
 	})
});