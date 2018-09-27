<template>
  <div id="myChart" style="width：600px;height:600px"/>
</template>
<script>
export default {
  props: {
    getdata: {
      type: null,
      required: true
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    if (this.getdata !== []) {
      this.drawLine()
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '数据展示'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: this.getdata.legend,
        grid: this.getdata.grid,
        toolbox: this.getdata.toolbox,
        xAxis: this.getdata.xAxis,
        yAxis: this.getdata.yAxis,
        series: this.getdata.series
      })
    }
  }
}
</script>

