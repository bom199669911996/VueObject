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
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码" style="width:300px;"></el-input>
                    <el-button style="float:right" type="primary">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked" style="margin-right:10px;"></el-checkbox>我已经阅读并同意
                    <el-link type="primary" :underline="false">用户条款</el-link>和<el-link type="primary" :underline="false">用户协议</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btnit" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      form: {

      }

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
