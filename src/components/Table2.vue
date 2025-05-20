
<template>
  <div class="hello">
    {{ msg }}
    <div>
      <h1>用户列表</h1>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.name }} -- {{ user.phone }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.$axios.get('/user/getAll0')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>