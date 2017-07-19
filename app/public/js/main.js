function asset_choice_close(){
	$("#volume-panel:hidden").show();
	$("#face-asset-choice").hide();
}
function asset_choice_close2(){
	$("#volume-panel:hidden").show();
	$("#face-asset-choice2").hide();
}
var mascot_face;
var z_back = new Image();
z_back.src = "img/zunko_back.png";
var z_head = new Image();
z_head.src = "img/zunko_head.png";
var back = new Image();
back.src = "img/background.png";

function setPRNM(){
z_back.src = "img/prnm_back.png";
z_head.src = "img/prnm_head.png";
replotCurve();
}
function setZNK(){
z_back.src = "img/zunko_back.png";
z_head.src = "img/zunko_head.png";
replotCurve();
}
function setSNGU(){
z_back.src = "img/3_back.png";
z_head.src = "img/3_head.png";
replotCurve();
}
var eye_open = 1;
var eye_open_v = 0;
var eye_open_act = 0;
var wave_u = 0;
var wave_v=0;

function clone(src){
    var dst = {}
    for(var k in src){
        dst[k] = src[k];
    }
    return dst;
}
mascot_face = clone(normal);
function get_diparam( p, a, b, c){
	for(var k in c){
		c[k]=p*a[k]+(1-p)*b[k];
	}
}

function calculate_params(p1,p2,p3,a,b,c,n,r){
	var ag = clone(normal);
	var sd = clone(normal);
	var pi = clone(normal);
	var p1_d;
	var p2_d;
	var p3_d;
	if(p1+p2+p3==0){
		p1_d = 0.333333333333;
		p2_d = 0.333333333333;
		p3_d = 0.333333333333;
	}else{
		p1_d = (p1)/(p1+p2+p3);
		p2_d = (p2)/(p1+p2+p3)
		p3_d = (p3)/(p1+p2+p3);
	}
	get_diparam(p1,a,n,ag);
	get_diparam(p2,b,n,sd);
	get_diparam(p3,c,n,pi);
	for(var k in r){
		r[k]=p1_d*ag[k]+p2_d*sd[k]+p3_d*pi[k];
	}
}
function get_face_vector(a,b,r){
	for(var k in r){
		r[k]=a[k]-b[k]
	}
}
function add_face_vector(a,b,r){
	for(var k in r){
		r[k]=a[k]+b[k]
	}
}

function set_face(){
	var tg = clone(normal);
	var tmp = clone(normal);
    var sad_meano = clone(normal);
	var ang_meano = clone(normal);
	var pre_meano = clone(normal);
	var meano = clone(normal);
	var sad_vector = clone(normal);
	var ang_vector = clone(normal);
	var pre_vector = clone(normal);
	var sad_o = clone(normal);
	var ang_o = clone(normal);
	var pre_o = clone(normal);
	var no = clone(normal);
	var clo = clone(cool_z);
	var cto = clone(cute_z);
	var fno = clone(funny_z)
	var edo = clone(normal);
	var ed2o = clone(normal);
	calculate_params(0.25,0.25,0.25,cute_z,funny_z,cool_z,normal,meano);
	calculate_params(0.25,0.25,0.25,cute_s,funny_s,cool_s,normal_s,sad_meano);
	calculate_params(0.25,0.25,0.25,cute_a,funny_a,cool_a,normal_a,ang_meano);
	calculate_params(0.25,0.25,0.25,cute_p,funny_p,cool_p,normal_p,pre_meano);

	get_face_vector(sad_meano,meano,sad_vector);
	get_face_vector(ang_meano,meano,ang_vector);
	get_face_vector(pre_meano,meano,pre_vector);
    add_face_vector(edit_set,sad_vector,sad_o);
	add_face_vector(edit_set,ang_vector,ang_o);
	add_face_vector(edit_set,pre_vector,pre_o);
	calculate_params(ang,sad,pre,ang_o,sad_o,pre_o,edit_set,edo);
	add_face_vector(edit_set2,sad_vector,sad_o);
	add_face_vector(edit_set2,ang_vector,ang_o);
	add_face_vector(edit_set2,pre_vector,pre_o);
	calculate_params(ang,sad,pre,ang_o,sad_o,pre_o,edit_set2,ed2o);
	calculate_params(ang,sad,pre,normal_a,normal_s,normal_p,normal,no);
	calculate_params(ang,sad,pre,cool_a,cool_s,cool_p,cool_z,clo);
	calculate_params(ang,sad,pre,cute_a,cute_s,cute_p,cute_z,cto);
	calculate_params(ang,sad,pre,funny_a,funny_s,funny_p,funny_z,fno);
	calculate_params(cool,cute,funny,clo,cto,fno,no,tg);
	calculate_params(cool*0.5,cute*0.5,funny*0.5,clo,cto,fno,edo,edo);
	calculate_params(cool*0.5,cute*0.5,funny*0.5,clo,cto,fno,ed2o,ed2o);
	calculate_params(0,edit2_p,edit_p,tg,ed2o,edo,tg,mascot_face);
}


