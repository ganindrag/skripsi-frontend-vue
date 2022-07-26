<template>
  <div :class="{air__layout__grayBackground: settings.isGrayBackground}">
    <a-layout
      :class="{
      air__layout__contentMaxWidth: settings.isContentMaxWidth,
      air__layout__appMaxWidth: settings.isAppMaxWidth,
      air__layout__grayBackground: settings.isGrayBackground,
      air__layout__squaredBorders: settings.isSquaredBorders,
      air__layout__cardsShadow: settings.isCardShadow,
      air__layout__borderless: settings.isBorderless,
    }"
    >
      <a-layout>
        <a-layout-header
          class="air__layout__header"
          :class="{
          air__layout__fixedHeader: settings.isTopbarFixed,
          air__layout__headerGray: settings.isGrayTopbar,
        }"
        >
          <air-topbar-dark />
        </a-layout-header>
        <a-layout-content>
          <div class="air__utils__content card pt-4 mt-4">
            <transition :name="settings.routerAnimation" mode="out-in">
              <router-view />
            </transition>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AirTopbarDark from '@/components/TopBarDark'

export default {
  name: 'MainLayout',
  computed: mapState(['settings']),
  components: { AirTopbarDark },
  mounted() {
    this.detectViewPort(true)
    window.addEventListener('resize', this.detectViewPortListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.detectViewPortListener)
  },
  methods: {
    detectViewPortListener: function () {
      this.detectViewPort(false)
    },
    setViewPort: function (isMobileView = false, isTabletView = false) {
      this.$store.commit('CHANGE_SETTING', { setting: 'isMobileView', value: isMobileView })
      this.$store.commit('CHANGE_SETTING', { setting: 'isTabletView', value: isTabletView })
    },
    detectViewPort: function (firstLoad = false) {
      const isMobile = this.settings.isMobileView
      const isTablet = this.settings.isTabletView
      const width = window.innerWidth
      const state = {
        next: {
          mobile: width < 768,
          tablet: width < 992,
          desktop: !(width < 768) && !(width < 992),
        },
        prev: {
          mobile: isMobile,
          tablet: isTablet,
          desktop: !(isMobile) && !(isTablet),
        },
      }
      // desktop
      if (state.next.desktop && ((state.next.desktop !== state.prev.desktop) || firstLoad)) {
        this.setViewPort(false, false)
      }
      // tablet & collapse menu
      if (state.next.tablet && !state.next.mobile && ((state.next.tablet !== state.prev.tablet) || firstLoad)) {
        this.setViewPort(false, true)
        this.$store.commit('CHANGE_SETTING', { setting: 'isMenuCollapsed', value: true })
      }
      // mobile
      if (state.next.mobile && ((state.next.mobile !== state.prev.mobile) || firstLoad)) {
        this.setViewPort(true, false)
      }
    },
  },
}
</script>
