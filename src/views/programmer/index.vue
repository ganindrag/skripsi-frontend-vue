<template>
  <div>
    <div class="kit__utils__heading">
      <h5>List Data Programmer</h5>
    </div>
    <div class="text-right mb-3">
      <router-link to="/programmer/buat" class="ant-btn ant-btn-primary">
        Tambah Data
      </router-link>
    </div>
    <a-table :columns="columns" :dataSource="programmer" :rowKey="record => record.id">
      <span slot="action" slot-scope="text, record">
        <a @click="redirect({ path: '/programmer/ubah', query: { id: record.id } })">Ubah</a>
        <a-divider type="vertical" />
        <a @click="confirm(record.id, 'Yakin mau hapus data ini?')">Hapus</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import router from '@/router'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Aksi',
  key: 'aksi',
  scopedSlots: { customRender: 'action' },
}]

export default {
  data() {
    return {
      columns,
    }
  },
  beforeCreate() {
    this.$store.dispatch('programmer/LOAD_DATA_PROGRAMMER', { payload: false })
  },
  computed: {
    programmer() {
      return this.$store.state.programmer.list
    },
  },
  methods: {
    log (...params) {
      console.log(...params)
    },
    redirect(...params) {
      router.push(...params)
    },
    confirm(id, text) {
      if (confirm(text)) {
        this.$store.dispatch('programmer/DELETE_DATA', { payload: { id } })
      }
    },
  },
}
</script>
