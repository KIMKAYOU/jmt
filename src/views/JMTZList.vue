<template>
  <div class="list">
    <h1 class="list_title">저장 맛집 목록</h1> 
    <ChartDonut
      v-if="checkgetJMTZs"
      :chartData="dataChart"
      :options="optionChart"
      :styles="chartStyle"
    />
    <table class="table" > 
      <colgroup>
        <col style="width: 7%" />
        <col style="width:" />
        <col style="width: 11%" />
        <col style="width: 12%" />
        <col style="width: 12%" />
        <col style="width:" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 5%" />
      </colgroup>
      <thead>
        <tr>
          <th class="table_title">종류</th>
          <th class="table_title">가게</th>
          <th class="table_title">메뉴</th>
          <th class="table_title">가격</th>
          <th class="table_title">위치</th>
          <th class="table_title">비고</th>
          <th class="table_title">추천/비추천</th>
          <th class="table_title">공개/비공개</th>
          <th class="table_title">삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(JMTZ, index) in getJMTZsData" :key="JMTZ.user">
          <td class="table_desc">{{ JMTZ.category }}</td>
          <td class="table_desc">{{ JMTZ.name }}</td>
          <td class="table_desc">{{ JMTZ.menu }}</td>
          <td class="table_desc">{{ JMTZ.price }}</td>
          <td class="table_desc">{{ JMTZ.location }}</td>
          <td class="table_desc">{{ JMTZ.memo }}</td>
          <td class="table_desc">
            {{ JMTZ.like }}
          </td>
          <td class="table_desc" @click="toggleIsOpen(JMTZ.isOpen, index)">
            <button type="button" class="btn_isOpen">
              {{ checkIsOpen(JMTZ.isOpen) }}
            </button>
          </td>
          <td class="table_desc">
            <button
              :data-id="JMTZ.id"
              @click="deleteJMTZ(index)"
              class="btn_del"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="bg"></div> -->
  </div>
</template>

<script>
import ChartDonut from '@/components/ChartDonut'
export default {
  data() {
    return {
      chartStyle: {
        height: '240px',
        margin: '2rem 0',    // 막대그래프 margin
        position: 'relative'
      },
      getJMTZsData: this.getJMTZs
    }
  },
  components: {
    ChartDonut
  },
  computed: {
    dataChart() {
      let dataLabels = []
      let dataNumbers = []
      let dataObject = {}
      let nameArray = []
      let objToCalc = {}

      Object.keys(this.getJMTZs).forEach(prop => {
        nameArray.push(this.getJMTZs[prop].category)
      })

      nameArray.forEach(value => {
        if (!objToCalc[value]) {
          objToCalc[value] = 1
        } else {
          objToCalc[value] += 1
        }
      })

      dataLabels = Object.keys(objToCalc)
      dataNumbers = Object.values(objToCalc)

      dataObject = {
        labels: dataLabels,
        datasets: [
          {
            data: dataNumbers,
            backgroundColor: [
              'rgba(255, 0, 0, 1)',
              'rgba(248, 129, 37, 1)', //orange
              'rgba(255, 225, 31, 1)', //yellow
              'rgba(0, 255, 0, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(161, 162, 154, 1)' // grey
           
            ]
          }
        ]
      }

      return dataObject
    },
    optionChart() {
      return {
        title: {
          display: true,
          text: '왕십리 업종 분포'
        },
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 50
      }
    },
    checkgetJMTZs() {
      return !!this.getJMTZs
    }
  },
  props: {
    getJMTZs: {
      type: [Object]
    }
  },
  methods: {
    checkIsOpen(isOpen) {
      return isOpen ? '공개' : '비공개'
    },
    deleteJMTZ(key) {
      this.$delete(this.getJMTZsData, key)
      this.$store.dispatch('removeJMTZ', {
        getJMTZ: this.getJMTZsData,
        key: key
      })
    },
    toggleIsOpen(isOpen, key) {
      console.log(this.getJMTZsData)
      this.getJMTZsData[key].isOpen = !isOpen
      this.$store.dispatch('updateJMTZ', {
        getJMTZ: this.getJMTZsData,
        key: key
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  &_title {
    text-align: center;
    width: 40%;
    min-width: 360px;
    font-size: 2rem;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #0ed3d9;
  }
  box-sizing: border-box;
  width: 100%;
  padding: 3rem 1rem 3rem;
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
    background-color: #6d7ae0;
    color: #fff;
    font-weight: normal;
  }

  &_desc {
    padding: 1rem 1.5rem;
    text-align: center;
    color: #999999;
  }
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.4;
  background: black;
}

.btn_del,
.btn_isOpen {
  margin: 0;
  padding: 0.5rem 1rem;
  min-width: 6rem;
  font-size: 1.4rem;
}
</style>
