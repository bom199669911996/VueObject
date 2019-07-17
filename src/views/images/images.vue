<template>
    <!-- 加载效果显示 -->
    <div v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <my-bread>素材管理</my-bread>
            </div>
            <div>
                <el-radio-group v-model="imagesform.collect" size="small" @change="search()">
                    <el-radio-button label="false">全部</el-radio-button>
                    <el-radio-button label="true">收藏</el-radio-button>
                </el-radio-group>
                <!-- 添加素材 -->
                <el-button
                    type="success"
                    @click="dialogVisible=true"
                    style="float:right"
                    size="small"
                >上传素材</el-button>
                <ul v-for="items in image_list" :key="items.id" class="list_img">
                    <li>
                        <img src="items.url" alt="">
                        <!-- 切换到收藏页面不需要此div -->
                        <div class="fot" v-if="!imagesform.collect">
                            <span
                                class="el-icon-star-off"
                                :class="{red:items.is_collected}"
                                @click="toggle(items)"
                            ></span>
                            <span class="el-icon-delete" @click="delitems(items.id)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </el-card>
        <el-pagination
            style="text-align:center"
            background=""
            layout="prev, pager, next"
            :page-size="imagesform.per_page"
            :current-page="imagesform.page"
            @current-change="paper"
            :total="total"
        ></el-pagination>
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
            <!--
                class="avatar-uploader" ---样式
                  action---要写入完整的请求抵制==注意：携带tooken
                  on-success="handleAvatarSuccess"==上传成功的回调函数
                imageUrl====图片的预览地址
                headers==设置上传的请求头--在这里是为了权限
                name--必须设置为后台给的数据
            -->
            <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :show-file-list="false"
                :headers="headers"
                name="image"
                :on-success="handleSuccess"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imagesform: {
        collect: false,
        page: 1,
        per_page: 10
      },
      image_list: [],
      //   总页数
      total: 0,
      //   对话框状态
      dialogVisible: false,
      //   预览的地址
      imageUrl: null,
      // 上传的请求头
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('mytoken')).token
      },
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   再请求前开启加载，在结束的时候结束加载
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get(`user/images`, { params: this.imagesform })
      console.log(data)
      this.image_list = data.results
      this.total = data.total_count
      this.loading = false
    },
    search () {
      // 当切换页面时，默认选中第一页
      this.imagesform.page = 1
      //   重新请求
      this.getImages()
    },
    paper (newpage) {
      this.imagesform.page = newpage
      this.getImages()
    },
    // 上传成功后的处理函数
    handleSuccess (res) {
      // 预览地址
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      //   关闭对话框，更新列表
      // 设置一个时间，来自动关闭对话框
      window.setTimeout(() => {
        //   关闭对话框
        this.dialogVisible = false
        // 重新刷新列表
        this.getImages()
        // 设置浏览地址为null
        this.imageUrl = null
      }, 1500)
    },
    async toggle (items) {
      // item包含id is_collcted是否收藏
      const {
        data: { data }
      } = await this.axios.put(`user/images/` + items.id, {
        collect: !items.is_collected
      })
      console.log(data)
      //   成功 图标切换颜色 red类名
      this.$message.success('操作成功')
      //  收藏就点成不收藏，不收藏就点击成收藏
      items.is_collected = !items.is_collected
    },
    delitems (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete('user/images/' + id)
          // 删除成功
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.list_img {
  list-style: none;
  margin: 0;
  padding: 0;
  // overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    border: 1px dashed #eee;
    float: left;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
