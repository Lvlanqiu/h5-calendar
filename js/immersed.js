var t = '',td = '';
var immersed = 0;
(function(global){
document.addEventListener('DOMContentLoaded',function(){
	t=document.getElementById('header');
    td=document.getElementById('header_div');	
    
    t&&(t.style.height=parseInt(immersed+48)+'px');
	td&&(td.style.height=immersed+'px');
	if (t && td && document.querySelector(".mui-content") && !t.classList.contains("mui-bar-transparent")) {document.querySelector(".mui-content").style.paddingTop = parseInt(immersed+48)+'px'}
    document.querySelector(".signin-back")&&(document.querySelector(".signin-back").style.marginTop = parseInt(immersed+10)+'px');
},false);

var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
if(ms&&ms.length>=3){
	immersed=parseFloat(ms[2]);
}
global.immersed=immersed;

})(window);

