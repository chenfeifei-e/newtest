var ply=[];
var oth=[];
var thr=[];
var plys=new Array();
var oths=new Array();
var thrs=new Array();
function init(){
	product(ply);
	product(oth);
	product(thr);
}
init();
function pook(){
	for(var i=0;i<ply.length;i++){
		var b=ply[i]%13;
		var c=parseInt(ply[i]/13);
		new Player(i,i*20+20,2+b*79,2+c*119);
		$(".player div").eq(i).data({"flag":true,"index":i,"num":b});
		$(".player div").eq(i).click(function(){
			if($(this).data("flag")){
				$(this).css({
				"top":-30
				});
				$(this).data("flag",false);
				plys.push(this);
			}else{
				$(this).css({
				"top":0
				});
				$(this).data("flag",true);
				plys.splice($.inArray(this,plys),1);
			}
			$("#btn").css("display","block");
		})
	}
	for(var i=0;i<oth.length;i++){
		var b=oth[i]%13;
		var c=parseInt(oth[i]/13);
		oths.push(new Other(i,i*20,2+b*79,2+c*119));
	}
	for(var i=0;i<thr.length;i++){
		var b=thr[i]%13;
		var c=parseInt(thr[i]/13);
		thrs.push(new Three(i,i*20,2+b*79,2+c*119));
	}
	
}
pook();
$("#btn").click(function(){
	zhuanhuan();
	if(chupai()){
		for(var i=0;i<plys.length;i++){
			$(plys[i]).css({
				"top":-150,
				"left":150+i*20
			});
//			for(var j=0;j<$(".player div").length;j++){
//				console.log($(".player div").eq(j).data("index"),$(plys[i]).data("index"))
//				if($(".player div").eq(j).data("index")>$(plys[i]).data("index")){
//					$(".player div").eq(j).css({
//						"left":this.offsetLeft-20+"px",
//						"top":this.offsetTop+"px"
//					})
//				}
//			}
		}	
	}else{
		alert("这样不合法");
	}

	
})
function zhuanhuan(){
	for(var i=0;i<plys.length;i++){
		for(var j=i+1;j<plys.length;j++){
			if($(plys[i]).data("index")>$(plys[j]).data("index")){
				var b=plys[i];
				plys[i]=plys[j];
				plys[j]=b;
			}
		}
	}
}
function shuijiashu(arr,brr,crr){
	var b=Math.floor(Math.random()*54);
	if(brr){
		for(var j=0;j<brr.length;j++){
		if(b==brr[j])return false;
		}
	}
	if(crr){
		for(var k=0;k<crr.length;k++){
		if(b==crr[k])return false;
		}
	}
	for(var i=0;i<arr.length;i++){
		if(b==arr[i])return false;
	}
	arr.push(b);
}
function product(arr){
	for(var i=0;;i++){
		if(arr.length<18)
		shuijiashu(arr);
		else
		break;
	}
	paixu(arr);
}
function paixu(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]%13>arr[j]%13){
				var b=arr[i];
				arr[i]=arr[j];
				arr[j]=b;
			}
		}
	}
	return arr;
}



function chupai(){
	switch(plys.length){
		case 2:
			console.log($(plys[0]).data("num"),$(plys[1]).data("num"))
			if($(plys[0]).data("num")!=$(plys[1]).data("num")){
				return false;
			}
			break;
		case 3:
			zhuanhuan();
			if($(plys[0]).data("num")==0 ||　$(plys[0]).data("num")+1!=$(plys[1]).data("num") || $(plys[1]).data("num")+1!=$(plys[2]).data("num"))
			return false;
			break;
	}
	return true;
}
