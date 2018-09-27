<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="navselect">
      <el-select v-model="value" clearable placeholder="选择项目" size="small" @change="changesubject">
        <el-option
          v-for="item in subject"
          :key="item.value"
          :label="item.nameZH"
          :value="item.id"
        />
      </el-select>
      <div class="twoselect">
        <el-select v-model="value1" clearable placeholder="选择环境" size="small" @change="changeScience " >
          <el-option
            v-for="item in ids"
            :key="item.value"
            :label="item.nameZH"
            :value="item.id"/>
        </el-select>
      </div>
      <el-select v-model="value2" clearable placeholder="选择平台" size="small" @change="changeplatform">
        <el-option
          v-for="item in platform"
          :key="item.value"
          :label="item.nameZH"
          :value="item.id"/>
      </el-select>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="../../../../static/timg.jpg" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      objs: ''
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    ...mapState({
      subject: state => state.page.subject,
      ids: state => state.page.ids,
      platform: state => state.page.platform
    }),
    menulist() {
      return this.$store.state.page.menulist
    }
  },
  mounted() {
    this.getSubject()
  },

  methods: {
    ...mapActions([
      'getSubject'
    ]),
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LOGOT').then(() => {
        sessionStorage.removeItem('menu')
        this.$router.push('/dashboard')
      })
    },
    // 切换项目
    changesubject(e) {
      this.$store.dispatch('subproject', this.value)
      if (this.value !== '') {
        this.changeScience()
      }
      this.value1 = ''
    },
    // 切换环境
    changeScience(e) {
      this.value2 = ''
      const obj = {
        subid: this.value,
        envid: this.value1
      }
      localStorage.setItem('twoid', JSON.stringify(obj))
      this.objs = obj
      this.$store.dispatch('getplatform', obj)
      this.$store.dispatch('getpageform', obj)
      this.$store.dispatch('getgrourplist', obj)
    },
    // 切换平台
    changeplatform(e) {
      var threeid = {}
      threeid.platformid = this.value2
      Object.assign(threeid, this.objs)
      sessionStorage.setItem('threeid', JSON.stringify(threeid))
      this.$store.dispatch('getmenulists', threeid).then(res => {
        sessionStorage.setItem('menu', JSON.stringify(res.data))
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .navselect{
    display: inline-block;
   position: absolute;
   top:0px;
   right: 0px;
   margin-right: 150px;
  }
  .twoselect{
    display: inline-block;
    margin-left:25px;
    margin-right:25px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

