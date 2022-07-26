<template>
  <div>
    <div class="kit__utils__heading">
      <h5>Data Tugas</h5>
    </div>
    <div class="text-center mb-3">
      <router-link to="/tugas/buat" class="ant-btn ant-btn-primary">
        Tambah Data
      </router-link>
    </div>
    <div class="row">
      <div class="col">
        <div class="card border-warning">
          <div class="card-header text-center bg-warning">
            <h4 class="text-light">ToDo</h4>
          </div>
          <Container class="card-body p-3" style="min-height: 65vh !important" @drop="(e) => applyDrag('tugas_todo', e)" group-name="tugas" :get-child-payload="getCardPayload('tugas_todo')">
            <Draggable class="border p-3 mb-3 bg-white" v-for="task in tugas.tugas_todo" :key="task.id">
              <h5 style="cursor: pointer" @click="redirect({ path: user.role === 'USER' ? '/tugas/lihat' : '/tugas/ubah', query: { id: task.id } })">{{ task.name }}</h5>
              {{task.start_at && 'Start: '+formatDate(task.start_at)}}
              <span class="float-right">{{task.programmer_name}}</span>
            </Draggable>
          </Container>
        </div>
      </div>
      <div class="col">
        <div class="card border-primary">
          <div class="card-header text-center bg-primary">
            <h4 class="text-light">Doing</h4>
          </div>
          <Container class="card-body p-3" style="min-height: 65vh !important" @drop="(e) => applyDrag('tugas_doing', e)" group-name="tugas" :get-child-payload="getCardPayload('tugas_doing')">
            <Draggable class="border p-3 mb-3 bg-white" v-for="task in tugas.tugas_doing" :key="task.id">
              <h5 style="cursor: pointer" @click="redirect({ path: user.role === 'USER' ? '/tugas/lihat' : '/tugas/ubah', query: { id: task.id } })">{{ task.name }}</h5>
              {{task.start_at && 'Start: '+formatDate(task.start_at)}}
              <span class="float-right">{{task.programmer_name}}</span>
            </Draggable>
          </Container>
        </div>
      </div>
      <div class="col">
        <div class="card border-success">
          <div class="card-header text-center bg-success">
            <h4 class="text-light">Done</h4>
          </div>
          <Container class="card-body p-3" style="min-height: 65vh !important" @drop="(e) => applyDrag('tugas_done', e)" group-name="tugas" :get-child-payload="getCardPayload('tugas_done')">
            <Draggable class="border p-3 mb-3 bg-white" v-for="task in tugas.tugas_done" :key="task.id">
              <h5 style="cursor: pointer" @click="redirect({ path: user.role === 'USER' ? '/tugas/lihat' : '/tugas/ubah', query: { id: task.id } })">{{ task.name }}</h5>
              {{task.start_at && 'End: '+formatDate(task.end_at)}} <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" title="sudah dinilai" v-show="task.is_evaluated" />
              <span class="float-right">{{task.programmer_name}}</span>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import moment from 'moment'
import router from '@/router'

export default {
  components: { Container, Draggable },
  beforeCreate() {
    this.$store.dispatch('tugas/LOAD_DATA_TUGAS', { payload: false })
  },
  computed: {
    ...mapState(['user']),
    tugas() {
      return this.$store.state.tugas
    },
  },
  methods: {
    applyDrag (status, dragResult) {
      this.$store.dispatch('tugas/APPLY_DRAG', { payload: { status, dragResult } })
    },
    log (...params) {
      console.log(...params)
    },
    getCardPayload (status) {
      return index => {
        return this.tugas[status][index]
      }
    },
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    redirect(...params) {
      router.push(...params)
    },
  },
  // applyDrag (arr, dragResult) {
  //   const { removedIndex, addedIndex, payload } = dragResult
  //   if (removedIndex === null && addedIndex === null) return arr

  //   const result = [...arr]
  //   let itemToAdd = payload

  //   if (removedIndex !== null) {
  //   }

  //   if (addedIndex !== null) {
  //     result.splice(addedIndex, 0, itemToAdd) // add
  //   }

  //   return result
  // },
  // onCardDrop (columnId, dropResult) {
  //   if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
  //     const scene = Object.assign({}, this.scene) // duplikat data
  //     const column = scene.children.filter(p => p.id === columnId)[0] // get data kolom
  //     const columnIndex = scene.children.indexOf(column) // get kolom ke berapa
  //     const newColumn = Object.assign({}, column) // duplikat kolom
  //     newColumn.children = applyDrag(newColumn.children, dropResult) // buat kolom baru dengan tambahan data baru
  //     scene.children.splice(columnIndex, 1, newColumn) // hapus data yg di pindah dari kolom lama
  //     this.scene = scene // apply
  //   }
  // },
  // getTodoPayload () {
  //   return index => {
  //     return this.scene.children.filter(p => p.id === columnId)[0].children[index]
  //   }
  // },
}
</script>
