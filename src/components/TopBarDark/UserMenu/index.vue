<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft" @visibleChange="addCount">
    <div :class="$style.dropdown">
      <a-avatar shape="square" icon="user" size="large" :class="$style.avatar+ ' mr-2'" /> {{ user.email }}
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript: void(0);" @click="logout">
          <i :class="$style.menuIcon" class="fe fe-log-out"></i>
          {{ $t('topBar.profileMenu.logout') }}
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      count: 7,
    }
  },
  methods: {
    addCount() {
      this.count++
    },
    logout() {
      this.$store.dispatch('user/LOGOUT')
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
