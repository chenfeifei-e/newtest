function Player(index,x,px,py){
	this.x=x;
	this.px=px;
	this.py=py;
	this.index=index;
	this.body=document.createElement("div");
	this.body.className="pai";
	$(".player").append($(this.body));
	$(this.body).css({
		"left":x,
		"top":0,
		"background-positionX":-px,
		"background-positionY":-py
	});
}