function createCurve(context,targ){
	var i=1;
	var j=1;
	var y=140;
	var eye_v=0.6;
	var eye_h=0.6;
	var eye_vsize=50;
	var eye_width=40;
	var eye_i=-0.6;
	var eye_j=-0.2;
	var eye_size=10;
	var eye_pup_size=1;
	var eye_line_width=10;
	var eye_pup_width = 5;
	var eye_pup_o = 0.5;
	var	nose_y = 0.65;
	var nose_len = 0.03;
	var mouth_width = 0.2;
	var mouth_y = 0.8;
	var mouth_end_y = 0;
	var mouth_t_i = 0.9;
	var mouth_t_j = 0.2;
	var mouth_b_i = 0;
	var mouth_b_j = 1;
	var eb_y = -0.1;
	var eb_h = 0.2;
	var eb_i = 0.5;
	var eb_j = 0.5;
	var eb_len = 0.6;
	var eb_w  = 1;

	y=targ.y;
	i=targ.i;
	j=targ.j;
	eye_v=targ.eye_v;
	eye_h=targ.eye_h;
	eye_i=targ.eye_i;
	eye_j=targ.eye_j;
	eye_vsize=eye_open*targ.eye_vsize;
	eye_size=targ.eye_size;
	if(eye_size<=0.000001){
		eye_size=0.000001
	}
	eye_width=targ.eye_width;
	if(eye_width<=0.000001){
		eye_width=0.000001
	}
	nose_y=targ.nose_y;
	nose_len=targ.nose_len;
	mouth_y=targ.mouth_y;
	mouth_width=targ.mouth_width*(1+wave_u*0.03);
	mouth_end_y=targ.mouth_end_y;
	mouth_t_i=targ.mouth_t_i;
	mouth_t_j=targ.mouth_t_j;
	mouth_b_i=targ.mouth_b_i;
	mouth_b_j=targ.mouth_b_j;
	eb_y=targ.eb_y;
	eb_h=targ.eb_h;
	eb_w=targ.eb_w;
	eb_i=targ.eb_i;
	eb_j=targ.eb_j;
	eye_pup_width=targ.eye_pup_width;
	if(eye_pup_width<=0.000001){
		eye_pup_width=0.000001
	}
	eye_line_width=targ.eye_line_width;
	if(eye_line_width<=0.000001){
		eye_line_width=0.000001
	}
	eye_pup_size=targ.eye_pup_size;
	if(eye_pup_size<=0.000001){
		eye_pup_size=0.000001
	}
	eye_pup_o=targ.eye_pup_o;


	var R=(y+50)/2;
	var I=i*0.5+0.5;
	var J=j*0.5+0.5;
	var X=110;
	var median_line = 250;
	var median_level = 30+wave_v;

    context.drawImage(back,0,0,300,300,0,0,500,600);
    context.drawImage(z_back,0,20,500,600,median_line-X*1.775,10+wave_u+median_level,median_line+X*1.45,220+250);
    context.lineWidth = 6;
	context.beginPath();
	context.moveTo(median_line,y+150+median_level);
	context.bezierCurveTo(median_line+R*I, y+150-R*(1-I)+median_level, median_line+X-R*(1-J), 150+R*J+median_level, median_line+X, 150+median_level);
	context.bezierCurveTo(median_line+X, 0+median_level, median_line-X, 0+median_level, median_line-X, 150+median_level);
	context.bezierCurveTo(median_line-X+R*(1-J), 150+R*J+median_level, median_line-R*I, y+150-R*(1-I)+median_level, median_line, y+150+median_level);
	context.stroke();
	context.save();
		var grad  = context.createLinearGradient(0,0+median_level,0,y+150+median_level);
		grad.addColorStop(0,"#f7c3a9");
		grad.addColorStop(1,"#f0ddd0");
		context.fillStyle = grad;
		context.fill();
	context.restore()
	context.closePath();
    context.lineWidth = 3;
	context.save();
		context.beginPath();
		var eye_l = (median_line+y)*eye_v+median_level;
		var eye_o = median_line+X*eye_h;
		context.moveTo(eye_o-0.5*eye_width,eye_l);
		context.bezierCurveTo(eye_o-0.4*eye_width, eye_l+eye_i*eye_vsize,eye_o+0.4*eye_width, eye_l+eye_j*eye_vsize,eye_o+0.5*eye_width,eye_l);
		context.save();
			context.lineWidth = eye_line_width;
			context.stroke();
		context.restore();
		context.lineTo(eye_o+0.3*eye_width,eye_l+0.5*eye_vsize);
		context.stroke();
		context.lineTo(eye_o-0.3*eye_width,eye_l+0.5*eye_vsize);
		context.lineTo(eye_o-0.5*eye_width,eye_l);
		context.save();
			context.fillStyle = "#ffffff";
			context.fill();
		context.restore();
		context.clip();
		context.closePath();		
		context.beginPath();
		context.moveTo(eye_o-0.02,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize);
		context.bezierCurveTo(eye_o-0.02+eye_size,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize,eye_o-0.02+eye_size,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize,eye_o-0.02,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize);
		context.bezierCurveTo(eye_o-0.02-eye_size,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize,eye_o-0.02-eye_size,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize,eye_o-0.02,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize);
		context.save();
			context.lineWidth = eye_pup_width;
			context.stroke();
			var grad  = context.createLinearGradient(0,eye_l - eye_vsize * 0.5, 0,eye_l + eye_vsize * 0.5);
			grad.addColorStop(0,"#000000");
			grad.addColorStop(0.5,"#664400");
			grad.addColorStop(0.7,"#ffdd00");
			grad.addColorStop(1,"#ffff88");
			context.fillStyle = grad;
			context.fill();
		context.restore();
		context.save();
			context.clip();
			context.beginPath();
			context.arc(eye_o+eye_size*0.5,eye_l+eye_pup_o-eye_vsize*0.3,eye_size*1.0,0,2*Math.PI,false);
			context.stroke();
			context.fillStyle="#ffffff";
			context.fill();
		context.restore();
		context.closePath();
	context.restore();


	eye_o = median_line-X*eye_h;
	context.save()
		context.beginPath();
		context.moveTo(eye_o+0.5*eye_width,eye_l);
		context.bezierCurveTo(eye_o+0.4*eye_width, eye_l+eye_i*eye_vsize,eye_o-0.4*eye_width, eye_l+eye_j*eye_vsize,eye_o-0.5*eye_width,eye_l);
		context.save();
			context.lineWidth = eye_line_width;
			context.stroke();
		context.restore();
		context.lineTo(eye_o-0.3*eye_width,eye_l+0.5*eye_vsize);
		context.stroke();
		context.lineTo(eye_o+0.3*eye_width,eye_l+0.5*eye_vsize);
		context.lineTo(eye_o+0.5*eye_width,eye_l);
		context.save();
			context.fillStyle = "#ffffff";
			context.fill();
		context.restore();
		context.clip();
		context.closePath();
		context.beginPath();
		context.moveTo(eye_o+X*0.02,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize);
		context.bezierCurveTo(eye_o+X*0.02-eye_size,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize,eye_o+X*0.02-eye_size,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize,eye_o+X*0.02,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize);
		context.bezierCurveTo(eye_o+X*0.02+eye_size,eye_l+eye_pup_o+0.5*eye_pup_size*eye_vsize,eye_o+X*0.02+eye_size,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize,eye_o+X*0.02,eye_l+eye_pup_o-0.5*eye_pup_size*eye_vsize);
		context.save();
			context.lineWidth = eye_pup_width;
			context.stroke();
			var grad  = context.createLinearGradient(0,eye_l - eye_vsize * 0.5, 0,eye_l + eye_vsize * 0.5);
			grad.addColorStop(0,"#000000");
			grad.addColorStop(0.5,"#664400");
			grad.addColorStop(0.7,"#ffdd00");
			grad.addColorStop(1,"#ffff88");
			context.fillStyle = grad;
			context.fill();
		context.restore();
		context.save();
			context.clip();
			context.beginPath();
			context.arc(eye_o+eye_size*0.5,eye_l+eye_pup_o-eye_vsize*0.3,eye_size*1.0,0,2*Math.PI,false);
			context.stroke();
			context.fillStyle="#ffffff";
			context.fill();
		context.restore();
		context.closePath();
	context.restore();

	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(median_line,(150+y*nose_y)+median_level);
	context.lineTo(median_line,(150+y*(nose_y-nose_len)+median_level));
	context.stroke();
	context.closePath();

	context.beginPath();
	context.moveTo(median_line,150+ y*mouth_y+median_level);
	var mouth_o = 150+y*mouth_y+median_level;
	var mouth_width_raw = X*mouth_width*0.5;
	context.bezierCurveTo(
		median_line + (mouth_width_raw*0.5)*mouth_t_i,mouth_o+(1-mouth_t_i)*(mouth_width_raw*0.5),
		median_line + mouth_width_raw - mouth_t_j*(mouth_width_raw*0.5),mouth_o+(1-mouth_t_j)*(y*mouth_end_y+mouth_width_raw*0.5),
		median_line + mouth_width_raw,150+mouth_y*y+y*mouth_end_y+median_level
		);
	context.bezierCurveTo(
		median_line + mouth_b_i * mouth_width_raw , mouth_o + mouth_b_j * mouth_width_raw*2 ,
		median_line - mouth_b_i * mouth_width_raw , mouth_o + mouth_b_j * mouth_width_raw*2 ,
		median_line - mouth_width_raw , 150+mouth_y*y+y*mouth_end_y+median_level
	);
	context.bezierCurveTo(
		median_line - mouth_width_raw + mouth_t_j*(mouth_width_raw*0.5) , mouth_o+(1-mouth_t_j)*(y*mouth_end_y+mouth_width_raw*0.5),
		median_line - (mouth_width_raw*0.5)*mouth_t_i ,  mouth_o+(1-mouth_t_i)*(mouth_width_raw*0.5),
		median_line,mouth_o
	);
	context.stroke();
	context.save();
		var grad  = context.createLinearGradient(0,mouth_o,0,y+150+median_level);
		grad.addColorStop(0,"#ffa389");
		grad.addColorStop(1,"#f0ddd0");
		context.fillStyle = grad;
		context.fill();
	context.restore();
	context.closePath();

	context.beginPath();
	var eb_start=eb_h*X+median_line;
	var eb_l = 150+y*eb_y+median_level;
	var eb_width_raw = X*eb_len;
	context.save();
	context.moveTo(eb_start,eb_l);
	context.bezierCurveTo(
		eb_start+eb_i*(eb_width_raw*0.5), eb_l - (1-eb_i)*eb_width_raw*0.5 ,
		eb_start+eb_width_raw - eb_j*(eb_width_raw*0.5), eb_l - (1-eb_j)*eb_width_raw*0.5 ,
		eb_start+eb_width_raw,eb_l
		);
	context.lineWidth = eb_w;
	context.stroke();
	context.restore();

	context.beginPath();
	var eb_start=-eb_h*X+median_line;
	var eb_l = 150+y*eb_y+median_level;
	var eb_width_raw = X*eb_len;
	context.save();
	context.moveTo(eb_start,eb_l);
	context.bezierCurveTo(
		eb_start-eb_i*(eb_width_raw*0.5), eb_l - (1-eb_i)*eb_width_raw*0.5 ,
		eb_start-eb_width_raw + eb_j*(eb_width_raw*0.5), eb_l - (1-eb_j)*eb_width_raw*0.5 ,
		eb_start-eb_width_raw,eb_l
		);
	context.lineWidth = eb_w;
	context.stroke();
	context.restore();
	context.drawImage(z_head,0,20,500,600,median_line-X*1.9,-30+median_level+wave_u,median_line+X*1.7,180+350);
}
function replotCurve(){
	var canvas = document.getElementById('main_canvas');
	context = canvas.getContext('2d');
	context.clearRect(0, 0, 700, 700);
	createCurve(context,mascot_face);	
}


