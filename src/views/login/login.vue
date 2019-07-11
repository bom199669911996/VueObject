<template>
    <div class="main_box">
        <!-- 测试------- -->
        <!-- 我是一级路由login
        <el-row>
        <el-button type="danger" round>颜值爆表警报</el-button>
        </el-row>-->
        <!-- 1--卡片模板 -->
        <el-card class="box-card loginBox">
            <!-- 2--放入图片 -->
            <img src="../../assets/images/logo_index.png">
            <!-- 运用表单元素 -->
            <!-- 单个元素表单验证
            1--给form绑定表单元素  :model="loginForm"  :rules="loginrRules"
                input双向绑定
            2--给每项 el-form-item 绑定 prop属性 查看api接口文档 mobile 和 code
            3--在data里声明loginForm和rules，并给每一项设置具体规则
             status-icon错误和成功的小图标
            -->
            <!-- 自定义表单验证规则
            1---使用一个约定好的参数返回值函数三个参数
            2---在规则中使用validate制定该函数
            -->
            <!-- 整体表单验证
            1--给el-form + ref属性
            2--点击提交按钮时，获取el-dom的dom对象
            3--组件的函数需要通过dom才能调用
            4--校验函数validate函数
            5--传参valid 判断整个是否校验成功
             -->
            <el-form ref="loginForm" :model="loginForm" :rules="loginrRules" status-icon>
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:300px;"></el-input>
                    <el-button style="float:right" type="primary">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked" style="margin-right:10px;"></el-checkbox>我已经阅读并同意
                    <el-link type="primary" :underline="false">用户条款</el-link>和
                    <el-link type="primary" :underline="false">用户协议</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btnit" style="width:100%" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

  data () {
    const checkmobile = (rules, value, callback) => {
      // /转义符
      if (/^1[3-9]\d{9}$/.test(value)) {
        // 成功话的 callback（）
        callback()
      } else {
        // 失败的提示
        callback(new Error('请输入正确的手机号格式'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '15933333333',
        code: '246810'
      },
      loginrRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }

        ]
      }

    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        //   如果登录成功
        if (valid) {
          //   1.跳转页面
          this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
            //   这里的res是一个promise对象
              const { data } = res
              console.log(data)
            }).catch(() => {
              this.$message.error('账户或者密码错误')
            })
        // 2.记录登录状态
        }
      }
      )
    }
  }
}
</script>

<style lang="less">
.main_box {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center/cover;
  position: absolute;
  left: 0;
  top: 0;
  .loginBox {
    width: 500px;
    height: 350px;
    // background: hotpink;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      // img标签设置display:block，宽度无法100%
      display: block;
      width: 200px;
      height: auto;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
}
</style>
