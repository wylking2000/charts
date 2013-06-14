	var data = {"2013-04-21":2098,"2013-04-22":1303,"2013-04-23":1221,"2013-04-24":2311,"2013-04-25":1509,"2013-04-26":1279,"2013-04-27":0}
	//affairs code
	var charts = new Charts({
		chart: {
			type: 'line',
			selector: 'charts',
	    		backgroundColor: '#f1f1f1'
		},
		title: {
			align: 'center',	
			//x:400,
			//y:200,
			//floating: false,
			//style:null,
			//useHTML:false,
			verticalAlign:'top',
			style: {
				/* 为减少开发的难度和工作量，在style配置选项中只支持以下几种样式设置，不支持其他额外属性 */
				marginLeft: '15px',	//只支持px
				marginRight: '15px',
				marginBottom: '5px',
				marginTop: '5px'
			}, 
			text: '媒体播放统计' //title显示开关，如果存在就显示，不存在就不显示 
			//text: null 
		},
		subtitle:{
       			align: 'center'	,
			style: {
				marginBottom: '5px',
				marginTop: '0px'
			},	
			verticalAlign: 'top',
			text: '二级标题'
			//text: null
		},
		series:{
			data: [data]
		}
	});

