<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Buat Data Programmer</h5>
    </div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Nama Programmer">
            <a-input v-decorator="['name', {initialValue: programmer.dataEdit.name, rules: [{ required: true, message: 'Nama Programmer harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Email Programmer">
            <a-input v-decorator="['email', {initialValue: programmer.dataEdit.email, rules: [{ required: true, message: 'Email Programmer harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Password">
            <a-input-password v-decorator="['password', {rules: [{ initialValue: programmer.dataEdit.password }]}]" />
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
  computed: mapState(['programmer']),
  beforeCreate() {
    const id = this.$route.query.id
    if (!id) {
      router.push('/programmer')
    }
    this.$store.dispatch('programmer/LOAD_DATA_EDIT_PROGRAMMER', { payload: { id } })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const id = this.$route.query.id
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('programmer/EDIT_PROGRAMMER', { payload: { id, data: values } })
        }
      })
    },
  },
}
</script>
