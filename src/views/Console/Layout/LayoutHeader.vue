<template>
  <div class="header"> 
    <div class="header-icon pull-left" @click="toggle()">
      <svg-icon class="menu" iconClass="menu"   />
    </div>

    <div class="pull-right ">
      <div class="exit-icon">
        <svg-icon class="exit" iconClass="exit" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Head",
  data() {
  
    return {};
  },
  methods: {
    toggle() {
      console.log("dsafsfa")
      this.$store.commit("SET_COLLAPSE")
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0px;
  height: 75px;
  background-color: white;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}

.pull-left {
  float: left;
}
.pull-right{
    float:right;
}
.header-icon {
  width: 30px;
  line-height: 75px;
  padding-left: 25px;
  font-size: 30px;
  padding-top: 10px;
  cursor: pointer;

}
.exit-icon {
  width: 30px;
  line-height: 75px;
  font-size: 30px;
  padding-top: 10px;
  padding-right: 30px;
  cursor: pointer;

}
</style>