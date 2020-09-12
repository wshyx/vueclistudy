<template>
  <el-dialog title="新增" :visible.sync="dialog_visible" width="30%" @close="close">
    <el-form ref="form" :model="form" label-width="80px">
    
      <el-form-item label="类型">
        <el-select  placeholder="请选择活动区域" v-model="form.selClass">
          <el-option :label="item.label" :value="item.value"  v-for = "item in options" :key="item.id"></el-option>
        
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="概况">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import {addMsg , getList} from "../../../api/news.js";

export default {
  name: "dialogAdd",
  data() {
    return {
      dialog_visible: false,
      //表单数据
      form: {
        selClass: 1,
        title: "",
        content: ""
      },
      
       options: [
        {
          value: 1,
          label: "国际信息"
        },
        {
          value: 2,
          label: "国内信息"
        },
        {
          value: 3,
          label: "社会信息"
        }
      ],
    };
  },
  methods: {
    //提交表单数据
    onSubmit() {
      let data = {
        categoryId: this.form.selClass,
        title: this.form.title,
        content: this.form.content
      }
      
      addMsg(data).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
location.reload();
    
    },

    //////
    close() {
      this.dialog_visible = false;
      this.$emit("close", false);
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible: {
      handler(newValue, oldValue) {
        this.dialog_visible = newValue;
      }
    }
  }
};
</script>
<style lang="scss">
</style>