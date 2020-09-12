<template>
  <div>
    <!--    头部      -->

    <el-row :gutter="24">
      <el-col :span="4">
        <div>
          <template>

            <label for>类别</label>

            <el-select v-model="selClass" size="mini" class="box">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </el-col>

      <el-col :span="8">
        <div>
          <template>
            <div class="block">
              <span class="demonstration">日期</span>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                class="box"
              ></el-date-picker>
            </div>
          </template>
        </div>
      </el-col>

      <el-col :span="7">
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
            <el-button type="danger" size="mini" @click="getList()">搜索</el-button>
          </template>
        </div>
      </el-col>

      <el-col :span="5">
        <div>
          <template>
            <el-button type="danger" size="mini" @click="add()">添加</el-button>
          </template>
        </div>
      </el-col>
    </el-row>

    <!--  表格-->

    <table class="boxTable">
      <tr>
        <th>
          <input type="checkbox" name id checked="true" />
        </th>
        <th>标题</th>
        <th>类别</th>
        <th>日期</th>
        <th>管理人</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>
          <input type="checkbox" name id />
        </td>
        <td>{{item.title}}</td>
        <td>{{item.categoryName}}</td>
        <td>{{item.date}}</td>
        <td>管理员</td>
        <td>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">删除</el-button>
        </td>
      </tr>
    </table>
    <el-row>
      <el-col :span="12">
        <el-button>批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next" :total="100" :current-page="current_page" ></el-pagination>
      </el-col>
    </el-row>
    <!--弹窗--------------------------------------------------------->
    <Dialog :dialogVisible = "dialogVisible" @close="close()" />
  </div>
</template>
 
<script>
import { getList } from "../../api/news.js";
import Dialog from "./dialog/add.vue";
export default {
  name: "infoList",
  components:{Dialog},
  data() {
    return {
      ////////////搜索数据
     

      ////////
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
      selClass: 1,
      date:"",
      keyWord: [
        {
          value: "ID",
          label: "ID"
        },
        {
          value: "标题",
          label: "标题"
        }
      ],
      selWord: "ID",

      ///////////////////////////////////////
      //表格数据
      tableData: null,
      ///////////////弹窗
      dialogVisible: false,
      ///////////////////////页数
      current_page: 1
    };
  },
  methods: {
    ////////////////////////////////////////弹窗
    add() {
      console.log("11111111111")
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
     ////////////////////////////////////
    //表格方法
    getList() {
    
      let data = {
        pageNumber: 1,
        pageSize: 5
      };
      getList(data)
        .then(response => {
          console.log(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

  },
  /////////////////////////////////////////////vue生命周期函数
  mounted() {
    let data = {
      pageNumber: 1,
      pageSize: 10
    }
    getList(data).then(response => {
      this.tableData = response.data.data.data
      let data = response.data.data.data
      let len = data.length
      for (let i = 0; i < len; i++) {
        console.log("hello")
        switch(data[i].categoryId) {
          case "1" : {
            data[i].categoryName = "国际信息"
            break
            }
          case "2" : {
            data[i].categoryName = "国内信息"
            break
          }
          case "3" : {
            data[i].categoryName = "社会信息"
            break
          }
          default :{
            data[i].categoryName = "没有此类"
            break;
          } 
        }
        data[i].date =  new Date(parseInt(data[i].createDate)).toLocaleDateString();
        
      }
      this.tableData = data
      console.log(this.tableData)
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  
   
  }
};
</script>
<style lang="scss"  >
.box {
  width: 120px;
  margin: 0 10px;
}
.keyBox {
  width: 100px;
  margin: 0 10px;
}
.boxTable {
  width: 80%;
  border: 1px solid black;
  border-spacing: 0;
  margin: 50px 0;
  th {
    text-align: center;
    border: 1px solid black;
  }
  td {
    text-align: center;
    border: 1px solid black;
  }
}
</style>