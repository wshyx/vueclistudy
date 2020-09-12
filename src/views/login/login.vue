<template>
  <div id="login">
    <div class="menuTab">
      <ul class="menuWrap">
        <li
          v-for="item in menuTab"
          v-bind:key="item.id"
          v-bind:class="{'active' : item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-item"
        size="medium"
      >
        <el-form-item prop="checkEmail" class="menuTab-bottom">
          <label for="email">邮箱</label>
          <el-input id="email" type="text" v-model="ruleForm.checkEmail" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="checkPassword" class="menuTab-bottom">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.checkPassword"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPasswords" class="menuTab-bottom" v-if="menuTab[1].current">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.checkPasswords"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkSms" class="menuTab-bottom">
          <label for="Sms">验证码</label>
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-input id="Sms" type="text" v-model="ruleForm.checkSms"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-button
                  type="success"
                  class="check"
                  @click="getSms()"
                  v-bind:disabled="Sms.status"
                >{{Sms.text}}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="menuTab-bottom">
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="submit"
            v-bind:disabled="submitStatus"
          >{{menuTab[0].current ? "登录" : "注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validateusername } from "../../utils/validate.js";
import { getSms, Register, Login } from "../../api/login.js";

import sha1 from "sha1";
export default {
  name: "Login",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的邮箱"));
      } else if (!validateusername(value)) {
        callback(new Error("您输入的邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码为空"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码应在6-20位之间"));
      } else {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("两次密码不一致"));
      } else if (value !== this.ruleForm.checkPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    var checkSms = (rule, value, callback) => {
      callback();
    };

    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      ruleForm: {
        checkEmail: "",
        checkPassword: "",
        checkPasswords: "",
        checkSms: ""
      },
      rules: {
        checkEmail: [{ validator: validateEmail, trigger: "blur" }],
        checkPassword: [{ validator: validatePassword, trigger: "blur" }],
        checkPasswords: [{ validator: validatePasswords, trigger: "blur" }],
        checkSms: [{ validator: checkSms, trigger: "blur" }]
      },
      Sms: {
        text: "获取验证码",
        status: false
      },
      /**
       * submit状态
       */
      submitStatus: true,
      /**
       * 定时器
       */
      timer: null
    };
  },
  methods: {
    /*
    计时器
  
    */
    timing(num) {
      let number = num;
      this.timer = setInterval(() => {
        if (number === 0) {
          this.Sms.text = "获取验证码";
          this.Sms.status = false;
          clearInterval(this.timer);
        } else {
          this.Sms.text = number + "s";
          this.Sms.status = true;
          number--;
        }
      }, 1000);
    },
    /**
     * 关闭计时器
     */
    stopTiming() {
      this.Sms.text = "发送验证码"
      this.Sms.status = false
    
      clearInterval(this.timer)
    },
    /**
     * 切换菜单
     */
    toggleMenu(item) {
      this.menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      item.current = true;
      this.$refs["loginForm"].resetFields();
      this.stopTiming()
    },
    /**
     * 提交
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
      
          this.menuTab[0].current ? this.Login() : this.Register()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 注册函数
     */
    Register() {
      let dataRegister = {
        username: this.ruleForm.checkEmail,
        password: sha1(this.ruleForm.checkPassword),
        code: this.ruleForm.checkSms
      }
      Register(dataRegister).then(response => {
        this.toggleMenu(this.menuTab[0])
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 登陆函数
     */
    Login() {
      let dataLogin = {
        username: this.ruleForm.checkEmail,
        password: sha1(this.ruleForm.checkPassword),
        code: this.ruleForm.checkSms
      }

      this.$store.dispatch("Login",dataLogin).then(response => {
        console.log(response)
        this.$router.push({name: "Console"})
      }).catch(error => {
        console.log(error)
      })
      // Login(dataLogin).then(response => {
      //   console.log(response)
      //   this.$router.push({name : "Console"})
      // }).catch(error => {

      //   console.log(error)
      // })
    },
    /*
    验证码
    */
    getSms() {
      if (!this.ruleForm.checkEmail) {
        return this.$message.error("邮箱不能为空");
      }
      if (!validateusername(this.ruleForm.checkEmail)) {
        return this.$message.error("邮箱格式错误");
      }

      let data = {
        username: this.ruleForm.checkEmail,
        module: this.menuTab[0].current ? "login" : "register"
      };
      this.Sms.text = "发送中";

      this.Sms.status = true;
      getSms(data)
        .then(response => {
          this.timing(10);
          this.Sms.text = "发送验证码";
          this.Sms.status = false;
          this.submitStatus = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
  
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.menuTab {
  width: 330px;
  margin: auto;
}
.menuWrap {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
}
.active {
  background-color: rgba(0, 0, 0, 1);
}
.login-item {
  width: 330px;
  margin: auto;
  color: white;
  .submit {
    width: 100%;
    height: 40px;
    border-radius: 2px;
    margin-top: 20px;
  }
  .check {
    width: 100%;
    height: 37px;
  }
  .menuTab-bottom {
    margin-bottom: 22px;
  }
}
</style>