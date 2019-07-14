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
                    <el-select v-model="artform.channel_id" placeholder="请选择">
                        <el-option
                             v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                         </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="时间：">
                     <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                         end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
               <el-form-item>
                   <el-button  type="primary">筛选</el-button>
               </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix"></div>
        </el-card>
    </div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue'
export default {
//   components: { MyBread },
  data () {
    return {
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段。''会发送一个空的数据
      artform: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null

      },
      //   频道数据
      options: [
        { name: 'java', id: 1 }
      ],
      //   日期控件的数据
      value1: []
    }
  }
}
</script>

<style lang="less" scope>
.el-card {
  margin-bottom: 20px;
}
</style>
