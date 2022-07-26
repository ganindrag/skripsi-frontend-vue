<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Buat Data Tugas</h5>
    </div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="Detail">
          <div class="row">
            <div class="col-md-4">
              <a-form-item label="Nama Tugas">
                <a-input v-decorator="['name', {rules: [{ required: true, message: 'Nama tugas harus diisi'}]}]" />
              </a-form-item>
            </div>
            <div class="col-md-4">
              <a-form-item label="Bobot Tugas (dalam hari)">
                <a-input-number v-decorator="['weight', {}]" class="w-100" :disabled="user.role === 'USER'" />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <a-form-item label="Keterangan Tugas">
                <a-textarea v-decorator="['detail', {}]" />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <a-form-item label="Ditugaskan ke">
                <a-select v-decorator="['programmer_id', {}]">
                  <a-select-option v-for="(item) in tugas.dataProgrammer" :key="item.id+item.name" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <a-form-item label="Status Tugas">
                <a-select v-decorator="['status', { initialValue: 'TODO' }]" @change="handleStatusChange">
                  <a-select-option value="TODO">ToDo</a-select-option>
                  <a-select-option value="DOING">Doing</a-select-option>
                  <a-select-option value="DONE">Done</a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="row" v-if="showStartAt">
            <div class="col-md-3">
              <a-form-item label="Tanggal Mulai">
                <a-date-picker style="width: 100%" v-decorator="['start_at', {rules: [{ required: showStartAt, message: 'Tanggal harus diisi'}]}]" />
              </a-form-item>
            </div>
          </div>
          <div class="row" v-if="showEndAt">
            <div class="col-md-3">
              <a-form-item label="Tanggal Selesai">
                <a-date-picker style="width: 100%" v-decorator="['end_at', {rules: [{ required: showStartAt, message: 'Tanggal harus diisi' }]}]" />
              </a-form-item>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Feedback">
          <div class="row">
            <div class="col-md-6">
              <a-form-item label="Feedback">
                <a-textarea v-decorator="['feedback', {}]" />
              </a-form-item>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <a-button type="primary" htmlType="submit">Simpan</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      showStartAt: false,
      showEndAt: false,
    }
  },
  computed: {
    ...mapState(['tugas']),
    ...mapState(['user']),
  },
  beforeCreate() {
    this.$store.dispatch('tugas/LOAD_DATA_PROGRAMMER', { payload: false })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, { feedback, ...values }) => {
        if (!err) {
          this.$store.dispatch('tugas/CREATE_TUGAS', { payload: { data: values, feedback } })
        }
      })
    },
    handleStatusChange(v) {
      this.showStartAt = v !== 'TODO'
      this.showEndAt = v === 'DONE'
    },
  },
}
</script>
