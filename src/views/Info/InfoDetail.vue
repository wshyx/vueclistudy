<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">

 <el-form-item label="类别">
        <el-select v-model="form.msgClass" >
          <el-option v-for="item in msgClass" :key="item.id" :label="item.label" :value="item.value" ></el-option>
          
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="form.title" width="500px"></el-input>
      </el-form-item>

     

      <el-form-item label="日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      

      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>

        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
export default {
  data() {
    return {
       msgClass: [
        {
          value: "国际信息",
          label: "国际信息"
        },
        {
          value: "选项2",
          label: "国内信息"
        },
        {
          value: "选项3",
          label: "社会信息"
        }
      ],
      form: {
        
        msgClass: "国际信息",
        title: "",
        date: "",
        delivery: false,
        content: ""
      }
    };
  },
  methods: {
    onSubmit(){

    }
  },
};
</script>
<style lang="scss" scoped>
</style>