<template>
    <div>
        <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <template>
              <label for>关键字</label>
              <el-select v-model="selWord" class="keyBox" size="mini">
                <el-option
                  v-for="item in keyWord"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input placeholder="请输入内容" type="text" size="mini" class="box"></el-input>
              <el-button type="danger" size="mini">搜索</el-button>
            </template>
          </div>
        </el-col>
        <el-col :span="12">
        <el-button type="danger" size="mini">添加用户</el-button>
        </el-col>
        
      </el-row>
      <!--表格-->
      <table class="boxTable">
          <tr>
              <th><input type="checkbox" name="" id="" ></th>
              <th>邮箱/用户名</th>
              <th>真实姓名</th>
              <th>手机号</th>
              <th>角色</th>
              <th>禁启用状态</th>
              <th>操作</th>
          </tr>
          <tr v-for="item in tableData" :key="item.id">
            <td><input type="checkbox" name="" id="" ></td>
            <td>{{item.date}}</td>
            <td>{{item.name}}</td>
            <td>{{item.address}}</td>
            <td>管理员</td>
             <td><el-button size="mini">编辑</el-button><el-button size="mini">删除</el-button></td>
             
          </tr>
        </table>
    </div>
</template>
<script>

export default {
    data() {
        return {
            keyWord: [
                {
                    label:"手机号",
                    value:"手机号"
                },
                {
                    label:"姓名",
                    value:"姓名"
                }
            ],
            selWord:"手机号",
            status:false,
            tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
            
        }
    },
    methods:{
     
    }
}
</script>
<style lang="scss">
    
</style>