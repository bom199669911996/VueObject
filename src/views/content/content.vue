<template>
    <div class="article_box">
        <!-- 图片组件 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 筛选内容 -->
            <el-form ref="form" :model="artform" label-width="80px">
                <el-form-item label="状态：">
                    <el-radio-group v-model="artform.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道：">
                    <!-- <my-channel :value="artform.channel_id" @input="fn()"></my-channel> -->
                    <my-channel v-model="artform.channel_id"></my-channel>

                </el-form-item>
                <el-form-item label="时间：">
                    <!-- 因为后台要求的日期格式是yyyy-MM-dd，所以必须运用插件，日期格式化  -->
                    <el-date-picker

                        value-format="yyyy-MM-dd"
                        @change="changeDate"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">根据筛选条件共查到
                <!-- 显示在页面上 -->
                <b>{{artform.total}}</b>条结果：
            </div>
            <el-table :data="tableData" style="width: 100%">
                <!-- 想要对数据进行包装，props满足不了，得使用插槽 -->
                <el-table-column label="封面">
                    <!-- 使用自定义表格，使用element-ui提供的插槽+图片组件 -->
                    <template slot-scope="scope">
                        <!-- {{scope.row.cover.images[0]}} -->
                        <!-- lazy element-ui提供的懒加载 -->
                        <el-image
                            :src="scope.row.cover.images[0]"
                            style="width:100px;height:75px"
                            lazy
                        >
                            <div slot="error" class="image-slot">
                                <!-- 不用图标。可以使用准备好的图片 -->
                                <!-- <i class="el-icon-picture-outline"></i> -->
                                <img
                                    src="../../assets/images/error.gif"
                                    alt=""
                                    width="100px"
                                    height="75px"
                                >
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="状态"
                >
                <!-- 运用element-ui的tag组件 判断scope.row.satus的状态码显示标签 -->
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
                    <el-tag v-if="scope.row.status==1">待审核</el-tag>
                    <el-tag type="success" v-if="scope.row.status==2">审核通过</el-tag>
                    <el-tag type="warning" v-if="scope.row.status==3">审核失败</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==4">删除</el-tag>
                </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate"></el-table-column>
                <el-table-column label="操作" style="width:200px">
                    <!-- 运用插槽
                        1---运用icon组件
                        2---circle 改变形状
                        3---type定义颜色
                        4---plain设置颜色比较浅
                        5---设置宽度
                     -->
                     <!-- 绑定删除事件，传入id -->
                    <template slot-scope="scope">
                        <!-- 测试修改后的id显示 -->
                        <!-- {{scope.row.id}} -->
                        <el-button icon="el-icon-delete" circle type="danger" plain @click="delcon(scope.row.id)"></el-button>
                        <!-- 实现编辑按钮跳转，并传递id值 -->
                        <el-button icon="el-icon-edit" circle type="primary" plain @click="editcon(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 总条数绑定  ---- 绑定组件属性每页条数---->
            <!--  -->
            <el-pagination class="pag" background="" layout="prev, pager, next"
            @current-change="changepage"
            :page-size="artform.per_page"
            :current-page="this.artform.page"
            :total="artform.total"></el-pagination>
        </el-card>
    </div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue'
export default {
  //   components: { MyBread },
  data () {
    return {
      tableData: [],
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段。''会发送一个空的数据
      artform: {
        page: 1,
        per_page: 20,
        total: 0,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      //   日期控件的数据
      value1: [],
      //   定义总条数
      total: 0
    }
  },
  created () {
    this.getchannel()
    this.getarticle()
  },
  methods: {
    //   实现点击编辑按钮，跳转页面
    editcon (id) {
      this.$router.push('/public?id=' + id)
    //   this.$router.push({ path: '/public', query: { id } })
    },
    //   运用弹框组件，完善删除功能
    delcon (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
        //   发送删除请求
          await this.axios.delete(`articles/${id}`)
          // 删除成功之后, 重新渲染页面
          this.getarticle()
          //  提示用户删除成功--消息提示
          this.$message('删除成功')
        })
        .catch(() => {

        })
    },
    changepage (newPage) {
      // newpage 当前点击的新页面
    //   把改变的新页码数给后台
      this.artform.page = newPage
      //   重新渲染数据
      this.getarticle()
    },
    search () {
    //    点击筛选，重新加载getarticle（）
      this.getarticle()
      this.artform.page = 1
    },
    //   用户确认选定的值时触发
    changeDate (value) {
      this.artform.begin_pubdate = value[0]
      this.artform.end_pubdate = value[1]
    },

    // 文章列表数据
    // post 传参 axios.post('url',{参数对象})
    // get传参 this.axios.get('url',{params:{参数对象}})
    async getarticle () {
      const {
        data: { data }
      } = await this.axios.get(`articles`, { params: this.artform })
      //   console.log(data)
      this.tableData = data.results
      // 包含了总条数
      this.artform.total = data.total_count
    }
  }
}
</script>

<style lang="less" scope>
.el-card {
  margin-bottom: 20px;
}
.pag {
  margin-top: 20px;
  text-align: center;
}
</style>
