<template>
    <div class="login-container">


        <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left">
            <el-tabs stretch v-model="loginForm.login_type">
                <el-tab-pane label="个人/企业" name="1">
                    <el-form-item prop="phone_number">
                      <span class="svg-container">
                          <i class="el-icon-user"></i>
                      </span>
                        <el-input size="mini" v-model="loginForm.phone_number" placeholder="手机号"
                                  name="phone_number" type="text"
                                  tabindex="1" auto-complete="on"/>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-row :gutter="20">
                            <el-col :span="2">
                          <span class="svg-container">
                            <i class="iconfont el-icon-mima"></i>
                          </span>
                            </el-col>
                            <el-col :span="13">
                                <el-input v-model="loginForm.code" placeholder="验证码" name="code"
                                          type="text"
                                          maxlength="8"
                                          tabindex="2" auto-complete="on"/>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click="sendCode" style="height: 52px;margin-left: 2px" type="primary">发送验证码
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="管理员" name="2">
                    <el-form-item prop="phone_number">
                      <span class="svg-container">
                          <i class="el-icon-user"></i>
                      </span>
                        <el-input size="mini" v-model="loginForm.phone_number" placeholder="手机号"
                                  name="phone_number" type="text"
                                  tabindex="1" auto-complete="on"/>
                    </el-form-item>
                    <el-form-item prop="phone_number">
                       <span class="svg-container">
                            <i class="iconfont el-icon-mima"></i>
                          </span>
                        <el-input placeholder="请输入密码" name="password" v-model="loginForm.password"
                                  show-password></el-input>
                    </el-form-item>


                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" @click.native.prevent="handleLogins"
                       style="width:100%;margin-bottom:30px;">登录
            </el-button>

            <div class="tips">
                <span style="margin-right:20px;">username: admin</span>
                <span> password: 123456</span>
            </div>

        </el-form>
    </div>
</template>


<script>
// import { mapState } from 'vuex'
import {sendCode} from "@/api/user";

export default {
    data() {
        return {
            loginForm: {
                phone_number: '',
                code: '',
                password: '',
                login_type: '1'
            },

        };
    },
    computed: {},
    methods: {
        handleLogins() {
            this.$store.dispatch('login/login', this.loginForm).then((res) => {
                if (res.code === 200) {
                    this.$router.replace('/index')
                }
            })
        },

        sendCode() {
            this.$store.dispatch('login/sendCode', this.loginForm)
        }
    },
    mounted() {
    }
}
</script>


<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@bg: #283443;
@light_gray: #283443;
@cursor: #283443;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//     .login-container .el-input input {
//         color: $cursor;
//     }
// }

/* reset element-ui css */
.login-container {
  height: 100vh;
  background-image: url("../../assets/image/loginbg.jpg");
  background-size: 100% 100%;


  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    border: 1px solid #e3e3e3;
  }
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #303133;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    width: 340px;
    max-width: 100%;
    padding: 45px 35px 0;
    background: #fff;
    height: 340px;
    top: 28%;
    margin-top: -50px;
    border-radius: 7px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .login_title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>