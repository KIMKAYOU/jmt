<template>
  <div>
    <div class="title">
     <h1>왕십리의 맛집들</h1>
      <p>왕십리의 맛집들을 소개하는 서비스</p>
    </div>
    <LoginUser v-if="!loggedIn"></LoginUser>
    <router-view />
  </div>
</template>

<script>
import { authComputed } from '../vuex/helpers.js'
import LoginUser from './LoginUser.vue'
import NProgress from 'nprogress'

export default {
  components: { LoginUser },
  computed: {
    ...authComputed
  },
  watch: {
    loggedIn: function() {
      NProgress.done()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 60%;
  padding: 3rem;
  text-align: center;
  font-weight: bold;
  position: relative;

  h1 {
    font-size: 5rem;
  }

  p {
    font-size: 2rem;
  }
}

.title::after {
  content: "";
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2rem;
  opacity: 0.3;
  z-index: -1;
}

</style>
