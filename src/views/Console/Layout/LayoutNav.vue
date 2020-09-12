<template>
  <div class="nav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
        
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="transparent"
          text-color="white"
          active-text-color="#409EFF"
          :collapse= "iscollapse"
          router
        >
        
        <template v-for="(item , index ) in routes">
           <el-submenu :key="item.id" :index="index + ''"  v-if="!item.hidden">

            <template slot="title">
            <svg-icon :className="item.meta.icon" :iconClass="item.meta.icon" /> 
              <span>{{item.meta.name}}</span>
            </template>
        <!-- 子级菜单  -->
            <template v-for="subItem in item.children">
                <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path" >
                  {{ subItem.meta.name }}
                </el-menu-item>
              </template>
            

           
          </el-submenu>
        </template>
         

         <svg-icon svgClass="true">41651</svg-icon>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
   
    return {
      routes: this.$router.options.routes,
     
    };
  },
  methods: {
       handleOpen(key, keyPath) {
       
      },
      handleClose(key, keyPath) {
        
      }
    
  },
  computed: {
    iscollapse: function () {
      
      return this.$store.state.app.iscollapse
    }
  },
  mounted() {
    
  },
};
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #344a5f;
  box-shadow: 3px 0 16px 0 rgba(0, 0, 0, 0.1);
}
</style>