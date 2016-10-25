function $(param,obj)
{
	obj=obj || document;
	if(param.indexOf("#")===0)
		return document.getElementById(param.substring(1));
	if(param.indexOf(".")===0)
		return getclass(param.substring(1),obj);
	return obj.getElementsByTagName(param);

}

function getclass(classname,obj)
{  
	obj=obj || document;
	if(obj.getElementsByClassName)
	{
		return obj.getElementsByClassName(classname);
	}
	else
	{
		var res=[];
		var eme=obj.getElementsByTagName("*");
		for(var i=0;i<eme.length;i++)
		{
			var arr=eme[i].className.split(" ");
			for(var j=0,len=arr.length;j<len;j++)
			{
				if(arr[i]==obj)
				{
					res.push(arr[i]);
					break;
				}
			}
		}
		return res;
	}
}

function getStyle(obj,attr)
{
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}






function setcookie(key,value,option)
{  
	option=option || {};
	var cookie=encodeURIComponent(key)+"="+encodeURIComponent(value);
	if(option.expires)
	{
		if(typeof option.expires==="number")
		{
			var day = option.expires,
				exp = option.expires = new Date();
			exp.setDate(exp.getDate() + day);
		}
		cookie+=";expires="+option.expires.toUTCstring();
	}
	if(option.path)
	{
		cookie+="path"+option.path;
	}
	if(option.domian)
	{
		cookie+="domian"+option.domian;
	}
	document.cookie=cookie;
}
function getcookil(name)
{
	var arr=document.cookie.split("; ");
	for(var i=0;i<arr.length;i++)
	{
		var brr=arr[i].split("=");
		if(brr[0]==name)
		{
			return brr[1];
		}
	}
	return null;
}

function removecookie(key,option)
{
	option=option || {};
	option.expries=-1;
	setcookie(key,"",option);
}


function move(obj,json,fn)
{
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in  json){
			var icur=0;
			if(json[attr]=="ipacity"){
				iucr=parseFloat(getStyle(obj,attr))*100;
			}else{
				icur=parseFloat(getStyle(obj,attr));
			}
			if(icur==json[attr])
				continue;
			flag=false;
			var speed=(json[attr]-icur)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(json[attr]=="opacity"){
				obj.style[attr]=(icur+speed)/100;
			}else{

				obj.style[attr]=icur+speed+"px";
			}
		}
		if(flag){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},30)
}

function animate(obj,json,times,fn)
{   

	clearInterval(obj.timer);
	var strtime=new Date();
	var icur={};
	var end={};
	var speed={};
	for(var attr in json){
		 icur[attr]=parseFloat(getStyle(obj,attr)) ||0 ;
		 end[attr]=parseFloat(json[attr]);
		 speed[attr]=(end[attr]-icur[attr])/times;
	}
	obj.timer=setInterval(function(){
		for(var attr in json){
			var jiange=Math.min(new Date-strtime,times);
			obj.style[attr]=jiange*speed[attr]+icur[attr]+(attr=='opacity'?'':'px');
			obj.style.filter="alpha(opacity="+(jiange*speed[attr])+icur+")";
		}
		if(jiange==times){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},30);	
}

function fadein(obj,timer,fn)
{
	obj.style.display="block";
	obj.style.opacity=0;
	animate(obj,{opacity:1},timer);
}
function fadeout(obj,timer,fn)
{  
	animate(obj,{opacity:0},timer,function(){
			obj.style.display="none";
		});

}