<template>
  <div style="overflow-y:auto;    height: 100%;">
    <div>
      <!-- <svg class="pack-circle"
           style="width:800;height:400"></svg> -->
    </div>
    <el-button size="mini"
               type="primary"
               @click="mouse('d3245456467','over')">高亮d3245456467</el-button>
    <el-button size="mini"
               type="primary"
               @click="mouse('d3245456467','out')">取消高亮d3245456467</el-button>
    <el-button size="mini"
               type="primary"
               @click="mouse('d32','over')">高亮d32</el-button>
    <el-button size="mini"
               type="primary"
               @click="mouse('d32','out')">取消高亮d32</el-button>

    <br />
    <br />
    <el-button size="mini"
               type="primary"
               @click="selectL('d3245456467',true)">显示d3245456467</el-button>
    <el-button size="mini"
               type="primary"
               @click="selectL('d3245456467',false)">隐藏d3245456467</el-button>
    <el-button size="mini"
               type="primary"
               @click="selectL('d3245456467','',true)">反选d3245456467</el-button>
    <el-button size="mini"
               type="primary"
               @click="selectL('d32',true)">显示d32</el-button>
    <el-button size="mini"
               type="primary"
               @click="selectL('d32',false)">隐藏d32</el-button>
    <el-button size="mini"
               type="primary"
               @click="selectL('d32','',true)">反选d32</el-button>
    <br />
    <div style="width:800px">
      <div id="chart"
           ref="chart"
           style="height:400px"></div>
    </div>
    <div :style="{width:width+'px'}">
      <div id="chart1"
           ref="chart1"
           :style="{height:height+'px'}"></div>
      <!-- style="height:400px" -->
    </div>
    <div style="width:800px;height:800px;"
         id="viewBox">
      <svg class="svg"
           width="100%"
           height="100%">
      </svg>
    </div>
  </div>
</template>

<script>
// import protobuf from 'google-protobuf';
import { helloRequest } from '../../proto/generated/hello_pb';
import Line from './line'
// import { HelloServiceClient } from '../../proto/generated/hello_grpc_web_pb'

