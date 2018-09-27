<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="this.$router.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#545c64"
      router
      @select="selectindex">
      <template v-for="item in routes" >
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              {{ item.title }}
            </template>
            <el-menu-item v-for="(subItem,index) in item.subs" :key="index" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.title">
            <label>{{ item.title }}</label>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      id: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$store.state.page.menulist
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    selectindex(key, keyPath) {
      this.id = key.split('').pop()
      const pageid = this.id
      this.$store.dispatch('getpagestructure', pageid)
    }
  }
}
</script>