function SetSliderValue(targ){
	$( "#IS" ).slider("option","value",targ.i *100);
	$( "#JS" ).slider("option","value",targ.j *100);
	$( "#yS" ).slider("option","value",targ.y-100);
	$( "#eye_hS" ).slider("option","value",targ.eye_h*100);
	$( "#eye_vS" ).slider("option","value",targ.eye_v*100);
	$( "#eye_IS" ).slider("option","value",targ.eye_i*50+50);
	$( "#eye_JS" ).slider("option","value",targ.eye_j*50+50);
	$( "#eye_vsizeS" ).slider("option","value",targ.eye_vsize);
	$( "#eye_widthS" ).slider("option","value",targ.eye_width);
	$( "#eye_sizeS" ).slider("option","value",targ.eye_size*2);
	$( "#nose_yS" ).slider("option","value",targ.nose_y*100);
	$( "#nose_lenS" ).slider("option","value",targ.nose_len*100);
	$( "#mouth_yS" ).slider("option","value",targ.mouth_y*100);
	$( "#mouth_widthS" ).slider("option","value",targ.mouth_width*100);
	$( "#mouth_end_yS" ).slider("option","value",targ.mouth_end_y*500);
	$( "#mouth_t_iS" ).slider("option","value",targ.mouth_t_i*100);
	$( "#mouth_t_jS" ).slider("option","value",targ.mouth_t_j*100);
	$( "#mouth_b_iS" ).slider("option","value",targ.mouth_b_i*100);
	$( "#mouth_b_jS" ).slider("option","value",targ.mouth_b_j*100);
	$( "#eb_yS" ).slider("option","value",targ.eb_y*100);
	$( "#eb_wS" ).slider("option","value",targ.eb_w*10);
	$( "#eb_hS" ).slider("option","value",targ.eb_h*100);
	$( "#eb_iS" ).slider("option","value",targ.eb_i*100);
	$( "#eb_jS" ).slider("option","value",targ.eb_j*100);
	$( "#eye_line_widthS" ).slider("option","value",3.3*targ.eye_line_width);
	$( "#eye_pup_widthS" ).slider("option","value",3.3*targ.eye_pup_width);
	$( "#eye_pup_oS" ).slider("option","value",targ.eye_pup_o);
	$( "#eye_pup_sizeS" ).slider("option","value",100*targ.eye_pup_size);
	$( "#angS" ).slider("option","value",ang*100);
	$( "#sadS" ).slider("option","value",sad*100);
	$( "#preS" ).slider("option","value",pre*100);
	$( "#coolS" ).slider("option","value",cool*100);
	$( "#cuteS" ).slider("option","value",cute*100);
	$( "#funnyS" ).slider("option","value",funny*100);
	$( "#editS" ).slider("option","value",edit_p*100);
	$( "#edit2S" ).slider("option","value",edit2_p*100);
}
function Init(targ){
//	console.log("init function");
	var canvas = document.getElementById('main_canvas');
//	console.log(canvas);
	createCurve(canvas.getContext('2d'),targ);


	$( "#IS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.i = 0.01 * ui.value;
	  	replotCurve();
	  }
	});
	$( "#JS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.j = 0.01 * ui.value;
	  	replotCurve();
	  }
	});
	$( "#yS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.y = ui.value+100;
	  	replotCurve();
	  }
	});
	$( "#eye_hS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_h = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_vS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_v = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_IS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_i = 0.02*ui.value-1;
	  	replotCurve();
	  }
	});
	$( "#eye_JS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_j = 0.02*ui.value-1;
	  	replotCurve();
	  }
	});
	$( "#eye_vsizeS" ).slider({
	  min: -10,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_vsize = ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_widthS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_width = ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_sizeS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_size = 0.5*ui.value;
	  	replotCurve();
	  }
	});

	$( "#nose_yS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.nose_y = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#nose_lenS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.nose_len = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_yS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.mouth_y = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_widthS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.mouth_width = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_end_yS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.mouth_end_y = 0.002*ui.value-0.005;
	  	replotCurve();
	  }
	});
	$( "#mouth_t_iS" ).slider({
	  min: 0,
	  max: 200,
	  slide: function(e,ui){
	  	targ.mouth_t_i = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_t_jS" ).slider({
	  min: 0,
	  max: 200,
	  slide: function(e,ui){
	  	targ.mouth_t_j = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_b_iS" ).slider({
	  min: 0,
	  max: 200,
	  slide: function(e,ui){
	  	targ.mouth_b_i = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#mouth_b_jS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.mouth_b_j = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eb_yS" ).slider({
	  min: 0,
	  max: 20,
	  slide: function(e,ui){
	  	targ.eb_y = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eb_hS" ).slider({
	  min: 0,
	  max: 50,
	  slide: function(e,ui){
	  	targ.eb_h = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eb_wS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eb_w = 0.1*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eb_iS" ).slider({
	  min: -300,
	  max: 300,
	  slide: function(e,ui){
	  	targ.eb_i = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eb_jS" ).slider({
	  min: -300,
	  max: 300,
	  slide: function(e,ui){
	  	targ.eb_j = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_line_widthS" ).slider({
	  min: -100,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_line_width = 0.3*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_pup_widthS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_pup_width = 0.3*ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_pup_oS" ).slider({
	  min: -50,
	  max: +50,
	  slide: function(e,ui){
	  	targ.eye_pup_o = ui.value;
	  	replotCurve();
	  }
	});
	$( "#eye_pup_sizeS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	targ.eye_pup_size = 0.01*ui.value;
	  	replotCurve();
	  }
	});
	$( "#angS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	ang = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#sadS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	sad = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#preS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	pre = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#coolS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	cool = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#cuteS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	cute = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#funnyS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	funny = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#editS" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	edit_p = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$( "#edit2S" ).slider({
	  min: 0,
	  max: 100,
	  slide: function(e,ui){
	  	edit2_p = 0.01*ui.value;
	  	set_face();
	  	replotCurve();
	  }
	});
	$("#data-tweet").click(
		function(){
			save_session();
    		var form = document.getElementById("tweet-form");
			eye_open=1;
			set_face();
			replotCurve();
    		var base64 = canvas.toDataURL();
    		var newInput = document.createElement("input");  //input要素作成
    		newInput.type="hidden";
    		newInput.name="data";
		    newInput.value=base64;  //値を設定
		    form.appendChild(newInput);  //formにinupt要素を追加

		    form.submit(); //送信
		}
	);
	$("#asset-submit").click(
		function(){
			post_data = clone(mascot_face);
			post_data.data = canvas.toDataURL();
			post_data.name = document.getElementById("asset-name").value;
			//console.log(post_data);
			btn = $("#asset-submit");
			 $.ajax({
	            url: "/asset",
	            type: "POST",
	            data: post_data,
	            timeout: 10000,  // 単位はミリ秒
	            beforeSend: function(xhr, settings) {
//	    			var token = jQuery('meta[name="_csrf"]').attr('content');
//  	  			xhr.setRequestHeader('X_CSRF_TOKEN', token);
    	  			
	            	if($("#asset-name").val().length<=16){
	            		$("#response").text("登録中..")
	                	btn.attr('disabled', true);
	            	}
	            },
	            complete: function(xhr, textStatus) {
	              btn.attr('disabled', false);
	            },
	            success: function(result, textStatus, xhr) {
	            	$("#response").text(result)
	              	console.log(result);
	            },
            	error: function(xhr, textStatus, error) {}
        	});
		}
	);
	$("#asset-name").keydown(function(){
		btn = $("#asset-submit");
		if($(this).val().length>16){
			$("#response").text("名前が長すぎます")
	        btn.attr('disabled', true);
		}else{
			$("#response").text("")
	        btn.attr('disabled', false);
		}
	});
	$("#sign_in_twitter").click(function(){
		save_session();
		location.href="/sign_in_with_twitter"
	});
	$("#asset-choice-btn1").click(
		function(){
			$("#volume-panel").hide();
			$("#face-asset-choice:hidden").show();
		}
	);
	$("#asset-choice-btn2").click(
		function(){
			$("#volume-panel").hide();
			$("#face-asset-choice2:hidden").show();
		}
	);
	$("#asset-choice-btn-close").click(asset_choice_close);
	$("#asset-choice-btn-close2").click(asset_choice_close2);
	asset_choice_close();
	asset_choice_close2();
	SetSliderValue(targ);
	if(set_mode==false){
		set_face();
//		setInterval(function(){set_face();replotCurve();},200);
		setInterval(function(){
			if(eye_open_act>1){
				eye_open_v += (0.5-eye_open)*0.95;
				eye_open += eye_open_v*0.95;
				if(eye_open > 0.95 && eye_open_v > 0){
					eye_open_act = -Math.random()*10 + 0.8;
					eye_open = 1;
					eye_open_v = 0;
				}
				replotCurve();
			}else{
				eye_open_act+=0.1;
			}
		},100);
		setInterval(function(){
				wave_u += (0.5 - wave_v)*0.9;
				wave_v += wave_u*0.9;
				replotCurve();

		},500);
	}
}

function save_session(){
			var post_data ={
			ang: ang,
			sad: sad,
			pre: pre,
			cool: cool,
			cute: cute,
			funny: funny,
			edit1: edit_p,
			edit2: edit2_p,
			edit_set1: JSON.stringify(edit_set),
			edit_set2: JSON.stringify(edit_set2)
			};

			btn = $("#sign_in_twitter");
			 $.ajax({
	            url: "/save_sessions",
	            type: "POST",
	            data: post_data,
	            timeout: 10000,  // 単位はミリ秒
	            beforeSend: function(xhr, settings) {
//	    			var token = jQuery('meta[name="_csrf"]').attr('content');
//    	  			xhr.setRequestHeader('X_CSRF_TOKEN', token);
	                btn.attr('disabled', true);
	            },
	            complete: function(xhr, textStatus) {
	                btn.attr('disabled', false);
	            },
	            success: function(result, textStatus, xhr) {
	            	console.log(result);
	            },
            	error: function(xhr, textStatus, error) {}
        	});
		}
if(window.addEventListener)
{
	window.addEventListener('load',function(evt){preload();Init(mascot_face)},false);
}
else if(window.attachEvent)
{
	window.attachEvent('onload',function(evt){preload();Init(mascot_face)});
}else{
	preload();
	Init(mascot_face);
}
