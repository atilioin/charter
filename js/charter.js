function updateImage()
{
	$('#icon').attr('src','https://chart.googleapis.com/chart?chst='+$('#iconType').val()+'&chld=ski|bb|'+$('#content').val()+'|FFFFFF|000000');
}
function updateqricon()
{
	// Background type
	chf = "&chf=bg,"+$('input[name="qr-background"]:checked').attr('id')+","+$('input[name="qr-color"]').val().replace('#','');
	url='https://chart.googleapis.com/chart?cht=qr&chl='+$('#qrcontent').val()+'&choe='+$('input[name="qr-encoding"]:checked').attr('id')+'&chld='+$('input[name="qr-type"]:checked').attr('id')+'&chs='+$('#height').val()+'x'+$('#width').val()+chf;
	$('#qr.img').attr('src',url);
	$('#qr.url').val(url);
	$('#qr.imgurl').val('<img src="'+url+'"></img>');
}

$(function() {
	$('#content').bind("keyup",updateImage);
	$('#qrcontent').bind("keyup",updateqricon);
	$(".refresh").button();
	$(".download").button();
	var height = $("#height");
	var slider = $("<div id='heightslider'></div>").insertAfter( height ).slider({
		orientation: "vertical",
		min: 50,
		max: 300,
		range: "min",
		value: height.val(),
		slide: function( event, ui ) {
			height.val(ui.value);
			updateqricon();
		}
	});
	$("#height").change(function() {
		slider.slider( "value", $(this).val());
		updateqricon();
	});
	var width = $("#width");
	var widthslider = $("<div id='widthslider' style='width:150px;'></div>").insertAfter( width ).slider({
		min: 50,
		max: 300,
		range: "min",
		value: width.val(),
		width: 150,
		slide: function( event, ui ) {
			width.val(ui.value);
			updateqricon();
		}
	});
	$("#width").change(function() {
		widthslider.slider( "value", $(this).val());
		updateqricon();
	});
	var transparency = $("#transparency-slider");
	var slider = $("<div id='transparencyslider'></div>").insertAfter(transparency).slider({
		min: 0,
		max: 100,
		range: "min",
		value: 0,
		slide: function( event, ui ) {
			updateqricon();
		}
	});
	$("#transparency-slider").change(function() {
		slider.slider( "value", $(this).val());
		updateqricon();
	});
	$('#qraccordion').accordion({
			collapsible: true
	});
	$("#qr-encoding").buttonset();	
	$("#qr-type").buttonset();	
	$("#qr-background").buttonset();	
	$("input[name='qr-encoding'], input[name='qr-type'], input[name='qr-background'], input[name='qr-color']").change(function() {
		updateqricon();
	});
	$("input[name='qr-background']").change(function() {
		current = this.id;
		$('.background-selector').hide();
		$('#qr-'+current).show();				
		updateqricon();
		
	});
	$('.background-selector').hide();
	$(".download").click(function(e) {
		e.preventDefault();
		window.location=$('#'+$(this).attr("id")+'.img').attr('src');
	});
	$('#colorpicker').farbtastic('#color');
});