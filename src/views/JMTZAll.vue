<template>
  <div class="list">
    <JMTZ :allJmtz="allArray" />
  </div>
</template>

<script>
import JMTZ from './JMTZ.vue'
export default {
  components: {
    JMTZ
  },
  props: {
    getAllJMTZs: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    allArray() {
      let allArr = []
      for (var key in this.getAllJMTZs) {
        for (var childKey in this.getAllJMTZs[key]) {
          if (this.getAllJMTZs[key][childKey].isOpen) {
            allArr.push(this.getAllJMTZs[key][childKey])
          }
        }
      }

      return allArr.sort(
        (a, b) =>
          this.$moment(b.date).format('YYYYMMDDHHMMSS') -
          this.$moment(a.date).format('YYYYMMDDHHMMSS')
      )
    }
  },
  methods: {
    sliceEmail(email) {
      let newEmail =
        email.slice(0, 2) +
        email
          .slice(2)
          .split('')
          .map(() => '*')
          .join('')
      return newEmail
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  box-sizing: border-box;
  width: 100%;
  padding: 0rem 1rem 3rem;
  text-align: center;
}
.table {
  background-color: #f5f5f5;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  border-collapse: collapse;
  &_title {
    padding: 2rem 1.5rem;
    text-align: center;
    background-color: #585b5f;   // 기존 바 색상 #6d7ae0
    color: #fff;   // 글씨 색상
    font-weight: bold; // 폰트 진하게  기존 글씨 normal
  }

  &_desc {
    padding: 1rem 1.5rem;
    text-align: center;
    color: #999999;  //맛집 리스트 표 색상
  }
}
</style>
