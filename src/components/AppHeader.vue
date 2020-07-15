<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="btn "> Home</router-link>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" v-for="item in recordsParent" :key="item.id">
          <li class="nav-item" v-if="item.parentId == null ? false : true">
            <router-link class="nav-link" to="/category">{{
              item.name
            }}</router-link>
          </li>

          <li class="nav-item dropdown" v-else>
            <router-link
              class="nav-link dropdown-toggle"
              to="/category"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ item.name }}
            </router-link>
            <MiniDropdown :idParent="item.id"></MiniDropdown>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import api from "../service/CategoryService";
import MiniDropdown from "./MiniDropdown";
export default {
  components: {
    MiniDropdown,
  },
  data() {
    return {
      recordsParent: [],
    };
  },
  methods: {
    async getAll() {
      this.recordsParent = await api.getListParent();
    },
  },
  async created() {
    this.getAll();
  },
};
</script>

<style></style>
