	var data = {"2013-04-21":2098,"2013-04-22":1303,"2013-04-23":1221,"2013-04-24":2311,"2013-04-25":1509,"2013-04-26":1279,"2013-04-27":0}
	//affairs code
	var charts = new Charts({
		chart: {
			type: 'line',
			selector: 'charts'
		},
		title: {
			text: '媒体播放统计',
			align: 'center'	
			//x:10,
			//y:10,
			//floating:false,
			//margin:15,
			//style:null,
			//useHTML:false,
			//verticalAlign:top,
		},
		subtitle:{
			text: '',
       			align: 'center'		
		},
		series:{
			data: [data]
		}
	});

