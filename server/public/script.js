$(document).ready(function() {
	
	

	// 获取充电节点剩余电量
	const fetch_electric = () => {
		$("#electric").text('30');
	};
	// 获取车自身电量
	const fetch_myself = () => {
		$("#car").text('86');
	};
	
	// 获取当前位置
	const fetch_position = () => {
		$("#position").text('(20,5)');
	};
	// 获取当前正在充电节点个数
	const fetch_count = () => {
		$("#count").text('4');
	};
	setInterval(() => {
		fetch_humidity();
		fetch_temperature();
		fetch_electric();
		fetch_myself();
		fetch_position();
		fetch_count();
	}, 2000)
	//chart.js 图表
	//温度图表
	const temperatureCanvasCtx = $("#temperature_chart")[0].getContext("2d");
	const temperatureChart_options={
		//将温度信息显示为现状图
		type: "line",
		data: {
			labels: [],//保存时间点
			datasets: [{
				data: [],//保存传感器值
				backgroundColor: "rgba(0,200,100,0.5)"
			}]
		},
		options:{
			legend:{display:false},
			responsive:true,
			maintainAspectRatio:true,
			scales:{
				yAxes:[{ticks:{suggestedMin:10,suggestedMax:40}}]
			}
		}
	}
	const temperatureChart = new Chart(temperatureCanvasCtx,temperatureChart_options);
	//湿度图表
	const humidityCanvasCtx = $("#humidity_chart")[0].getContext("2d");
	const humidityChart_options={
		//将温度信息显示为线状图
		type: "line",
		data: {
			labels: [],//保存时间点
			datasets: [{
				data: [],//保存传感器值
				backgroundColor: "rgba(200,0,100,0.5)"
			}]
		},
		options:{
			legend:{display:false},
			responsive:true,
			maintainAspectRatio:true,
			scales:{
				yAxes:[{ticks:{suggestedMin:0,suggestedMax:100}}]
			}
		}
	}
	const humidityChart = new Chart(humidityCanvasCtx,humidityChart_options);
	
	//定义一个更新图表数组的函数,接收一个数组作为参数，和一个固定的长度
	const update_chart_array=(arr,val,size)=>{
		/*使用数组的push和shift方法来得到一个固定长度的数组*/
		arr.push(val);
		if(arr.length>size)
		{
			arr.shift()
		}
	}
	// 动态显示温度
	// 获取温度
	const fetch_humidity = () => {
		fetch('/humidity').then(response => response.text())
			.then(data => {
				const now =new Date();
				const timeNow=`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
				update_chart_array(humidityChart_options.data.labels,timeNow,10);
				update_chart_array(humidityChart_options.data.datasets[0].data,data,10);
				humidityChart.update();//动态更新图表
				console.log(data);
				$("#humidity").text(data);
				
			})
			.catch(e => console.log("Oops, error", e))
	};
	const fetch_temperature = () => {
		fetch('/temperture').then(response => response.text())
			.then(data => {
				const now =new Date();
				const timeNow=`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
				update_chart_array(temperatureChart_options.data.labels,timeNow,10);
				update_chart_array(temperatureChart_options.data.datasets[0].data,data,10);
				temperatureChart.update();//动态更新图表
				console.log(data);
				$("#temperature").text(data);
				
			})
			.catch(e => console.log("Oops, error", e))
	};
});