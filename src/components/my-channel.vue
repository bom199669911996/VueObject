<template>
    <el-select :value="value" @change="fn">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  created () {
    // 获取频道数据
    this.getData()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    async getData () {
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.options = data.channels
    }
  }
}
</script>

<style lang="less">
</style>
