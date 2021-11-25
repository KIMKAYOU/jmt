<template>
  <div>
    <div class="category">
      한식
    </div>
    <div class="list" v-for="list in allList" :key="list.id">
      <div v-if="list.category == '한식'">
        <div>
          <div
            class="list_image-wrap"
            style="width: 300px;"
            v-lazy-container="{
              selector: 'img'
            }"
          >
            <img src="@/assets/logo.png" alt="" />
            <img
              class="list_image"
              :data-src="list.imageUrl"
              data-loading="@/assets/logo.png"
              alt=""
              style="width: 100%"
            />
          </div>
          <div class="list_group">
            <span>#{{ list.category }}</span>
            <span>#{{ list.menu }}</span>
            <span>#{{ list.location }}</span>
          </div>
          {{ list.name }}
        </div>
      </div>
    </div>
    <div class="category">
      중식
    </div>
    <div class="list" v-for="list in allList" :key="list.id">
      <div v-if="list.category == '중식'">
        <div>
          <div
            class="list_image-wrap"
            style="width: 300px;"
            v-lazy-container="{
              selector: 'img'
            }"
          >
            <img src="@/assets/logo.png" alt="" />
            <img
              class="list_image"
              :data-src="list.imageUrl"
              data-loading="@/assets/logo.png"
              alt=""
              style="width: 100%"
            />
          </div>
          <div class="list_group">
            <span>#{{ list.category }}</span>
            <span>#{{ list.menu }}</span>
            <span>#{{ list.location }}</span>
          </div>
          {{ list.name }}
        </div>
      </div>
    </div>
    <div class="category">
      양식
    </div>
    <div class="list" v-for="list in allList" :key="list.id">
      <div v-if="list.category == '양식'">
        <div>
          <div
            class="list_image-wrap"
            style="width: 300px;"
            v-lazy-container="{
              selector: 'img'
            }"
          >
            <img src="@/assets/logo.png" alt="" />
            <img
              class="list_image"
              :data-src="list.imageUrl"
              data-loading="@/assets/logo.png"
              alt=""
              style="width: 100%"
            />
          </div>

          <div class="list_group">
            <span>#{{ list.category }}</span>
            <span>#{{ list.menu }}</span>
            <span>#{{ list.location }}</span>
          </div>

          <div class="list_name">
            {{ list.name }}
          </div>

          <div class="list_memo">
            {{ list.memo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allJmtz'],
  data() {
    return {
      allList: this.allJmtz
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  width: 30%;
  margin: 3rem auto;
  padding: 1rem;
  font-size: 2rem;
  color: #04cfd6;
  border: 0.5rem solid;
  border-color: #04cfd6;
  border-radius: 1rem;
}

.list {
  display: inline-block;
  font-size: 2rem;

  &_image {
    width: 100%;
    height: 300px;
    border-radius: 3rem;
    vertical-align: baseline;
  }

  &_image-wrap {
    width: 300px;
    margin: 0rem 1rem;
  }

  &_group {
    margin: 10px;
    span {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      background-color: #04cfd6;
      padding: 5px;
      margin: 5px;
    }
  }

  &_name {
    font-size: 2rem;
    margin: 1rem;
  }

  &_memo {
    font-size: 1.5rem;
    margin: 1rem;
  }
}
</style>