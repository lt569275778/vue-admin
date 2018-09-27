<template>
  <div>
    <div class="pingtai">
      <el-select v-model="value4" clearable placeholder="选择渠道">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div v-if="fromdatass.dateEnable==false" class="block">
      <el-date-picker v-model="value1" type="date" value-format="yyyyMMdd" placeholder="选择日期" @change="getdate"/>
    </div>
    <div v-else class="block">
      <el-date-picker
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getdate"
      />
    </div>
    <el-button type="success" class="btngreen" @click="submitform">提交</el-button>
    <div class="comment">
      <span>{{ fromdatass.comment }}</span>
    </div>
    <el-button v-if="fromdatass.structrue==1" type="success" class="btngreen" @click="exportExcel">下载excle</el-button>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getdata, getselete } from '../../api/api.js'
export default {
  props: {
    fromdatass: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      value6: '',
      value1: '',
      value2: [],
      options: '',
      value4: ''
    }
  },
  created() {
    this.selectjudao()
  },
  methods: {
    exportExcel() {
      this.pagesize = '30' // 表格长度变长
      this.currentPage = '1'
      this.$nextTick(function() {
        const wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
        /* get binary string as output */
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
          }), '数据.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        this.pagesize = '10' // 表格还原
        return wbout
      })
    },
    submitform() {
      this.$nextTick(() => {
        this.getItem()
      })
    },
    getItem() {
      const ids = {
        projectID: JSON.parse(sessionStorage.getItem('threeid')).subid,
        envID: JSON.parse(sessionStorage.getItem('threeid')).envid,
        platformID: JSON.parse(sessionStorage.getItem('threeid')).platformid,
        pageID: this.$route.params.id
      }
      const bodydata = {
        filter: {
          'channel': 'All'
        },
        'fdate': this.value2
      }
      getdata(ids.projectID, ids.envID, ids.platformID, ids.pageID, bodydata).then(res => {
        sessionStorage.setItem('form', JSON.stringify(res.data.data))
        this.$store.dispatch('getdatalist', res.data.data)
      })
    },
    selectjudao() {
      const data = {
        projectID: JSON.parse(sessionStorage.getItem('threeid')).subid,
        envID: JSON.parse(sessionStorage.getItem('threeid')).envid,
        platformID: JSON.parse(sessionStorage.getItem('threeid')).platformid
      }
      const list = this.fromdatass.columns
      console.log(list)
      // for (let i = 0; i < list.length; i++) {
      //   if (list[i].webFilter === true) {
      //     var nameen = list[i].nameEN
      //   }
      // }
      // console.log(nameen)
      const data1 = {
        tableName: this.fromdatass.table
        // column: nameen
      }
      getselete(data.projectID, data.envID, data.platformID, data1).then(res => {
        this.options = res.data.data
      })
    },
    getdate(e) {
      if (e.length === 8) {
        this.value2[0] = e
      } else {
        this.value1 = e
        this.value2 = this.value1
      }

      console.log(this.value2)
    }

  }
}
</script>

