<template>
  <div class="app-container">
    <forms :fromdatass="pagestructure"/>
    <tables v-if="pagestructure.structrue==1" :fromdatass="pagestructure" :fromdata="fromdata"/>
    <div v-if="pagestructure.structrue==2" v-show="datanull" id="myChart" style="width：600px;height:600px"/>
    <!-- <echarts v-if="pagestructure.structrue==2" :fromdatass="pagestructure" :getdata="fromdata"/> -->
  </div>
</template>

<script>
import '../../styles/tree.scss'
import echarts from './echart.vue'
import forms from './form.vue'
import tables from './table.vue'
import { mapState } from 'vuex'
export default {
  components: {
    echarts,
    forms,
    tables
  },
  data() {
    return {
      id: '',
      datanull: true,
      pageid: this.$route.path.split('').pop()
    }
  },
  computed: {
    ...mapState({
      pagestructure: state => state.page.pagestructure,
      fromdata: state => state.page.getdatas
    })
  },
  watch: {
    fromdata(val) {
      if (this.pagestructure.structrue === 2) {
        if (val.constructor === Object) {
          this.datanull = true
          // this.$nextTick(() => {
          console.log(val)
          this.drawLine()
          // })
        } else {
          this.datanull = false
          this.$message({
            message: '该菜单没有数据',
            type: 'warning'
          })
        }
      }
    },
    pageid(val, oldval) {
      if (val !== oldval) {
        this.$store.dispatch('getpagestructure', this.pageid)
      }
    }
  },
  created() {
    const pageid = this.$route.params.id
    this.$store.dispatch('getpagestructure', pageid)
    // console.log(this.pagestructure)
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(
        {
          title: {
            text: '数据展示'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: this.fromdata.legend,
          grid: this.fromdata.grid,
          toolbox: this.fromdata.toolbox,
          xAxis: this.fromdata.xAxis,
          yAxis: this.fromdata.yAxis,
          series: this.fromdata.series
        }
        // {
        //   title: {
        //     text: '折线图堆叠'
        //   },
        //   tooltip: {
        //     trigger: 'axis'
        //   },
        //   legend: {
        //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        //   xAxis: {
        //     type: 'category',
        //     boundaryGap: false,
        //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [
        //     {
        //       name: '邮件营销',
        //       type: 'line',
        //       stack: '总量',
        //       data: [120, 132, 101, 134, 90, 230, 210]
        //     },
        //     {
        //       name: '联盟广告',
        //       type: 'line',
        //       stack: '总量',
        //       data: [220, 182, 191, 234, 290, 330, 310]
        //     },
        //     {
        //       name: '视频广告',
        //       type: 'line',
        //       stack: '总量',
        //       data: [150, 232, 201, 154, 190, 330, 410]
        //     },
        //     {
        //       name: '直接访问',
        //       type: 'line',
        //       stack: '总量',
        //       data: [320, 332, 301, 334, 390, 330, 320]
        //     },
        //     {
        //       name: '搜索引擎',
        //       type: 'line',
        //       stack: '总量',
        //       data: [820, 932, 901, 934, 1290, 1330, 1320]
        //     }
        //   ]
        // }
      )
    }
  }

}
</script>
