<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Laporan Tugas Programmer</h5>
    </div>
    <a-form layout="inline" :form="form" @submit="handleSubmit" :hideRequiredMark="true">
      <a-form-item label="Laporan Penilaian Tugas Bulan">
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
    <div v-if="report.length > 0">
      <a-table :columns="columns" :dataSource="report" :rowKey="record => record.id" bordered>
        <span slot="grade" slot-scope="text, record">
          <span v-if="record.grade">
            {{record.totalgrade.toFixed(0)}}
            <a-divider type="vertical" />
            {{record.grade}}
          </span>
          <span v-else>(belum dinilai)</span>
        </span>
      </a-table>
      <div class="alert alert-primary mt-3">
        <p>Range Nilai:</p>
        <ul>
          <li>85-100 : A (Sangat Baik)</li>
          <li>75-84 : B (Baik)</li>
          <li>60-74 : C (Cukup)</li>
          <li>50-59 : D (Kurang)</li>
          <li>&lt; 50 : E (Sangat Kurang)</li>
        </ul>
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

const columns = [{
  title: 'Tugas',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'Penilaian',
  align: 'center',
  children: [
    {
      title: 'Lama Pengerjaan',
      dataIndex: 'dategrade',
      key: 'dategrade',
      align: 'center',
      customRender: (text) => text ? text.toFixed(0) : '(belum dinilai)',
    },
    {
      title: 'Bebas Bug',
      dataIndex: 'buggrade',
      key: 'buggrade',
      align: 'center',
      customRender: (text) => text ? text.toFixed(0) : '(belum dinilai)',
    },
    {
      title: 'Pemahaman',
      dataIndex: 'comprehensiongrade',
      key: 'comprehensiongrade',
      align: 'center',
      customRender: (text) => text ? text.toFixed(0) : '(belum dinilai)',
    },
  ],
},
{
  title: 'Nilai',
  align: 'center',
  key: 'nilai',
  scopedSlots: { customRender: 'grade' },
}]

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
      columns,
    }
  },
  created() {
    console.log(this.report)
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
