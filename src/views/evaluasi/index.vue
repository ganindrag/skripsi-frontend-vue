<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Evaluasi Tugas</h5>
    </div>
    <a-form layout="inline" :form="form" @submit="handleSearch" :hideRequiredMark="true">
      <a-form-item label="Laporan Aktifitas Programmer">
        <a-select v-decorator="['programmer_id']" style="width: 300px;" placeholder="Semua" allowClear>
          <a-select-option v-for="(item) in tugas.dataProgrammer" :key="item.id+item.name" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Bulan">
        <a-month-picker v-decorator="['month', { initialValue: moment() }]" format="MMMM YYYY" placeholder="Semua"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          Cari
        </a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <a-form v-if="evaluasi.length > 0" @submit="tes" layout="inline" :form="formUpdate" :hideRequiredMark="true" class="text-center">
      <a-table :columns="columns" :data-source="evaluasi" :pagination="false" :rowKey="record => record.id">
        <template slot="name" slot-scope="name">
          <a-tooltip>
            <template slot="title">
              {{ name }}
            </template>
            {{ name }}
          </a-tooltip>
        </template>
        <template slot="startdate" slot-scope="text, record, index">
          <a-date-picker v-model="evaluasi[index].start_at" :value="utc(evaluasi[index].start_at)"/>
        </template>
        <template slot="enddate" slot-scope="text, record, index">
          <a-date-picker v-model="evaluasi[index].end_at" :value="utc(evaluasi[index].end_at)"/>
        </template>
        <template slot="target" slot-scope="text, record, index">
          <a-input-number :min="1" v-model="evaluasi[index].weight"/>
        </template>
        <template slot="bugTolerance" slot-scope="text, record, index">
          <a-input-number :min="0" v-model="evaluasi[index].bug_tolerance"/>
        </template>
        <template slot="actualBug" slot-scope="text, record, index">
          <a-input-number :min="0" v-model="evaluasi[index].actual_bug"/>
        </template>
        <template slot="comprehense" slot-scope="text, record, index">
          <a-input-number :min="0" :max="100" v-model="evaluasi[index].comprehension"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"/>
        </template>
        <template slot="submit" slot-scope="text, record, index">
          <a-button type="primary" @click="editTask(index)">
            Nilai
          </a-button>
        </template>
      </a-table>
      <a-button type="primary" @click="editAllTask" class="text-center mt-3">
        Nilai Semua
      </a-button>
    </a-form>
    <a-empty v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { generateArrayDate } from '@/helper/date'
import { notification } from 'ant-design-vue'
import moment, { utc } from 'moment-timezone'

const defaultFilter = {
  month: moment().format('MMMM YYYY'),
}

const columns = [
  {
    dataIndex: 'programmer_name',
    key: 'programmer_name',
  },
  {
    title: 'Tugas',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Tanggal Mulai',
    dataIndex: 'start_at',
    key: 'start_at',
    scopedSlots: { customRender: 'startdate' },
  },
  {
    title: 'Tanggal Selesai',
    dataIndex: 'end_at',
    key: 'end_at',
    scopedSlots: { customRender: 'enddate' },
  },
  {
    title: 'Target Hari',
    dataIndex: 'weight',
    key: 'weight',
    scopedSlots: { customRender: 'target' },
  },
  {
    title: 'Toleransi Bug',
    dataIndex: 'bug_tolerance',
    key: 'bug_tolerance',
    scopedSlots: { customRender: 'bugTolerance' },
  },
  {
    title: 'Aktual Bug',
    dataIndex: 'actual_bug',
    key: 'actual_bug',
    scopedSlots: { customRender: 'actualBug' },
  },
  {
    title: 'Pemahaman',
    dataIndex: 'comprehension',
    key: 'comprehension',
    scopedSlots: { customRender: 'comprehense' },
  },
  {
    title: 'Aksi',
    dataIndex: 'aksi',
    key: 'aksi',
    scopedSlots: { customRender: 'submit' },
  },
]

export default {
  data: function () {
    return {
      form: this.$form.createForm(this, { initialValue: defaultFilter }),
      formUpdate: this.$form.createForm(this),
      dataFilter: defaultFilter,
      arrDate: generateArrayDate(defaultFilter.start_at, defaultFilter.end_at),
      startAt: defaultFilter.start_at,
      endAt: defaultFilter.end_at,
      columns,
      evaluasi: [],
    }
  },
  created() {
    console.log(this.report)
  },
  beforeCreate() {
    this.$store.dispatch('tugas/LOAD_DATA_PROGRAMMER', { payload: false })
  },
  beforeDestroy() {
    this.$store.dispatch('tugas/RESET_DATA_EVAL', { payload: false })
  },
  watch: {
    '$store.state.tugas.eval'() {
      console.log(this.eval)
      this.evaluasi = this.eval
    },
  },
  computed: {
    ...mapState(['tugas']),
    eval() {
      return this.$store.state.tugas.eval
    },
  },
  methods: {
    moment,
    utc,
    formatDate(d) {
      return moment(+d).format('DD MMM YYYY')
    },
    tes(v) {
      v.preventDefault()
      console.log(this.formUpdate.getFieldsValue())
    },
    handleSearch(e) {
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
          this.$store.dispatch('tugas/LOAD_DATA_EVAL', { payload: { iseval: false, status: 'DONE', start_at: startAt, end_at: endAt, prog_id: programmerId } })
        } else {
          notification.warning({
            message: err,
          })
        }
      })
    },
    editTask(i) {
      const data = this.evaluasi[i]
      const { id } = data
      this.$store.dispatch('tugas/SUBMIT_EVAL', { payload: { id, data: { ...data, is_evaluated: true } } })
    },
    editAllTask() {
      const cloneEvaluasi = this.evaluasi.slice()
      cloneEvaluasi.forEach(data => {
        const { id } = data
        this.$store.dispatch('tugas/SUBMIT_EVAL', { payload: { id, data: { ...data, is_evaluated: true } } })
      })
    },
  },
}
</script>
