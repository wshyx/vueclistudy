<template>
    <div  class="matter">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "matter",
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
    .matter {
        position: fixed;
        top: 75px;
        left: 250px;
        height: 100vh;
        width: 100%;
        padding: 30px;
        border: 30px solid #f7f7f7;
        border-bottom: none;
        box-sizing: border-box;
    }
</style>