export default {
  data () {
    return {
      value: [],
      options: [],
      client: null,
      dataList: [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
      ],
      width: 800,
      height: 400
    }
  },
  methods: {
    sayHello () {
      let request = new helloRequest();
      // request.setMessage("333")
      // request.setCode('222')
      this.client.sayHello(request, {}, (err, response) => {
        console.log(err, response);
      });
      //   {
      //   code: '0',
      //   message: '来自Node客户端的OK1'
      // }

    },
    getColor (idx) {
      var palette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
      ]
      return palette[idx % palette.length];
    },
    async initD3 () {
      // let svg = d3.select('svg');
      // svg.selectAll('circle').data(this.dataList).enter().append('circle').attr('cx', d => d[0]).attr('cy', d => d[1]).attr('r', d => Math.sqrt(100 - d[1])).attr('fill', 'blue');
      // svg.selectAll('text').data(this.dataList).enter().append('text').text(d => d[0] + ',' + d[1]).attr('x', d => d[0]).attr('y', d => d[1]).attr('fill', 'red').attr('font-size', '12px')
      // var dataset = [
      //   [0, 0], [65.66, 420], [540, 260], [360, 320], [200, 200],
      //   [130, 623], [652, 52], [333, 666], [729, 656], [134, 352],
      //   [120, 56], [905, 177], [777, 888], [550, 680]
      // ];
      // d3.interval(function () {
      //   d3.select("svg").transition()
      //     .duration(1000)
      //     .attrTween("width", function () {
      //       var i = d3.interpolate(20, 400);
      //       var ci = d3.interpolate('#2394F5', '#BDF436');
      //       var that = this;
      //       return function (t) {
      //         that.style.width = i(t) * 2 + 'px';
      //         that.style.background = ci(t);
      //       };
      //     });
      // }, 1500)

      // return false;
      var dataset = [];
      for (var i = 0; i < 1; i += 0.1) {
        for (var j = 0; j < 1; j += 0.1) {
          dataset.push([i, j]);
        }
      }
      let width = 800
      let height = 800
      let padding = 60

      //创建画布
      let svg = d3.select("svg")

      //添加标题
      svg.append("text")
        .attr("x", width / 2 - 120)
        .attr("y", 30)
        .attr("class", "title")
        .text("d3散点图")

      //x轴标尺
      let xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[0])])
        .range([padding, width - padding * 2])

      //y轴标尺
      let yScale = d3.scaleLinear()
        .domain([0, 1, 2, 3, 4, 5])
        .range([height - padding, 60])

      //原点的标尺
      var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
          return d[1];
        })]).range([2, 4]);
      console.log(d3)
      let compute = d3.interpolate(d3.rgb('255,0,0'), d3.rgb('0,255,0'));

      var linear = d3.scaleLinear().domain([0, 150])

      //画出各个点点并添加到画布中
      svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => {
          return xScale(d[0])
        })
        .attr("cy", (d) => {
          return yScale(d[1])
        })
        .attr("r", (d) => {
          return rScale(d[1])
        })
        .attr("fill", d => d[1] > 5 ? 'red' : 'blue').on("mouseenter", function () {
          d3.select(this).style("fill", d => compute(linear(d)));
        }).on("mouseout", function () {
          d3.select(this).transition().duration(500).style("fill", d => d[1] > 5 ? 'red' : 'blue');
          // d3.select(this).style("stroke-width", "0");
        })


      // // x坐标轴
      // let xAxis = d3.axisBottom()
      //   .scale(xScale)
      //   .ticks(7)

      //y坐标轴
      let yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(7)

      //把坐标轴添加到画布中
      // svg.append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(0," + (height - padding) + ")")
      //   .call(xAxis)
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)
      console.log(d3)

      // var svg = d3.select('svg')
      // svg.selectAll('circle').data(this.dataList).enter().append('circle');
      // svg.attr("cx", function (d) {
      //   return d[0];
      // })
      //   .attr("cy", function (d) {
      //     return d[1];
      //   })
      //   .attr("r", 5);
      // var width = 600, height = 300;
      // // 创建一个分组用来组合要画的图表元素
      // var main = d3.select('svg').append('g')
      //   .classed('main', true)
      //   .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ')');
      // // 模拟数据
      // var dataset = [
      //   { name: '购物', value: 983 },
      //   { name: '日常饮食', value: 300 },
      //   { name: '医药', value: 1400 },
      //   { name: '交通', value: 402 },
      //   { name: '杂费', value: 134 }
      // ];

      // // 转换原始数据为能用于绘图的数据
      // var pie = d3.pie().value(d => d.value);
      // // 创建计算弧形路径的函数
      // var arc = d3.arc()
      //   .innerRadius(0)
      //   .outerRadius(100);

      // console.log(dataset);
      // // pie是一个函数
      // var pieData = pie(dataset);
      // console.log(pieData);
      // 创建计算弧形路径的函数

      // var slices = main.append('g').attr('class', 'slices');
      // 添加弧形元素（g中的path）
      // var arcs = slices.selectAll('g')
      //   .data(pieData)
      //   .enter()
      //   .append('path')
      //   .attr('fill', (d, i) => {
      //     return this.getColor(i);
      //   })
      //   .attr('d', function (d) {
      //     return arc(d);
      //   });
    },
    initD3Line () {
      // var width = 500;
      // var height = 500;

      // var dataset = [
      //   {
      //     country: "china",
      //     gdp: [[2000, 11920], [2001, 13170], [2002, 14550],
      //     [2003, 16500], [2004, 19440], [2005, 22870],
      //     [2006, 27930], [2007, 35040], [2008, 45470],
      //     [2009, 51050], [2010, 59490], [2011, 73140],
      //     [2012, 83860], [2013, 103550],]
      //   },
      //   {
      //     country: "japan",
      //     gdp: [[2000, 47310], [2001, 41590], [2002, 39800],
      //     [2003, 43020], [2004, 46550], [2005, 45710],
      //     [2006, 43560], [2007, 43560], [2008, 48490],
      //     [2009, 50350], [2010, 54950], [2011, 59050],
      //     [2012, 59370], [2013, 48980],]
      //   }
      // ];

      // var padding = { top: 70, right: 70, bottom: 70, left: 70 };
      // var gdpmax = 0;
      // for (var i = 0; i < dataset.length; i++) {
      //   var currGdp = d3.max(dataset[i].gdp, function (d) {
      //     return d[1];
      //   });
      //   if (currGdp > gdpmax)
      //     gdpmax = currGdp;
      // }
      // console.log(gdpmax);

      // var xScale = d3.scale.linear()
      //   .domain([2000, 2013])
      //   .range([0, width - padding.left - padding.right]);

      // var yScale = d3.scale.linear()
      //   .domain([0, gdpmax * 1.1])
      //   .range([height - padding.bottom - padding.top, 0]);

      // var linePath = d3.svg.line()//创建一个直线生成器
      //   .x(function (d) {
      //     return xScale(d[0]);
      //   })
      //   .y(function (d) {
      //     return yScale(d[1]);
      //   })
      //   .interpolate("basis")//插值模式
      //   ;

      // //定义两个颜色
      // var colors = [d3.rgb(0, 0, 255), d3.rgb(0, 255, 0)];

      // var svg = d3.select("svg")
      //   .attr("width", width)
      //   .attr("height", height);

      // svg.selectAll("path")
      //   .data(dataset)
      //   .enter()
      //   .append("path")
      //   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      //   .attr("d", function (d) {
      //     return linePath(d.gdp);
      //     //返回线段生成器得到的路径
      //   })
      //   .attr("fill", "none")
      //   .attr("stroke-width", 3)
      //   .attr("stroke", function (d, i) {
      //     return colors[i];
      //   });

      // var xAxis = d3.svg.axis()
      //   .scale(xScale)
      //   .ticks(5)
      //   .tickFormat(d3.format("d"))
      //   .orient("bottom");

      // var yAxis = d3.svg.axis()
      //   .scale(yScale)
      //   .orient("left");

      // //添加一个g用于放x轴
      // svg.append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(" + padding.left + "," + (height - padding.top) + ")")
      //   .call(xAxis);

      // svg.append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    },
    async initD3Circle () {
      let data = await d3.csv("https://gist.githubusercontent.com/mbostock/3007180/raw/2f604adf60cc5d1c82426c52471df35bbc2d47a2/exoplanets.csv", ({ name, radius, distance }) =>
        ({ name, radius: +radius, distance: distance ? +distance : NaN })
      )
      data = data.filter(item => !isNaN(item.distance))
      let color = d3.scaleQuantize().domain(data.map(item => item.radius)).range(["#156b87", "#876315", "#543510", "#872815"]);
      var packFun = () => {
        const pack = d3.pack().size([300, 300]).padding(5);
        const planets = [{ children: data.filter(d => d.distance === 0) }];
        const exoplanets = data.filter(d => d.distance !== 0);
        const root = { children: planets.concat(exoplanets) };
        return pack(d3.hierarchy(root)
          .sum(d => d.radius * d.radius));
      }
      var svg = d3.select('.pack-circle');
      const circle = svg.selectAll("circle")
        .data(packFun(data).descendants().slice(1))
        .enter().append("circle")
        .attr("fill", d => color(d.data.radius))
      circle.attr("cx", function (d) { return d.data.distance ? Math.cos(d.data.distance) * (800 / Math.SQRT2 + 30) : 0; })
        .attr("cy", function (d) { return d.data.distance ? Math.sin(d.data.distance) * (800 / Math.SQRT2 + 30) : 0; })
        .attr("r", function (d) { return d.r || 0; })
        // .transition()
        // .ease(d3.easeCubicOut)
        // .delay(1000)
        // .duration(1000)
        .attr("r", d => d.r)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      circle.filter(d => d.data.distance).on("mouseenter", function () {
        d3.select(this).transition().delay(100).style("fill-opacity", 0.5).attr("r", d => d.r * 3);
      }).on("mouseout", function () {
        d3.select(this).transition().delay(100).style("fill-opacity", 1).attr("r", d => d.r * 1);
      })
        .append("title")
        .text(d => `${d.data.name}
Planet radius: ${d.data.radius} EU
Star distance: ${isNaN(d.data.distance) ? "N/A" : `${d.data.distance} pc`}`)
        ;

      circle.filter(d => d.children)
        .attr("fill", "red")
        .attr("stroke", "#000")
        .attr("stroke-width", 0);
    },

    async initLine () {
      var svg = d3.select('svg');
      // First dataset
      var datasetBottom = [
        { date: new Date(2013, 17, 2), value: 2 },
        { date: new Date(2013, 17, 3), value: 3 },
        { date: new Date(2013, 17, 4), value: 4 },
        { date: new Date(2013, 17, 5), value: 6 },
        { date: new Date(2013, 17, 6), value: 7 },
        { date: new Date(2013, 17, 7), value: 5 }
      ];

      // Second dataset
      var datasetTop = [
        { date: new Date(2013, 17, 2), value: 3 },
        { date: new Date(2013, 17, 3), value: 5 },
        { date: new Date(2013, 17, 4), value: 1 },
        { date: new Date(2013, 17, 5), value: 3 },
        { date: new Date(2013, 17, 6), value: 9 },
        { date: new Date(2013, 17, 7), value: 5 }
      ];

      // Define the padding around the graph
      var padding = 30;
      var width = 800;
      var height = 800;
      // Set the scales
      var xScale = d3.scaleTime()
        .domain([d3.min(datasetTop, function (d) { return d.date; }), d3.max(datasetTop, function (d) { return d.date; })])
        .range([padding, width - padding]);
      // Bottom y scale
      var yScaleBottom = d3.scaleLinear()
        .domain([0, d3.max(datasetBottom, function (d) { return d.value; })])
        .range([height / 2 - padding, padding]);

      // Top y-scale
      var yScaleTop = d3.scaleLinear()
        .domain([0, d3.max(datasetTop, function (d) { return d.value; })])
        .range([height / 2 - padding, padding]);

      // x-axis
      var format = d3.timeFormat("%Y-%m-%d");

      var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(format)
        .ticks(d3.timeDay.every(1));

      var topchart = svg.append("g").attr("class", "topchart")
      var bottomchart = svg.append("g").attr("class", "bottomchart").attr("transform", "translate(0," + height / 2 + ")");

      bottomchart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (height / 2 - padding) + ")")
        .call(xAxis);

      // y-axis for bottom chart
      var yAxisBottom = d3.axisLeft()
        .scale(yScaleBottom)
        .tickFormat(function (d) { return d; })
        .tickSize(5, 5, 0);

      // y-axis for top chart
      var yAxisTop = d3.axisLeft()
        .scale(yScaleTop)
        .tickFormat(function (d) { return d; })
        .tickSize(5, 5, 0);

      bottomchart.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxisBottom);

      topchart.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxisTop);
      let offectX = [];
      // draw line graph
      var lineTop = d3
        .area()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
          offectX.push(xScale(d.date))
          // console.log(offectX)
          return xScale(d.date);
        })
        .y0(yScaleTop(0))
        .y1(function (d) {
          return yScaleTop(d.value);
        });
      var lineTop1 = d3.line()
        .x(function (d) {
          return xScale(d.date);
        })
        .y(function (d) {
          return yScaleTop(d.value);
        }).curve(d3.curveMonotoneX);
      var lineBottom = d3.line()
        .x(function (d) {
          return xScale(d.date);
        })
        .y(function (d) {
          return yScaleBottom(d.value);
        }).curve(d3.curveMonotoneX);
      var tip = d3.select('#viewBox').append('div')   	//添加tip提示框
        .attr('class', 'tooltip')
        .style('display', 'none');
      var hoverLineGroup = svg.append("g")
        .attr("class", "hover-line");
      var hoverLine = hoverLineGroup
        .append("line")
        .attr("x1", 10).attr("x2", 10)
        .attr("y1", 0 + padding).attr("y2", height - padding);
      hoverLine.style("opacity", 1e-6);

      topchart
        .append('defs')
        .append('clipPath')
        .attr('id', 'clip-main')
        .append('rect')
        .attr('height', 760)
        .attr('y', '-10')
        // .attr('x', '-10')
        .attr("transform", "translate(30,30)")
        .attr('width', 0)
        .transition()
        .duration(1500)
        .ease(d3.easeExpInOut)
        .attr('width', 740)
      var defs = svg.append("defs");
      //线性渐变
      var linearGradient = defs.append("linearGradient")
        .attr("id", "linearColor")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      linearGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", '#CC56CB');

      linearGradient.append("stop")
        .attr("offset", "100%")
        .style("stop-color", '#CB8993');
      topchart.append('g')
        // .attr("transform", "translate(" + padding + ",0)")
        .append('path')
        .attr('class', 'area')
        .datum(datasetTop)
        .attr('d', lineTop)
        .attr('stroke', 'none')
        // .attr('stroke-widh', '2px')
        .attr('fill', 'rgba(5,140,255, 0.2)' || 'steelblue')
        .attr('clip-path', 'url(#clip-main)')
        .style('fill', "url(#" + linearGradient.attr("id") + ")")


      let Differ = (offectX[1] - offectX[0]) / 2;
      let _offectX = offectX.map((item) => !item ? item : item - Differ);
      var mousemove = (_this, x) => {
        let index = this.getCurrentIndex(_offectX, x, Differ)
        hoverLine.transition().duration(60).attr("x1", offectX[index]).attr("x2", offectX[index]).style("opacity", 1);
      }
      var mousemoveTip = (x, y) => {
        let index = this.getCurrentIndex(_offectX, x, Differ)
        tip.html("<span id='tip' style='color: #fff'>Value:" + (datasetTop[index].value) + "</span>")
          .transition().duration(200)				//提示框的内容
          .style('left', x + 20 + 'px')  //提示框的位置
          .style('top', y + 20 + 'px')
      }
      let throFun = util.throttle(mousemove, 500);
      let tipFun = util.debounce(mousemoveTip, 50);
      var _this = this;
      let isFirst = true;
      svg.on('mousemove', function () {
        tip.style('display', 'block')
        throFun(this, d3.event.offsetX);
        if (isFirst) {
          let index = _this.getCurrentIndex(_offectX, d3.event.offsetX, Differ)
          tip.html("<span id='tip' style='color: #fff'>Value:" + (datasetTop[index].value) + "</span>")
            .style('left', d3.event.offsetX + 20 + 'px')  //提示框的位置
            .style('top', d3.event.offsetY + 20 + 'px')
          isFirst = false;
        }

        tipFun(d3.event.offsetX, d3.event.offsetY)
      })
      svg.on('mouseout', function () {
        if (d3.event.offsetX < offectX[0] || d3.event.offsetX > offectX[offectX.length - 1]) {
          hoverLine.attr("x1", 10).attr("x2", 10).style('opacity', 0);
          // tip.style('display', 'none')
          isFirst = true;
        }
      })

      bottomchart.append("path").datum(datasetBottom).attr("d", lineBottom).attr('stroke-width', 3).attr("stroke", '#058cff').attr('class', 'bottomLine').attr('clip-path', 'url(#clip-main)')
      let line = topchart.append("g").datum(datasetTop).append("path").attr("d", lineTop1).attr('class', 'lineTop1').attr("stroke-width", 3).attr("stroke", 'rgb(255, 70, 131)').attr('clip-path', 'url(#clip-main)')
        // .attr("stroke", 'rgb(255, 70, 131)')
        // .style('stroke', "url(#" + linearGradient.attr("id") + ")")
        // .transition()
        // .duration(2500)
        .attr("stroke-dashoffset", 0);
      var totalLength = line.node().getTotalLength();
      line
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        // .attr("stroke-width", 3)
        // .attr('clip-path', 'url(#clip-main)')
        // .attr("stroke", 'rgb(255, 70, 131)')
        .transition()
        .duration(2500)
        .attr("stroke-dashoffset", 0);
      let circleView = topchart
        .append('g')
        .selectAll('g')
        .data(datasetTop)
        .enter()
        .append('g')
        .attr('clip-path', 'url(#clip-main)')
      let circle = circleView
        .append('circle')
        .attr('class', 'circle')
      circle
        .attr('cx', () => 0)
        .attr('cy', d => yScaleTop(d.value))
        .transition()
        .duration((d, i) => i * 600)
        .ease(d3.easeElasticIn.amplitude(3).period(2))
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScaleTop(d.value))
        .attr('r', '2')
        .attr('fill', '#fff')
        .attr('stroke-width', 1).attr("stroke", '#058cff')
        .style('z-index', 999)
        .transition()
        .duration((d, i) => i * 1000)
        .attr('r', '5')


      let x2Scale = d3
        .scaleTime()
        .domain([d3.min(datasetTop, function (d) { return d.date; }), d3.max(datasetTop, function (d) { return d.date; })])
        .range([padding, width - padding]);
      //定义画刷
      let brush = d3
        .brushX()
        .extent([[30, 0], [770, 20]])
        .on('brush end', brushed)


      bottomchart.append("g")
        // .attr("width", 400)
        // .attr("height", 20)
        .attr("transform", "translate(0," + (height / 2 - padding - 10) + ")")
        .attr("class", "brush")
        .call(brush)
        // .call(brush.move, xScale.range())
        .selectAll("rect")
        .attr("width", 400)
        .attr("height", 20)

      let zoom = d3.zoom()              //设置zoom参数       
        .scaleExtent([1, 8])          //放大倍数
        .translateExtent([[0, 0], [800, 770]])//移动的范围
        .extent([[0, 0], [width, height]])
        //视窗 （左上方，右下方）,默认最近父级元素的[0,0],[width,height]
        .on("zoom", zoomed);          //zoom事件，调用zoomed函数


      svg.append('g').append("rect") //设置缩放的区域，一般覆盖整个绘图区
        .attr("width", 740)
        .attr("height", 730)
        .attr("transform", "translate(30,30)")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .call(zoom);

      function zoomed () {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return
        let t = d3.event.transform.rescaleX(x2Scale)
        bottomchart.select(".brush").call(brush.move, xScale.range().map(d3.event.transform.invertX, d3.event.transform))

        //重新绘制面积图与坐标轴
        xScale.domain(t.domain())
        svg.select('.x-axis').call(xAxis)
        topchart.select('.area').attr('d', lineTop)
        svg.select('.lineTop1').attr('d', lineTop1)
        var totalLength = line.node().getTotalLength();
        line
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .attr("stroke-dashoffset", 0);
        svg.select('.bottomLine').attr('d', lineBottom)
        circleView
          .select('circle')
          .attr('cx', function (d) {
            return xScale(d.date)
          })
        offectX = [];

      }
      function brushed () {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return
        //通过事件对象获取画刷目前的长度以及位置，类似brush.move(selection, [50, 100])
        let s = d3.event.selection || xScale.range()
        // //通过x2Scale.invert转化为新的xScale的domain
        xScale.domain(s.map(x2Scale.invert, x2Scale))
        //设置完新的xScale 重绘面积图以及x坐标轴
        svg.select('.area').attr('d', lineTop)
        svg.select('.lineTop1').attr('d', lineTop1)
        svg.select('.bottomLine').attr('d', lineBottom)
        circleView
          .select('circle')
          .attr('cx', function (d) {
            return xScale(d.date)
          })
        offectX = [];
      }

    },
    getCurrentIndex (offectX, x, diff) {
      let curIndex = 0;
      offectX.some((item, index) => {
        if ((x >= item && x <= offectX[index + 1]) || (x - diff) <= item) {
          curIndex = index
          return true
        }
      })
      return curIndex;
    },

    mouse (name, status = 'over') {
      this.chart.dispatchAction({
        type: 'MouseLegend',
        name,
        status
      })
      this.chart1.dispatchAction({
        type: 'MouseLegend',
        name,
        status
      })
    },

    selectL (name, show, resover) {
      this.chart.dispatchAction({
        type: 'selectLegend',
        name,
        resover,
        show
      })
      this.chart1.dispatchAction({
        type: 'selectLegend',
        name,
        resover,
        show
      })
    }
  },
  async created () {
    // await this.$ajaxPost('grpc', { a: 1 })
    // this.client = new HelloServiceClient("http://154.8.237.169:8081");
    // // console.log(this.client)
    // this.sayHello();

  },
  async mounted () {

    await util.str.createScript('https://d3js.org/d3.v5.min.js');
    // console.log(d3.schemeSet2)
    // var myColor = d3.scaleOrdinal()
    //   .domain(["valueA", "valueB", "valueC"])
    //   .range(d3.schemeSet2);
    // console.log(myColor('valueA'), myColor('valueB'), myColor('valueC15'), myColor('valueC14'))
    // this.initD3();
    // this.initD3Line();
    // this.initD3Circle();
    // this.initLine();
    this.chart = new Line(this.$refs.chart)
    this.chart.setOption({
      title: {
        text: "多个grid多个series",
        textStyle: {
          color: "#5793f3",
          fontSize: "12px"
        }
      },
      legend: {
        show: true,
        data: ['d3245456467', 'd32'],
        fontSize: 14
      },
      tooltip: {
        // formatter: (d) => {
        //   return 'Value:' + d.yData + '111'
        // }
      },
      grid: [{
        left: 50,
        right: 50,
        top: 60,
        bottom: 50,
        height: 120
      }
        , {
        left: 50,
        right: 50,
        top: 220,
        bottom: 50,
        height: 120
      }
      ],
      xAxis: [{
        name: 'xtest',
        align: 'bottom',
        show: true,
        type: 'time',
        data: ['2016/12/13', '2016/12/14', '2016/12/15', '2016/12/16', '2016/12/17', '2016/12/18', '2016/12/19', '2016/12/20'],
        // axisLabel: {
        //   y: 10,
        //   x: 2,
        //   transform: 'rotate(30)',
        //   'text-anchor': 'start'
        // },
        format: (svg) => {
          svg.ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%Y-%m-%d"))
          return svg;
        }
      }
        , {
        name: 'xtest',
        align: 'bottom',
        show: true,
        type: 'time',
        data: ['2016/12/13', '2016/12/14', '2016/12/15', '2016/12/16', '2016/12/17', '2016/12/18', '2016/12/19', '2016/12/20'],
        // axisLabel: {
        //   y: 10,
        //   x: 2,
        //   transform: 'rotate(30)',
        //   'text-anchor': 'start'
        // },
        format: (svg) => {
          svg.ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%Y-%m-%d"))
          return svg;
        }
      }
      ],
      dataZoom: [{
        inside: true,  //控制数据滑动变化区间的zoom功能
        brush: true,
        zoomIndex: [0, 1],  //指定grid使用zoom
        realtime: true,
        xAxisIndex: [0, 1]  //使用brush控制设置指定的grid
      }],
      yAxis: [{
        align: 'left',
        type: 'line',
        name: 'test'
      }
        , {
        align: 'left',
        type: 'line',
        name: 'test1'
      }
      ],
      series: [{
        name: "d3245456467",
        type: 'line',
        symbolSize: 3,
        // transition: (cir) => {
        //   return cir.transition()
        //     .duration((d, i) => i * 600)
        //     .ease(d3.easeElasticIn.amplitude(3).period(2))
        // },
        lineStyle: {
          'stroke-width': 2,
          // 'stroke': 'blue',
          transition: {
            duration: 1000
          }
        },
        areaStyle: {
          // fill: "rgb(255, 158, 68)"
        },
        data: [100, 932, 400, 200, 600, 800, 700, 600]
      }
        , {
        name: "d32",
        type: 'line',
        symbolSize: 3,
        // transition: (cir) => {
        //   return cir.transition()
        //     .duration((d, i) => i * 600)
        //     .ease(d3.easeElasticIn.amplitude(3).period(2))
        // },
        lineStyle: {
          'stroke-width': 2,
          'stroke': 'red',
          transition: {
            duration: 1500
          }
        },
        areaStyle: {
          fill: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offect: 0, color: "rgb(255, 158, 68)" },
              { offect: 0.5, color: "rgb(255, 70, 131)" },
              { offect: 1, color: "rgb(204, 86, 203)" }
            ]
          },
        },
        data: [20, 180, 600, 150, 1000, 770, 300, 700]
      }
      ]
    })

    this.chart1 = new Line(this.$refs.chart1)
    this.chart1.setOption({
      title: {
        text: "单个grid多个series",
        textStyle: {
          color: "#5793f3",
          fontSize: "12px"
        }
      },
      legend: {
        show: true,
        data: ['d3245456467', 'd445788', 'd32'],
        fontSize: 14
      },
      tooltip: {
        // formatter: (d) => {
        //   return 'Value:' + d.yData + '111'
        // }
      },
      grid: [{
        left: 50,
        right: 50,
        top: 60,
        bottom: 60
      }],
      xAxis: [{
        name: 'xtest',
        align: 'bottom',
        show: true,
        type: 'line',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] || ['2016/12/13', '2016/12/14', '2016/12/15', '2016/12/16', '2016/12/17', '2016/12/18', '2016/12/19', '2016/12/20', '2016/12/21', '2016/12/22', '2016/12/23', '2016/12/24', '2016/12/25'],
        // axisLabel: {
        //   y: 10,
        //   x: 2,
        //   transform: 'rotate(30)',
        //   'text-anchor': 'start'
        // },
        format: (svg) => {
          // svg.ticks(d3.timeDay.every(3))
          //   .tickFormat(d3.timeFormat("%Y-%m-%d"))  //
          return svg;
        }
      }],
      dataZoom: [{
        inside: true,  //控制数据滑动变化区间的zoom功能
        brush: true,
        zoomIndex: [0, 1],  //指定grid使用zoom
        realtime: true,
        xAxisIndex: [0, 1]  //使用brush控制设置指定的grid
      }],
      yAxis: [{
        align: 'left',
        type: 'line',
        name: 'test'
      }],
      series: [{
        name: "d3245456467",
        type: 'line',
        symbolSize: 3,
        // transition: (cir) => {
        //   return cir.transition()
        //     .duration((d, i) => i * 600)
        //     .ease(d3.easeElasticIn.amplitude(3).period(2))
        // },
        lineStyle: {
          'stroke-width': 2,
          // 'stroke': 'blue',
          // transition: {
          //   duration: 2500
          // }
        },
        areaStyle: {
          // fill: "rgb(255, 158, 68)"
        },
        data: [100, 932, 400, 200, 600, 800, 700, 600, 1660, 360, 460, 560, 840]
      },

      {
        name: "d445788",
        type: 'scatter',
        symbolSize: 3,
        duration: 1000,
        // transition: (cir) => {
        //   return cir.transition()
        //     .duration((d, i) => i * 600)
        //     .ease(d3.easeElasticIn.amplitude(3).period(2))
        // },
        data: [100, 667, 785, 246, 168, 348, 661, 128, 697, 124, 358, 666, 123]
      }, {
        name: "d32",
        type: 'line',
        symbolSize: 3,
        // transition: (cir) => {
        //   return cir.transition()
        //     .duration((d, i) => i * 600)
        //     .ease(d3.easeElasticIn.amplitude(3).period(2))
        // },
        lineStyle: {
          'stroke-width': 2,
          'stroke': 'red',
          // transition: {
          //   duration: 1501
          // }
        },
        areaStyle: {
          fill: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offect: 0, color: "rgb(255, 158, 68)" },
              { offect: 0.5, color: "rgb(255, 70, 131)" },
              { offect: 1, color: "rgb(204, 86, 203)" }
            ]
          },
        },
        data: [40, 180, 600, 150, 1000, 770, 300, 700, 660, 380, 660, 430, 580]
      },
      ]
    })


    let xAxisData = [14, 15, 16, 17, 18, 19] || ['2016/12/26', '2016/12/27', '2016/12/28', '2016/12/29', '2016/12/30'];
    let seriesData = [[670, 540, 129, 357, 666, 777], [666, 320, 169, 479, 2000, 776], [127, 475, 663, 441, 258, 487]]
    let index = 0;
    let timer = setInterval(() => {
      this.chart1.updateChart({
        xAxis: [xAxisData[index]],
        series: seriesData.map(item => [item[index]])
      })
      index += 1;
      if (index === 5) {
        clearInterval(timer);
      }
    }, 2000)
    var _this = this;
    window.addEventListener(
      'resize',
      () => {
        if (_this.width >= 698) {
          _this.width -= 10;
          _this.height -= 1;
          _this.chart1.resize();
        }
      }
    );


    // const { result } = await this.$ajaxGet('getCategoryTree', { level: 0 });
    // console.log(result);
    // this.options = result;
    // await this.$ajaxGet('grpc');
    // const GetBookRequest = (data) => {
    //   protobuf.Message.initialize(this, data, 0, -1, null, null);
    // }
    // const getBookRequest = new GetBookRequest();
    // console.log(GetBookRequest)
    // getBookRequest.setIsbn(60929871);
    // var BookService = (function () {
    //   function BookService () { }
    //   BookService.serviceName = "examplecom.library.BookService";
    //   return BookService;
    // }());
    // grpc.unary({
    //   methodName: "GetBook",
    //   service: BookService,
    //   requestStream: false,
    //   responseStream: false,
    // }, {
    //   request: getBookRequest,
    //   host: 'http://localhost:50051',
    //   onEnd: res => {
    //     const { status, statusMessage, headers, message, trailers } = res;
    //     console.log("getBook.onEnd.status", status, statusMessage);
    //     console.log("getBook.onEnd.headers", headers);
    //     if (status === grpc.Code.OK && message) {
    //       console.log("getBook.onEnd.message", message.toObject());
    //     }
    //     console.log("getBook.onEnd.trailers", trailers);
    //   }
    // });

  }
}
</script>

<style>
#viewBox {
  position: relative;
  /* background: red; */
}
.svg {
  fill: none;
}
.circle {
  cursor: pointer;
}
.tooltip {
  font-size: 15px;
  width: auto;
  padding: 10px;
  height: auto;
  position: absolute;
  text-align: center;
  background-color: #000000;
  opacity: 0.6;
  border-radius: 5px;
  color: #ffffff;
}
.hover-line {
  /* stroke: #c6c3c3; */
  stroke: #c6c3c3;
  fill: none;
  stroke-width: 1px;
}
.tick text {
  font-size: 10px;
  font-weight: bold;
}
</style>
