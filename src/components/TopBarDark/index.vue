<template>
  <div :class="$style.topbarDark">
    <div class="col">
      <router-link to="/tugas" class="px-3">
        Tugas
      </router-link>
      <router-link to="/programmer" class="px-3" v-show="user.role === 'ADMIN'">
        Programmer
      </router-link>
      <router-link to="/laporan" class="px-3" v-show="user.role === 'ADMIN'">
        Laporan
      </router-link>
      <router-link to="/evaluasi" class="px-3" v-show="user.role === 'ADMIN'">
        Evaluasi
      </router-link>
    </div>
    <div class="ml-auto">
      <air-user-menu />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AirUserMenu from './UserMenu'

export default {
  components: {
    AirUserMenu,
  },
  computed: {
    ...mapState(['settings']),
    ...mapState(['user']),
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
