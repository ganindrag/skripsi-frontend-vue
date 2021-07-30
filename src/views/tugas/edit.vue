<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Ubah Data Tugas</h5>
    </div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <div class="row">
        <div class="col-md-4 order-md-last text-right">
          <a-popconfirm
            title="Yakin mau hapus data tugas ini?"
            @confirm="confirm"
            okText="Ya"
            cancelText="Tidak"
          >
            <a-button type="danger" htmlType="button">Hapus Data</a-button>
          </a-popconfirm>
        </div>
        <div class="col-md-4">
          <a-form-item label="Nama Tugas">
            <a-input v-decorator="['name', {initialValue: tugas.dataEdit.name, rules: [{ required: true, message: 'Nama tugas harus diisi'}]}]" />
          </a-form-item>
        </div>
        <div class="col-md-4">
          <a-form-item label="Bobot Tugas (dalam hari)">
            <a-input-number v-decorator="['weight', {initialValue: tugas.dataEdit.weight}]" class="w-100" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <a-form-item label="Keterangan Tugas">
            <a-textarea v-decorator="['detail', {initialValue: tugas.dataEdit.detail}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <a-form-item label="Ditugaskan ke">
            <a-select v-decorator="['programmer_id', {initialValue: tugas.dataEdit.programmer_id}]">
              <a-select-option v-for="(item) in tugas.dataProgrammer" :key="item.id+item.name" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <a-form-item label="Status Tugas">
            <a-select v-decorator="['status', { initialValue: tugas.dataEdit.status }]" @change="handleStatusChange">
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
            <a-date-picker style="width: 100%" v-decorator="['start_at', {initialValue: tugas.dataEdit.start_at, rules: [{ required: showStartAt, message: 'Tanggal harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row" v-if="showEndAt">
        <div class="col-md-3">
          <a-form-item label="Tanggal Selesai">
            <a-date-picker style="width: 100%" v-decorator="['end_at', {initialValue: tugas.dataEdit.end_at, rules: [{ required: showStartAt, message: 'Tanggal harus diisi' }]}]" />
          </a-form-item>
        </div>
      </div>
      <a-form-item>
        <a-button type="primary" htmlType="submit">Simpan</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import router from '@/router'

export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  computed: {
    ...mapState(['tugas']),
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
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        const id = this.$route.query.id
        if (!err) {
          this.$store.dispatch('tugas/EDIT_TUGAS', { payload: { id, data: values } })
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
  },
}
</script>
