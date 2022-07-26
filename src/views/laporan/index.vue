<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Laporan Tugas Programmer</h5>
    </div>
    <a-form layout="inline" :form="form" @submit="handleSubmit" :hideRequiredMark="true">
      <a-form-item label="Laporan Aktifitas Programmer">
        <a-select v-decorator="['programmer_id', {rules: [{ required: true, message: 'Nama Programmer harus diisi'}]}]" style="width: 300px;">
          <a-select-option v-for="(item) in tugas.dataProgrammer" :key="item.id+item.name" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Bulan">
        <a-month-picker v-decorator="['month', { initialValue: moment() }]" format="MMMM YYYY" :allowClear="false" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          Cari
        </a-button>
      </a-form-item>
      <div v-show="report.length > 0" :class="{[$style.grade]: true, [$style[grade.grade]]: true, [$style.uneval]: grade.hasUnEvaluated}" @click="grade.hasUnEvaluated ? toEvaluation : null">
        <span v-if="grade.grade !== ''" class="text-dark">{{grade.numberGrade && grade.numberGrade.toFixed(0)}} / <span class="font-weight-bold">{{grade.grade}}</span></span>
        <span v-else class="text-light">nihil</span>
      </div>
    </a-form>
    <a-divider />
    <div v-if="report.length > 0" :class="$style.container">
      <div v-for="(arr, index) in arrDate" v-bind:key="index" :class="$style.col" :style="{zIndex: arr.zIndex}">
        <div :class="$style.colhead">{{formatDate(index)}}</div>
        <div v-for="(a, i) in arr.data" v-bind:key="index+i" :class="{'invisible': a.null, [$style.tugas]: true}" :style="{width: ((!a.null ? a.workdate*100 : 100)-20) + 'px', overflow: 'hidden' }">
          <a-tooltip>
            <template slot="title">
              {{ !a.null ? a.name : 'hidden' }}
            </template>
            {{ !a.null ? a.name : 'hidden' }}
          </a-tooltip>
        </div>
      </div>
    </div>
    <a-empty v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { generateArrayDate } from '@/helper/date'
import { generateData } from '@/helper/gantt'
import { notification } from 'ant-design-vue'
import moment from 'moment-timezone'
import router from '@/router'

const defaultFilter = {
  month: moment().format('MMMM YYYY'),
}

export default {
  data: function () {
    return {
      form: this.$form.createForm(this, { initialValue: defaultFilter }),
      dataFilter: defaultFilter,
      arrDate: generateArrayDate(defaultFilter.start_at, defaultFilter.end_at),
      startAt: defaultFilter.start_at,
      endAt: defaultFilter.end_at,
    }
  },
  created() {
    console.log(this.report)
  },
  beforeCreate() {
    this.$store.dispatch('tugas/LOAD_DATA_PROGRAMMER', { payload: false })
  },
  beforeDestroy() {
    this.$store.dispatch('tugas/RESET_DATA_REPORT', { payload: false })
  },
  watch: {
    '$store.state.tugas.report'() {
      console.log(this.arrDate)
      const endMonth = new Date(moment.utc(this.endAt).format('YYYY-MM-DD'))
      generateData(this.report, this.arrDate, endMonth)
    },
  },
  computed: {
    ...mapState(['tugas']),
    report() {
      return this.$store.state.tugas.report.data
    },
    grade() {
      const { data, ...grade } = this.$store.state.tugas.report
      return grade
    },
  },
  methods: {
    moment() {
      return moment()
    },
    formatDate(d) {
      return moment(+d).format('DD MMM YYYY')
    },
    toEvaluation() {
      router.push('/evaluasi')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          const startAt = values.month.startOf('month').format('YYYY-MM-DD')
          const endAt = values.month.endOf('month').format('YYYY-MM-DD')
          const programmerId = values.programmer_id
          this.startAt = startAt
          this.endAt = endAt
          this.arrDate = generateArrayDate(startAt, endAt)
          this.$store.dispatch('tugas/LOAD_DATA_REPORT', { payload: { start_at: startAt, end_at: endAt, prog_id: programmerId } })
        } else {
          notification.warning({
            message: err,
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
