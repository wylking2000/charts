//Library code
//2013-05-21 方法名按照字母顺序排列，属性放置最上
;(function(){
	/*
	var
	generalProperties = 'id,title,for,alt,style,dir,lang,accesskey,tabindex,name,type,value',
	specialProperties = 'class',
	//只返回id选择器的dom元素
	g = function(selector){
		if(typeof selector == 'string'){
			return document.getElementById(selector);
		}

		if (typeof selector == 'object' && selector.nodeType) {
			return selector;
		}

		return null;
	},
	getAttr = function(selector, attr){
		var
		dom = g(selector)		

		if(new RegExp(attr+',').test(generalProperties)){
			return dom[attr];
		}
		if(attr == specialProperties){
			return dom.className;
		}
		return dom.getAttribute(attr);
	},
	setAttr = function(selector, attr, value){
		var
		dom = g(selector)
		if(new RegExp(attr+',').test(generalProperties)){
			dom[attr] = value;
			return;
		}
		if(attr == specialProperties){
			dom.className = value;
			return;
		}
		dom.setAttribute(attr, value);
		return;
	}
	*/
	
	//以下定义Charts类
	function Charts(selector, options){
		this.init(selector, options);
	}
	Charts.prototype = {

		//默认属性
		defaultOption: {
			chart: {
				type: 'line',
				width: 400,
				height: 600
			}
		},
		//经过初始化处理之后得到的最终选项
		finalOptions: null,
		//isSupportCanvas: null,
		//isSupportVml: null,
		//isSupportSVG: null,

		//根据均衡算法，调整Y轴显示坐标
		/*需要均衡的数值*/
		/*几份*/
		balanceYAxis: function(number, several){
			var
			several = several || 5,		//默认分成5份
			a = Math.ceil(number/several),
			l = (a+'').length,
			bit = Math.pow(10,l-1),
			i = Math.ceil(a/bit),
			max = i * bit * several

			return max;
		},

		canSupportSVG: function(){
			return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
		},

		canSupportCanvas: function(){
			return !!document.createElement('canvas').getContext;
		},

		canSupportVML: function(){
			 if (typeof this.isSupportVml == "undefined") {
		        var a = document.body.appendChild(document.createElement('div'));
		        a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
		        var b = a.firstChild;
		        b.style.behavior = "url(#default#VML)";
		        this.isSupportVml = b ? typeof b.adj == "object": true;
		        a.parentNode.removeChild(a);
		    }
		    return this.isSupportVml;
		},		

		//@return {String}
		dotCurvePath: function(height, yMax, cellWidth, data){
			var
			l = data.length,
			curveArray = [],			
			i = 0,
			j = 0


			for (var lineArray = [], dotArray = []; i < l; i++) {
				
				for (var k in data[i]) {
					//数据线
					lineArray[lineArray.length] = (j==0 ? 'M ' : 'L ') + j*cellWidth + ' ' + height*( 1 - data[i][k]/yMax);

					//数据点
					dotArray[dotArray.length] = '<circle cx="'+j++*cellWidth+'" cy="'+height*( 1 - data[i][k]/yMax)+'" r="4" stroke="#2f7ed8" stroke-width="1" fill="#2f7ed8"/>';
				};

				curveArray[curveArray.length] = ' <g class="charts-series"><path fill="none" d="' + lineArray.join(' ') + '" stroke="#2f7ed8" stroke-width="2" zIndex="1"></path></g>';

			};

			return curveArray.join('') + dotArray.join('');
		},

		drawCanvas: function(){
			var
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			options = this.finalOptions,
			selector = options['chart']['selector'],
			width = canvas.width = options['chart']['width'],
			height = canvas.height = options['chart']['height']

			context.fillStyle = "#fff";
			context.fillRect(0,0,width,height);

			context.strokeStyle = "#c0c0c0";
			context.lineWidth = 1;
			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(0,400);
			//0.5单位的位置才会画出1px的线条，不然会出现2px线条
			context.moveTo(100.5,0);
			context.lineTo(100.5,400);
			context.moveTo(200,0);
			context.lineTo(200,400);
			context.moveTo(300,0);
			context.lineTo(300,400);
			context.moveTo(400,0);
			context.lineTo(400,400);
			context.moveTo(500,0);
			context.lineTo(500,400);
			context.moveTo(600,0);
			context.lineTo(600,400);
			context.moveTo(700,0);
			context.lineTo(700,400);
			context.moveTo(800,0);
			context.lineTo(800,400);

			context.moveTo(0,0);
			context.lineTo(800,0);
			context.moveTo(0,50.5);
			context.lineTo(800,50.5);
			context.moveTo(0,100);
			context.lineTo(800,100);
			context.moveTo(0,150);
			context.lineTo(800,150);
			context.moveTo(0,200);
			context.lineTo(800,200);
			context.moveTo(0,250);
			context.lineTo(800,250);
			context.moveTo(0,300);
			context.lineTo(800,300);
			context.moveTo(0,350);
			context.lineTo(800,350);
			context.moveTo(0,400);
			context.lineTo(800,400);
			context.moveTo(0,450);
			context.lineTo(800,450);
			context.moveTo(0,500);
			context.lineTo(800,550);
			context.moveTo(0,600);
			context.lineTo(800,600);
			
			//context.closePath();
			context.stroke();

			context.beginPath();
			context.strokeStyle = "#2f7ed8";
			context.lineWidth = 2;
			context.moveTo(0,250);
			context.lineTo(100,350);			
			context.lineTo(200,198);			
			context.lineTo(300,72);			
			context.lineTo(400,332);			
			context.lineTo(500,310);
			context.lineTo(600,326);
			context.lineTo(700,222);
			context.lineTo(800,186);
			
			//context.closePath();
			context.stroke();
			//画点
			context.beginPath();
			context.fillStyle = "#2f7ed8";
			//有圆心坐标，所以直接用
			context.arc(0,250,4,0,2*Math.PI);
			context.arc(100,350,4,0,2*Math.PI);
			context.arc(200,198,4,0,2*Math.PI);
			context.arc(300,72,4,0,2*Math.PI);
			context.arc(400,332,4,0,2*Math.PI);
			context.arc(500,310,4,0,2*Math.PI);
			context.arc(600,326,4,0,2*Math.PI);
			context.arc(700,222,4,0,2*Math.PI);
			context.arc(800,186,4,0,2*Math.PI);

			context.fill();
			

			document.getElementById(selector.replace('#','')).appendChild(canvas);			
		},

		drowCharts: function(){			
			/*

			if(this.isSupportSVG){
				this.drawSVG();
				return;
			}

			if(this.isSupportVML){
				this.drawVML();
				return;
			}
			*/
			if(this.isSupportCanvas){
				this.drawCanvas();
				return;
			}

			alert(this.isSupportSVG + ' ' + this.isSupportVML + '' + this.isSupportCanvas);

		},

		//画出图形
		drawSVG: function(){
			var
			options = this.finalOptions,
			selector = options['chart']['selector'],
			width = options['chart']['width'],
			height = options['chart']['height'],
			yMax = this.balanceYAxis(options['yAxis']['max']),
			gridPathHTML = this.gridPath(yMax, 5, height, options['xAxis']['length'], width),
			dotCurvePathHTML = this.dotCurvePath(height, yMax,parseInt(width/options['xAxis']['length']), options['series']['data']),
			svgInnerHTMLArray = [
				
				//svn begin tag string
				'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">',	//svg doctype
				'<desc>Created By Sunny</desc>',	//author info
				'<rect fill="#FFFFFF" x="0" y="0" width="' + width + '" height="' + height + '"></rect>'	//background-color
			],
			svgInnerHTMLString = ''	//用于存放最后生成的svg html 字符串


			//网格
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<g class="charts-grid"><path fill="none" d="';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = gridPathHTML;
			svgInnerHTMLArray[svgInnerHTMLArray.length] = ' " stroke="#C0C0C0" stroke-width="1"></path></g>';

			//2pxY轴边线，不能太贴边，不然就显示不出2px了
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<g class="charts-axis-y"><path fill="none" d="M 1 0 L 1 ' + height + '" stroke="#C0C0C0" stroke-width="2"></path></g>';
			//2pxX轴边线
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<g class="charts-axis-x"><path fill="none" d="M 1 ' + (height-1) + ' L ' + (width-1) + ' ' + (height-1) + '" stroke="#C0C0C0" stroke-width="2"></path></g>';

			svgInnerHTMLArray[svgInnerHTMLArray.length] = dotCurvePathHTML;
			
			
			$(selector).html(svgInnerHTMLArray.join(''));
			//$(selector).html(''+this.isSupportSVG()+ this.isSupportCanvas()+ this.isSupportVML());
			//alert(''+this.isSupportSVG()+ this.isSupportCanvas()+ this.isSupportVML())
		},
		//画出图形
		drawVML: function(){
			var
			options = this.finalOptions,
			selector = options['chart']['selector'],
			width = options['chart']['width'],
			height = options['chart']['height'],
			yMax = this.balanceYAxis(options['yAxis']['max']),
			gridPathHTML = this.gridPath(yMax, 5, height, options['xAxis']['length'], width),
			dotCurvePathHTML = this.dotCurvePath(height, yMax,parseInt(width/options['xAxis']['length']), options['series']['data']),
			svgInnerHTMLArray = [
				
			],
			svgInnerHTMLString = ''	//用于存放最后生成的svg html 字符串

			document.namespaces.add('v','urn:schemas-microsoft-com:vml','#default#VML');

			//网格
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:rect style="position:absolute;width:800px;height:400px" fillcolor="#fff" strokewidth="0" strokecolor="#fff"></v:rect>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:shape style="position:absolute;width:800px;height:400px;" CoordOrig="0,0" CoordSize="800,400" strokecolor="#c1c1c1" strokeweight="1" path="';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,0 l0,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm100,0 l100,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm200,0 l200,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm300,0 l300,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm400,0 l400,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm500,0 l500,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm600,0 l600,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm700,0 l700,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm800,0 l800,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,0 l800,0 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,50 l800,50 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,100 l800,100 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,150 l800,150 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,200 l800,200 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,250 l800,250 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,300 l800,300 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,350 l800,350 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,400 l800,400 ';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'x e"></v:shape>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:shape style="position:absolute;width:800px;height:400px;" CoordOrig="0,0" CoordSize="800,400" strokecolor="#2f7ed8" strokeweight="2" filled="false" path="';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'm0,250';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l100,350';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l200,198';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l300,72';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l400,332';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l500,310';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l600,326';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l700,222';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = 'l800,186';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '"></v:shape>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:98px;top:348px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:198px;top:196px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:298px;top:70px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:398px;top:330px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:498px;top:308px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:598px;top:324px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:698px;top:220px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '<v:oval style="position:absolute;width:4px;height:4px;left:798px;top:184px;" fillcolor="#2f7ed8" strokecolor="#2f7ed8" strokeweight="4"></v:oval>';
			svgInnerHTMLArray[svgInnerHTMLArray.length] = '';
			$(selector).html(svgInnerHTMLArray.join(''));
		},

		
	
		// @retrn {String}
		gridPath: function(yMax, ySize, height, xSize, width){
			var
			cellHeight = parseInt(height/ySize),
			cellWidth = parseInt(width/xSize),
			yPath = [],
			xPath = []

			//L(大写)不会出现复线(双线)，l(小写)容易出现复线，画1px的线可能表现出2px线，其中一条颜色深，一条颜色浅
			//如果以0.5奇数倍坐标点开始和结束，线条不会出现浅色2px线条
			for (var i = 0; i < ySize; i++) {
				yPath[yPath.length] = 'M 0 ' + (i * cellHeight + 0.5) + ' L ' + width + ' ' + (i * cellHeight + 0.5);
			};
			for (var i = 0; i < xSize + 1; i++) {
				xPath[xPath.length] = 'M ' + (i * cellWidth + 0.5) + ' 0 L ' + (i * cellWidth + 0.5) + ' ' + height;
			};

			return yPath.join(' ') + ' ' +  xPath.join(' ')
		},

		init: function(){
			var
			arg = arguments,
			options = arg[arg.length-1],
			initOptions = this.initOptions(arg[0], options)

			this.finalOptions = this.mergeOptions({chart:{selector:arg[0].selector}},this.defaultOption, initOptions, options);


			//this.drowSVG(arg[0],finalOptions);	
			//this.drowVML(arg[0],finalOptions);

			//通过this.finalOptions获取所有参数，不在通过方法的形参传来传去了			
			this.drowCharts();
		},

		//根据传入的options参数，调整初始化一些参数，比如width等
		initOptions : function(selector, options){
			
			var 
			node = $(selector),
			width = node.width(),
			height = node.height(),
			dataArray = options.series.data,
			dataLength = dataArray.length,
			parseArray = [],
			resultOptions = {},
			length = 0,
			valueMin = 999999,
			valueMax = -999999,
			keyArray = [],
			valueArray = []

			this.isSupportSVG = this.isSupportSVG || this.canSupportSVG();
			this.isSupportVML = this.isSupportVML || this.canSupportVML();
			this.isSupportCanvas = this.isSupportCanvas || this.canSupportCanvas();

			for (var i = 0; i <dataLength; i++) {
				parseArray.push(this.parseData(dataArray[i]))
			};

			for (var i = 0; i < parseArray.length; i++) {
				length = parseArray[i].length > length ? parseArray[i].length : length;
				keyArray = this.mergeOptions(keyArray, parseArray[i].keyArray);
				valueArray = this.mergeOptions(valueArray, parseArray[i].valueArray);
				valueMin =  parseArray[i].valueMin < valueMin ? parseArray[i].valueMin : valueMin;
				valueMax =  parseArray[i].valueMax > valueMax ? parseArray[i].valueMax : valueMax;
			}; 

			return {
				chart: {
					width: width,
					height: height
				},
				xAxis: {
					length: length,
					categories: keyArray
				},
				yAxis: {
					categories: valueArray,
					max: valueMax,
					min: valueMin
				}
			}
		},

		mergeOptions: function(){
			var
			res = {},
			l = arguments.length,
			isObject = function(o){	//判断是否是一个离散对象，可以使用如下类型验证 {},"",1,function(){},[],undefined,null,true //&& o instanceof Array === false
				return typeof o === 'object' && o instanceof Object === true && o instanceof Array === false;
			},
			recursiveMerge = function(a, b){	//递归调用合并2个离散对象
				var 
				isA = isObject(a),
				isB = isObject(b)
				
				if( isA && isB ){	//a, b两个参数都是离散对象时才继续执行merge
					for(var k in b){
						if (!isObject(b[k])) {						
							a[k] = b[k];
						}else{	//如果value是离散对象，则需要进一步递归合并
							a[k] = recursiveMerge(a[k] || {}, b[k])
						}					
					}
					return a
				}

				if(isA){	//如果上面没有return，并且a是对象的话，那就只有a是离散对象了，返回a
					return a
				}

				if(isB){	//如果上面a也不是对象，并且b是对象，肯定返回b了
					return b
				}
				
				//如果以上语句都没有返回，表示a，b都不是离散对象，则返回一个空对象
				return {};								
			}

			for(var i=0; i<l; i++){
				res = recursiveMerge(res, arguments[i]);	
			}

			return res;			
		},
		//解析输入的数据，分解成
		parseData: function(data){
			var 
			length = 0,
			keyArray = [],
			valueArray = [],
			max = -99999999,
			min = 999999999

			for(var k in data){
				keyArray[keyArray.length] = k;
				valueArray[valueArray.length] = data[k];
				max = data[k] > max ? data[k] : max;
				min = data[k] < min ? data[k] : min;
				length++
			}

			return {
				'length' : length,	//data length or size
				'keyArray' : keyArray,
				'valueArray' : valueArray,
				'valueMax': max,
				'valueMin': min
			}
		}

	}
	Charts.prototype.constructor = Charts;

	

	/**
	 * @fn 生成图表
	 * @return this
	 * @param {Object} paramObject 对象格式的配置参数
	 * {
	 *	width:100,
	 *	height:100,
	 *	text:{},
	 *	
	 *	grid:{},
	 *	xAxis:{},
	 *	yaxis:{},
	 *	curve:{}
	 * }
	 * @other 这里先参考 highcharts的配置参数，稍后再整理
	 * */
	$.fn.charts = function(options){
		new Charts($(this), options);
		return $(this);
	}
})();
