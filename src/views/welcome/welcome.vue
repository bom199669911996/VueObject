<template>
    <div class="contain">

    </div>
</template>

<script>
export default {
  mounted () {
    this.getdatas()
  },
  methods: {
    getdatas () {
      this.axios.get(`articles`)
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>

<style lang="less">
.contain{
    height:100%;
    background: url('../../assets/images/welcome.jpg') no-repeat center;
}
</style>
