<template>
    <el-container class="home">
        <el-aside :width="isCollapse? '64px':'200px'" class="silde">
            <div class="log" style="height:60px;" :class="{close:isCollapse}">

            </div>
            <!-- 导航菜单的路由功能-是否使用 vue-router 的模式，
            启用该模式会在激活导航时以 index 作为 path 进行路由跳转
            1----在el-menu上增加router属性
            2----把每一个el-menu-item 的index属性改成相应路由地址
             -->
             <!-- 切换路由 应该有对应的样式，不能写成一个默认样式 -->
            <el-menu

                :default-active="$route.path"
                :collapse-transition="false"
                background-color="#002233"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="border-right:none"
                :collapse="isCollapse"
                router
            >
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/content">
                    <i class="el-icon-menu"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/images" >
                    <i class="el-icon-document"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/public">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                 <el-menu-item index="/comment">
                    <i class="el-icon-s-comment"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                 <el-menu-item index="/fans">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                 <el-menu-item index="/settings">
                    <i class="el-icon-dessert"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container class="content">
            <el-header class="my-header">
                <span class="el-icon-s-fold" @click="qiehuan()"></span>
                <span class="text">江苏传智播客教育科技有限公司</span>
                <el-dropdown style="float:right">
                    <span class="el-dropdown-link">
                        <img
                            style="vertical-align:middle"
                            width="30"
                            height="30"
                            :src='avatar'
                            alt=""
                        >
                        <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- 通过.nactive获取dom -->
                        <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      avatar: '',
      name: ''

    }
  },
  created () {
    //   获取用户登录信息
    const usermes = JSON.parse(window.sessionStorage.getItem('mytoken'))
    // console.log(usermes)
    this.avatar = usermes.photo
    this.name = usermes.name
  },
  methods: {
    qiehuan () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // 跳转到setting
      this.$router.push('/setting')
    },
    logout () {
      // 退出登录--清楚token信息
    // window.sessionStorage.setItem('mytoke',null)
    // 直接移除
      window.sessionStorage.removeItem('mytoke')
      //   跳转回login页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.home {
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  .content {
    .my-header {
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      .el-icon-s-fold {
        vertical-align: middle;
        margin-right: 6px;
      }
      .text {
        vertical-align: middle;
      }
    }
  };
    .silde{
        background:#002233;
        .log{
            width:100%;
            background:#002840 url('../../assets/images/logo_admin.png')no-repeat center/140px auto;
        }
        .close{
            background-image:url('../../assets/images/logo_admin_01.png');
            background-size:36px auto;
        }
    }

}
</style>
