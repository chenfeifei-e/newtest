function Other(index,x,px,py){
    this.x=x;
	this.px=px;
	this.py=py;
	this.index=index;
	this.body=document.createElement("div");
	this.body.className="pai";
	$(".other").append($(this.body));
	$(this.body).css({
		"left":10,
		"top":x,
		"transform":"rotate(90deg)",
		"background-positionX":-px,
		"background-positionY":-py
	});
}
