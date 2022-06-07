/**
 * @file components/ChartShow
 *  图表
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 引入组件
import echarts from 'echarts/lib/echarts';
// 引入扇形图
import  'echarts/lib/chart/pie';
// 引入legend
import 'echarts/lib/component/legend';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import styles from './style.less';
import service from "../../service"

//去除图例名称后面的两位字符
function tu(data){
    let str = "";   
    if(data.length >= 4){
        str = data.substring(0,data.length-2);
    }else{
        str = data;
    }
    return str
}

class ChartShow extends Component {
    // static childContextTypes={
    //     data :PropTypes.array , //首页--机构类型   
    // }
    
    // getChildContext(){
    //     //这里返回什么  上下文的内容就是什么
    //      return {
    //         data :this.props.data,
    //      }
    // }
    constructor(props, context) {
        super(props, context);
        this.state={
            params: {
                name: '全部',
                value: 0,
                proportion : 0
            }, // 图表信息，name主标题，value数量
            title : "机构客户数量" , //机构客户数量
            nstitutionalType : [] , //机构客户类型
            nstitutionalTypes: [] ,//存放机构类型数量
            jurisdiction : [],
            EchartsNum : ""
        };
    }
    //bar
    async queryCustCountByBusiType(orgType){
        let orgType2 = "";
        if(orgType){
            orgType2 = orgType
        }else{
            orgType2 = "";
        }
        let result = await service.queryCustCountByBusiType({
            "orgType" :orgType2
         })
        // console.log(result,888888)
        if(result && result.code == 0 && result.data){
            this.setState({
                nstitutionalTypes : result.data
            })
            this.initChart();
        }
        let _this = this;
       
     
        // jurisdiction
       
    }
    //pei
    async queryCustCountByOrgType(){
        let result = await service.queryCustCountByOrgType()
        if(result && result.code == 0 ){
            this.setState({
                nstitutionalType : result.data
            })
        }
        let {jurisdiction} = this.state
        this.state.nstitutionalType.map(item=>{
            let obj = {};
            obj.name = item.types;
            obj.orgType = item.orgType
            jurisdiction.push(obj)
        })
    }
    async componentWillMount() {
       let type = "";
        await this.queryCustCountByBusiType(type)
        await this.queryCustCountByOrgType()
        let _this = this;
        this.initChart2(this.state.nstitutionalType,this.state.jurisdiction,_this);
    }
    //pei
    initChart2 = (params,jurisdiction,_this) =>{
        let dataAxiss = []; //类型名称
        let dataxAxi = [] ; //类型数据
        let dataxAx = [] ; //比率
        let num = 0;
        for(let i = 0 ; i <  params.length; i++){
            let  obj = {};
            obj.name = params[i].types;
            obj.value =  params[i].total;
            dataAxiss.push(obj);
            num +=  params[i].total;
            dataxAx.push( params[i].percentage);
        }
        // dataAxiss[0].selected = true;
        // let dataAxiss2 = [];
        let dataAxissColor = [];
        dataAxiss.map(item=>{
            if(item.name.indexOf("主权基金") != -1){
                dataAxissColor[0] = "#4B7EFE";
            }
            if(item.name.indexOf("保险机构") != -1 ){
                dataAxissColor[2] = "#D6EAFF";
            }
            if(item.name.indexOf("海外客户") != -1){
                dataAxissColor[3] = "#FF7777";
            }
            if(item.name.indexOf("证券私募") != -1){
                dataAxissColor[7] = "#E5DCFF";
            }
           
            if(item.name.indexOf("基金公司") != -1){
                dataAxissColor[1] = "#5BCEFF";
            }
            if(item.name.indexOf("银行机构") != -1){
                dataAxissColor[4] = "#FDC458";
            }
            if(item.name.indexOf("证券公司") != -1){
                dataAxissColor[6] = "#8FB0FC";
            }
            if(item.name.indexOf("股权私募") != -1){
                dataAxissColor[5] = "#FF9A2E";
            }
            if(item.name.indexOf("财务公司") != -1){
                dataAxissColor[10] = "#995C9F";
            }
            if(item.name.indexOf("信托公司") != -1){
                dataAxissColor[9] = "#BDBDBD";
            }
            if(item.name.indexOf("其他") != -1){
                dataAxissColor[11] = "#737373";
            }
            if(item.name.indexOf("保险客户") != -1){
                dataAxissColor[3] = "#A5CFEB";
            }
           
        })
       
        let dataAxiss2 = [] ; //存放数据
        for(let t = 0 ; t < dataAxiss.length ; t++){
            let obj = {};
            let obj2 = "";
            obj.name = dataAxiss[t].name;
            obj.value = dataAxiss[t].value;
            dataAxiss2.push(obj)
            if(dataAxiss[t].color){
                obj2 = dataAxiss[t].color
            }
            dataAxissColor.push(obj2)
        }
        let dataAxiss3 = []; 
        dataAxiss2.map(item=>{
            if(item.name == "主权基金"){
                dataAxiss3[0] = item;
            }
            if(item.name == "保险机构"){
                dataAxiss3[2] = item;
            }
            if(item.name == "保险客户"){
                dataAxiss3[3] = item;
            }
            if(item.name == "海外客户"){
                dataAxiss3[6] = item;
            }
            if(item.name == "基金公司"){
                dataAxiss3[1] = item;
            }
            if(item.name == "银行机构"){
                dataAxiss3[4] = item;
            }
            if(item.name == "证券公司"){
                dataAxiss3[7] = item;
            }
            if(item.name == "股权私募"){
                dataAxiss3[5] = item;
            }
            if(item.name == "财务公司"){
                dataAxiss3[10] = item;
            }
            if(item.name == "信托公司"){
                dataAxiss3[9] = item;
            }
            if(item.name == "证券私募"){
                dataAxiss3[8] = item;
            }
            if(item.name == "其他"){
                dataAxiss3[11] = item;
            }
        })
       
        
        this.setState({
            params: {
                name: '全部',
                value: num,
                proportion : "占比100%"
            }
        })
        if(dataAxiss && dataAxiss.length > 0){
            // this.setState({
            //     params : {
            //         value : dataAxiss[0].value,
            //         name : dataAxiss[0].name,
            //         proportion : "占比"+dataxAx[0]
            //     }
            // })
        }
        let legend = this.getLegendData(dataAxiss3);

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('mainPieNum'));
        //清空之前创建的图表
        myChart.clear();
        //适应父盒子宽度
        myChart.resize();
        //默认高亮
        // 指定图表的配置项和数据
        let option = {
            title: {
                text: "",
                textStyle: {
                    color: '#000',
                    fontSize: 24
                },
                padding :[20,0,20,22],
                top : 0
            },
            legend:legend,
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    center: ['50%','40%'],  //圆心位置
                    radius: ['45%', '64%'], //内外圈位置
                    avoidLabelOverlap: false,
                    label: {  //隐藏折线指示标志
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,   // hover名称
                            formatter: [  // 内容设置
                                `{a|{b}}`,
                                '{c|{c}}{c|个}',
                                "{b|占比}{b|{d}%}",
                            ].join('\n'),
                            rich: {
                                a: {
                                    fontSize: '16',
                                    color: 'rgba(86,92,102,1)',
                                    fontWeight: 500,
                                    padding: [8,0],
                                    fontFamily : "PingFangSC-Regular"
                                },
                                c: {
                                    fontSize: '26',
                                    color: 'rgba(60,72,89,1)',
                                    fontWeight: 500,
                                    fontFamily : "PingFangSC-Regular"
                                },
                                b:{
                                    fontSize:"16",
                                    color: 'rgba(86,92,102,1)',
                                    fontWeight:500,
                                    padding: [10,2],
                                    fontFamily : "PingFangSC-Regular"
                                }
                            }
                        
                        }
                    },
                    labelLine: { //隐藏折线指示线
                        normal: {
                            show: false
                        }
                    },
                    data:dataAxiss3,
                    color: dataAxissColor
                }
            ],
           
        };
       
        // 绘制图表
        myChart.setOption(option);
        //设置默认高亮
        // let index = 0; // 高亮索引
        // myChart.dispatchAction({
        //   type: "highlight",
        //   seriesIndex: index,
        //   dataIndex: index
        // });
       
        myChart.on("mouseover", function(e) {  
            let name = e.data.name;
            let namejurisdiction = "";
            jurisdiction.map(item=>{
                if(item.name.indexOf(name) != -1){
                    namejurisdiction = item.orgType
                }
            })
            _this.queryCustCountByBusiType(namejurisdiction)
            _this.setState({
                params: {
                    name: '',
                    value: '',
                    proportion : ""
                },
                EchartsNum : 1
            })
        });
        myChart.on("mouseout", function(e) {
          
            let type = "";
            // _this.queryCustCountByBusiType(type)
        
            _this.setState({
                params: {
                    name: '全部',
                    value: num,
                    proportion : "占比100%"
                },
                EchartsNum : 2
            })
        })
       
            
    }
    
    //计算legend位置
    getLegendData = (data) =>{
        let legendData = [];
        if(!data || data.length===0){
            return legendData
        }
        let topNum = 230;
        data.map((item,index)=>{
            let top = Math.floor(index  / 4);
            if(!legendData[top]){
                legendData[top] = [];
            }
            legendData[top].push(item.name)
        })
        let legend = [];
        if(legendData.length>0){
            legendData.map((item,index)=>{
                legend.push({  // 提示框组件
                    orient: 'horizontal',
                    x: 'center',
                    top: topNum + 20 * index + '',
                    data: item,
                    left : 5,
                    align : "left",
                    icon: 'circle', //icon样式改圆点
                    itemHeight: 4,  //icon距离文本的距离
                    itemWidth: 7,  //icon的大小
                    selectedMode: false,  //取消点击划过事件
                    textStyle:{
                        padding:[0,4, 0, 0],
                        fontSize : 11,
                        fontWeight : 500,
                        color : "#818999",
                        width : 49,

                    }
                })
            })
        }
        
        return legend
    }
    //bar
    initChart = (params)=>{
        // console.log(this.state.nstitutionalTypes,888888)
        let dataAxiss = []; //类型名称
        let dataxAxi = [] ; //类型数据
        this.state.nstitutionalTypes.map((item) => {
            dataAxiss.push(item.types);
            dataxAxi.push(item.total);
        })
        // dataAxiss.reverse();
        const yMax = 200;  //设置区域范围的人数   
        let dataShadow = [];

        for (let i = 0; i < dataxAxi.length; i++) {
            dataShadow.push(yMax);
        }
        // console.log(dataShadow,333333)
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('mainBarNum'));
        //清空之前创建的图表
        myChart.clear();
        //适应父盒子宽度
        myChart.resize();
        let DataZoom = null;
        if(this.state.nstitutionalTypes.length >= 6){
            DataZoom = [{
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'weakFilter',
                height: 260,
                width : 10,
                right: 10,
                start: 0,
                padding:[10,0,0,0],
                end: 30,
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '10%',
                showDetail: false,
                xAxisIndex : [0],
                orient: "vertical",
                backgroundColor : "#fff",
                showDataShadow : false,
                handleStyle:{
                    backgroundColor :" rgba(240,240,240,1)",
                    borderType  : "solid",
                }
            }]
        }
        //定义一个变量来控制主体的粗细
        let borderWidth = 0;
        if(dataShadow.length <= 6 ){
            borderWidth = 20;
        }else{
            borderWidth = 10;
        }
        // 指定图表的配置项和数据
        let option = {
            tooltip: { // 提示框组件全局   //设置了会报错
                trigger: 'item',           // 坐标轴指示器，坐标轴触发有效
                formatter: "{b}: {c} ",
                backgroundColor: '#00345B',
                padding: [5, 8],
                textStyle: {
                    color: '#fff',
                    fontFamily: 'PingFangSC-Medium',
                    fontWeight: 'normal',
                    fontSize: 12,
                    lineHeight: 17,
                    height: 17,
                },
                position: 'top',
            },
            grid: {   // 设置直角坐标系边距
                left: '0%',
                right: '12%',
                bottom: '6%',
                top: '0%',
                containLabel: true
            },
            yAxis: {
                data: dataAxiss,
                boundaryGap : true,
                offsetY : 4,
                axisLabel: {
                    show : true,
                    textStyle: {
                        color: 'rgba(71,75,89,1)',
                        fontWeight : 400,
                        fontSize : 14,
                        fontFamily : "PingFangSC-Regular",
                    },
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(239,239,239,1)',
                        width: 2,                        
                    }
                },
                splitLine:{
                    show : false,
                    lineStyle : {
                        width : 1,
                        shadowColor :"rgba(231,235,239,1)",
                       
                    }
                },
            },
            dataZoom: DataZoom,
            xAxis: {
                // min: 0,
                // max: sumTotal === 0 ? 10 : maxTotal,
                name : "(人)",
            
                nameTextStyle:{
                    color : "rgba(26,37,69,1)",
                    padding :[30, 0, 0, -35],  
                    fontWeight : 400,
                    fontSize : 14,
                    fontFamily : "PingFangSC-Regular"
                },
                axisLine : {
                    show : true,
                    lineStyle: {
                        color: 'rgba(239,239,239,1)',
                        width: 2,
                        interval : 64,

                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(231,235,239,1)',
                        width: 1,
                        interval : 64,
                        opacity : 0.4532,
                       
                    }
                },
                axisTick: {
                    show: false,
                    
                },
                axisLabel: {
                    showMaxLabel: false,
                    textStyle: {
                        color: '#1A2545',
                        interval : 64,
                        margin : [11,0,0,0]
                    },
                    // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                },
                
            },
            series: [
                {
                    data: [2, 2],
                    name: "aaa",
                    stack: "堆叠",
                    type: "bar",
                    itemStyle:{
                        opacity:0,
                    }
                },
                { // For shadow
                    type: 'bar',
                    silent: true,  // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                    itemStyle: {
                        normal: {
                            color: 'rgba(245,246,248,1)',
                            barBorderRadius: 2,                            
                        }
                    },
                    data: dataShadow,
                    barWidth : borderWidth,
                    animation: false,
                    
                },
                {
                    type: 'bar',
                    tooltip: {
                        trigger: 'item',
                      },
                    barWidth : borderWidth,
                    barGap:'-100%',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 2,
                            padding : [0,0,0,4],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: 'rgba(153,192,255,1)'},
                                    // {offset: 0.5, color: '#7ba7f7'},
                                    {offset: 1, color: 'rgba(95,144,241,1)'}
                                ]
                            ),
                          
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: 'rgba(249,88,75,1)'},
                                    {offset: 1, color: 'rgba(245,63,117,1)'}
                                ]
                            )
                        }
                    },
                    data: dataxAxi,
                    label:{//label要加入normal才可生效,label即为x轴对应Y轴的值
                        normal:{
                            show:true,  
                            color:'rgba(71,75,89,1)',//设置渐变时候控制不到颜色，只能通过全局textStyle来控制
                            position:'right',
                            fontSize: 11,
                            fontWeight : 400
                        }
                    },
                }
            ]
        };;

        // 绘制图表
        myChart.setOption(option);

        myChart.on('mousemove', (params)=>{
            // console.log('mousemove')
        });

        myChart.on('mouseout', (params)=>{
            // console.log('mouseout')
        });
    }
    componentDidMount(){
        
        let myChart1 = echarts.init(document.getElementById('mainPieNum'));
        let myChart2 = echarts.init(document.getElementById('mainBarNum'));
        // console.log(myChart1,myChart2,echarts,23333)
        echarts.connect([myChart1,myChart2]) //将两个图表进行关联
    }
    mouseout = ()=>{
       
        let type = '';
        this.queryCustCountByBusiType(type)
    }
    render() {       
        let {value , name,proportion} = this.state.params;
        return (
            <div className={styles.container}>
            <div className={styles.title}>机构客户数量</div>
                <div className={styles.pieWarper} >

                    <div id="mainPieNum" style={{ width: "100%", height: 300 }}onMouseLeave={this.mouseout} > </div>
                    <div className={styles.titleWraper}>
                        <div className={styles.title}>
                            {name}
                        </div>
                        <div className={styles.number}>
                            {value}
                            {value === '' ? null : <span className={styles.unit}>个</span>}
                        </div>
                        <div className={styles.proportion}>
                            {proportion === '' ? null : <span className={styles.units}>{proportion}</span>}
                        </div>
                    </div>
                </div>
                
                <div className={styles.barWarper}>
                    <div id="mainBarNum" style={{ width: "100%", height: 300 }}></div>
                </div>
            </div>
        );
    }
}
// ChartShow.propTypes = {
//     data :PropTypes.array , //首页--机构类型
    
// };
export default ChartShow;