<template>
    <div>
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <my-bread>发布文章</my-bread>
            </div>
            <el-form ref="form" :model="publicform" label-width="80px">
                <el-form-item label="标题：">
                <el-input v-model="publicform.title" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item  v-model='publicform.content' label="内容：">
                     富文本
                </el-form-item>
                <el-form-item label="封面：">
                        <el-radio-group v-model="publicform.cover.type">
                            <el-radio :label="1">单图</el-radio>
                            <el-radio :label="3">三图</el-radio>
                            <el-radio :label="0">无图</el-radio>
                            <el-radio :label="-1">自动</el-radio>
                        </el-radio-group>
                        <div class="img_btn">
                            <img src="../../assets/images/avatar.jpg" alt="">
                        </div>
                </el-form-item>
                 <el-form-item label="频道：">
                     <my-channel v-model="publicform.channel_id"></my-channel>
                </el-form-item>
                <el-form-item>
                <el-button type="primary">发表</el-button>
                <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      publicform: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },

        channel_id: null

      }
    }
  }
}
</script>

<style>

</style>
