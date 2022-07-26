<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Lihat Data Tugas</h5>
    </div>
    <a-tabs type="card">
      <a-tab-pane key="1" tab="Detail">
        <a-form :form="form" layout="vertical" @submit="saveTaskHandler">
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <a-form-item label="Nama Tugas">
                    <a-input v-decorator="['name', {initialValue: tugas.dataEdit.name, rules: [{ required: true, message: 'Nama tugas harus diisi'}]}]" disabled />
                  </a-form-item>
                </div>
                <div class="col-md-6">
                  <a-form-item label="Bobot Tugas (dalam hari)">
                    <a-input-number v-decorator="['weight', {initialValue: tugas.dataEdit.weight}]" class="w-100" disabled />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <a-form-item label="Keterangan Tugas">
                    <a-textarea v-decorator="['detail', {initialValue: tugas.dataEdit.detail}]" disabled />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <a-form-item label="Ditugaskan ke">
                    <a-select v-decorator="['programmer_id', {initialValue: tugas.dataEdit.programmer_id}]" disabled>
                      <a-select-option v-for="(item) in tugas.dataProgrammer" :key="item.id+item.name" :value="item.id">{{item.name}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <a-form-item label="Status Tugas">
                    <a-select v-decorator="['status', { initialValue: tugas.dataEdit.status }]" @change="handleStatusChange" disabled>
                      <a-select-option value="TODO">ToDo</a-select-option>
                      <a-select-option value="DOING">Doing</a-select-option>
                      <a-select-option value="DONE">Done</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="row" v-if="showStartAt">
                <div class="col-md-6">
                  <a-form-item label="Tanggal Mulai">
                    <a-date-picker style="width: 100%" v-decorator="['start_at', {initialValue: tugas.dataEdit.start_at, rules: [{ required: showStartAt, message: 'Tanggal harus diisi'}]}]" disabled />
                  </a-form-item>
                </div>
              </div>
              <div class="row" v-if="showEndAt">
                <div class="col-md-6">
                  <a-form-item label="Tanggal Selesai">
                    <a-date-picker style="width: 100%" v-decorator="['end_at', {initialValue: tugas.dataEdit.end_at, rules: [{ required: showStartAt, message: 'Tanggal harus diisi' }]}]" disabled />
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="col-md-12 order-md-last pr-0 text-right" v-show="user.role === 'ADMIN'">
                <a-popconfirm
                  title="Yakin mau hapus data tugas ini?"
                  @confirm="confirm"
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <a-button type="danger" htmlType="button">Hapus Data</a-button>
                </a-popconfirm>
              </div>
              <div class="col-md-12 mt-1 card px-2 py-3" v-show="!!tugas.dataEdit.grade">
                <div class="d-flex">
                  <div class="col-md mx-2 py-3 card text-center">
                    <h5>Lama Pengerjaan</h5>
                    <h3>{{tugas.dataEdit.dateGrade ? tugas.dataEdit.dateGrade.toFixed(0) : ''}} / 30</h3>
                  </div>
                  <div class="col-md mx-2 py-3 card text-center">
                    <h5>Bebas Bug</h5>
                    <h3>{{tugas.dataEdit.bugGrade ? tugas.dataEdit.bugGrade.toFixed(0) : ''}} / 50</h3>
                  </div>
                  <div class="col-md mx-2 py-3 card text-center">
                    <h5>Pemahaman</h5>
                    <h3>{{tugas.dataEdit.comprehensionGrade ? tugas.dataEdit.comprehensionGrade.toFixed(0) : ''}} / 20</h3>
                  </div>
                </div>
                <div class="text-center my-3">
                  <h2>{{tugas.dataEdit.numberGrade ? tugas.dataEdit.numberGrade.toFixed(0) : ''}} | {{tugas.dataEdit.grade}}</h2>
                </div>
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
            </div>
          </div>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Feedback">
        <a-list item-layout="horizontal" :data-source="tugas.dataFeedback">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              :description="item.feedback"
            >
              <h5 slot="title">From: {{item.programmer_name}}</h5>
              <a-avatar slot="avatar">{{item.programmer_name[0]}}</a-avatar>
            </a-list-item-meta>
            <span slot="actions">{{moment(item.created_at)}}</span>
          </a-list-item>
        </a-list>
        <a-divider />
        <a-form :form="formFeedback" layout="vertical" @submit="saveFeedbackHandler">
          <div class="row">
            <div class="col-md-6">
              <a-form-item label="Tambah Feedback">
                <a-textarea v-decorator="['feedback', {}]" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" htmlType="submit">Simpan</a-button>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import router from '@/router'
import moment from 'moment'

export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      formFeedback: this.$form.createForm(this),
    }
  },
  computed: {
    ...mapState(['tugas']),
    ...mapState(['user']),
    showStartAt() {
      return this.tugas.dataEdit.status !== 'TODO'
    },
    showEndAt() {
      return this.tugas.dataEdit.status === 'DONE'
    },
  },
  beforeCreate() {
    const id = this.$route.query.id
    if (!id) {
      router.push('/tugas')
    }
    this.$store.dispatch('tugas/LOAD_DATA_PROGRAMMER', { payload: false })
    this.$store.dispatch('tugas/LOAD_DATA_EDIT_TUGAS', { payload: { id } })
    this.$store.dispatch('tugas/LOAD_DATA_FEEDBACK', { payload: { id } })
  },
  methods: {
    saveTaskHandler(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        const id = this.$route.query.id
        if (!err) {
          this.$store.dispatch('tugas/EDIT_TUGAS', { payload: { id, data: values } })
        }
      })
    },
    saveFeedbackHandler(e) {
      e.preventDefault()
      this.formFeedback.validateFields((err, values) => {
        const id = this.$route.query.id
        if (!err) {
          this.$store.dispatch('tugas/CREATE_FEEDBACK', { payload: { data: { task_id: +id, ...values } } })
          this.formFeedback.resetFields()
        }
      })
    },
    handleStatusChange(v) {
      this.showStartAt = v !== 'TODO'
      this.showEndAt = v === 'DONE'
    },
    confirm() {
      const id = this.$route.query.id
      this.$store.dispatch('tugas/DELETE_TUGAS', { payload: { id } })
    },
    moment(props) {
      return moment(props).format('DD MMM YYYY')
    },
  },
}
</script>
