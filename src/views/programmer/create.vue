<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Buat Data Programmer</h5>
    </div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Nama Programmer">
            <a-input v-decorator="['name', {rules: [{ required: true, message: 'Nama Programmer harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Email Programmer">
            <a-input v-decorator="['email', {rules: [{ required: true, message: 'Email Programmer harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Password">
            <a-input-password v-decorator="['password', {rules: [{ required: true, message: 'Password harus diisi'}]}]" />
          </a-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <a-form-item label="Role Programmer">
            <a-select v-decorator="['role', { initialValue: 'USER' }]">
              <a-select-option value="MNGR">Manager</a-select-option>
              <a-select-option value="USER">User</a-select-option>
            </a-select>
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
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('programmer/CREATE_PROGRAMMER', { payload: { data: values } })
        }
      })
    },
  },
}
</script>
