$(document).ready(function(){
	var data = {"2013-04-21":2098,"2013-04-22":1303,"2013-04-23":1221,"2013-04-24":2311,"2013-04-25":1509,"2013-04-26":1279,"2013-04-27":0}
	//affairs code
	$('#charts').charts({
		chart: {
			type: 'line'
		},
		series:{
			data: [data]
		}
	});
});

