<template>
  <form class="form form_join" @submit.prevent="join">
    <h1 class="form_title">가입하기</h1>
    <BaseInput
      label="userEmail"
      title="email"
      v-model="email"
      placeholder="이메일을 입력해주세요"
      type="text"
      class="group"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()"
    />

    <template v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="message_err">
        유효한 이메일 주소를 입력해주세요
      </p>
      <p v-if="!$v.email.required" class="message_err">
        이메일은 필수 입력 사항입니다
      </p>
    </template>

    <BaseInput
      label="userPwd"
      title="password"
      v-model="password"
      placeholder="비밀번호를 입력해주세요"
      type="password"
      class="group"
      :class="{ error: $v.password.$error }"
      @blur="$v.password.$touch()"
    />

    <template v-if="$v.password.$error">
      <p v-if="!$v.password.minLength" class="message_err">
        비밀번호는 최소 5자 이상입니다
      </p>
      <p v-if="!$v.password.required" class="message_err">
        비밀번호는 필수 입력 사항입니다
      </p>
    </template>

    <BaseButton :disabled="$v.$anyError" type="submit">Join</BaseButton>
    <p v-if="$v.$anyError" class="message_err">필수 입력 사항을 채워주세요</p>
    <div class="link">
      <p class="link_text">
        이미 회원이시면
        <router-link class="link_btn" to="login">로그인</router-link>을 해주세요
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import NProgress from 'nprogress'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    join() {
      this.$v.$touch()
      NProgress.start()
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('user/join', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            // this.$router.push({ name: 'jmtzcreate' })
            this.$router.replace({ name: 'jmtzcreate' })
          })
          .catch(() => {
            NProgress.done()
          })
      }
    }
  }
}
</script>

<style scoped></style>
