<template>
  <header class="header">
    <h1 class="header_logo-wrap">
      <router-link to="/" v-if="!loggedIn">
        <img src="../assets/MustEat.png" width="100px" padding-left="50px" />왕십리 맛집 저장소  
      </router-link>
      <router-link to="/jmtzall" v-else
        >
        <img src="../assets/MustEat.png" width="100px" padding-left="50px" /> 왕십리 맛집 저장소</router-link
      >
    </h1>
    <nav class="nav">
      <router-link to="/" v-if="!loggedIn">Home</router-link>
      <router-link to="/jmtzall" v-else>Home</router-link>
      <!-- <router-link to="/jmtzall">
        JMTZ 리스트(전체)
      </router-link>-->
      <!-- <template v-if="!loggedIn">
        <router-link to="/join">가입</router-link>
        <router-link to="/login">로그인</router-link>
      </template>-->
      <template v-if="loggedIn">
        <router-link to="/jmtzcreate">등록</router-link>
        <router-link to="/jmtzlist">마이페이지</router-link>
        <a href="#;" @click="logout">Logout</a>
      </template>
    </nav>
  </header>
</template>

<script>
import { authComputed } from '../vuex/helpers.js'

export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('There was en error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  // flex-direction: row;
  // align-items: center;
  padding: 0 2rem;
  // background: linear-gradient(to right, #d2527f, #d91e18);
  // background-color: #f3664e;
  border-bottom: 1px solid #c83228;
  &_logo-wrap {
    > a {
      color: #c83228;
      border: none;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }

    > a:hover {
      color: black;
      border: none;
    }

    > a:hover > .header_logo {
      color: #c83228;
    }

    color: #c83228;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &_logo {
    margin-right: 10px;
    color: #c83228;
    font-size: 2rem;
    transition: all 1s;
  }
}

.nav {
  display: flex;
  align-items: center;
  min-height: 7rem;
  padding: 0.2em 1em;
  max-width: 1200px;
  margin: 0 auto;
  // margin-bottom: 5rem;
  justify-content: center;
}

a {
  font-size: 1.6rem;
  // font-weight: bold;
  color: #2e3131;
  margin: auto 1rem;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  transition: all 1s;

  &:hover {
    color: #c83228;
    border-bottom: 2px solid #a22920;
  }

  &:active {
    color: #c83228;
    border-bottom: 2px solid #a22920;
  }
}

.router-link-exact-active {
  color: #c83228;
  border-bottom: 2px solid #c83228;
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
