import Vue from "vue";
import Router from "vue-router";
import AuthLayout from "@/layouts/Auth";
import MainLayout from "@/layouts/Main";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  base: "skripsi",
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "tugas",
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        // Dashboards
        {
          path: "/tugas",
          meta: {
            title: "List Tugas",
          },
          component: () => import("./views/tugas"),
        },
        {
          path: "/tugas/buat",
          meta: {
            title: "Buat Data Tugas",
          },
          component: () => import("./views/tugas/create"),
        },
        {
          path: "/tugas/ubah",
          meta: {
            title: "Ubah Data Tugas",
          },
          component: () => import("./views/tugas/edit"),
        },
        {
          path: "/tugas/lihat",
          meta: {
            title: "Lihat Data Tugas",
          },
          component: () => import("./views/tugas/view"),
        },
        {
          path: "/programmer",
          meta: {
            title: "List Tugas",
          },
          component: () => import("./views/programmer"),
        },
        {
          path: "/programmer/buat",
          meta: {
            title: "Buat Data Programmer",
          },
          component: () => import("./views/programmer/create"),
        },
        {
          path: "/programmer/ubah",
          meta: {
            title: "Ubah Data Programmer",
          },
          component: () => import("./views/programmer/edit"),
        },
        {
          path: "/laporan",
          meta: {
            title: "Laporan Programmer",
          },
          component: () => import("./views/laporan"),
        },
        {
          path: "/laporanuser",
          meta: {
            title: "Laporan Programmer",
          },
          component: () => import("./views/laporan/user"),
        },
        {
          path: "/evaluasi",
          meta: {
            title: "Evaluasi Tugas",
          },
          component: () => import("./views/evaluasi"),
        },
      ],
    },

    // System Pages
    {
      path: "/auth",
      component: AuthLayout,
      redirect: "auth/login",
      children: [
        {
          path: "/auth/404",
          meta: {
            title: "Error 404",
          },
          component: () => import("./views/auth/404"),
        },
        {
          path: "/auth/500",
          meta: {
            title: "Error 500",
          },
          component: () => import("./views/auth/500"),
        },
        {
          path: "/auth/login",
          meta: {
            title: "Sign In",
          },
          component: () => import("./views/auth/login"),
        },
      ],
    },

    // Redirect to 404
    {
      path: "*",
      redirect: "auth/404",
      hidden: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (!store.state.user.authorized) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
