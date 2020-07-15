<template>
  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <router-link
      class="dropdown-item"
      to="/category"
      v-for="item in childrenCategory"
      :key="item.id"
      >{{ item.name }}</router-link
    >
  </div>
</template>

<script>
import api from "../service/CategoryService";
export default {
  data() {
    return {
      childrenCategory: [],
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.childrenCategory = await api.getChildrenCategory(this.idParent);
    },
  },
  props: ["idParent"],
};
</script>

<style></style>
