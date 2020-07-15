<template>
  <div>
    <div class="row mt-5">
      <div class="col-8">
        <h1>{{ model.name }}</h1>
        <h3>{{ model.description }}</h3>
        Ngày khởi tạo:
        {{ format_date(model.createdDate) }}
        <br />
        Ngày sửa gần nhất:
        {{
          format_date(model.modifiedDate) == null
            ? "Chưa được sửa lần nào"
            : format_date(model.modifiedDate)
        }}
        <p class="mt-4">
          Category Parent:
          {{ modelParent.name == null ? message : modelParent.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api from "../service/CategoryService";
export default {
  name: "category-detail",
  props: ["id"],
  async created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.model = await api.getById(this.id);
      if (this.model.parentId !== null) {
        this.modelParent = await api.getById(this.model.parentId);
        console.log(this.modelParent);
      } else {
        this.message = "Root Category";
      }
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("yyyy-MM-DD");
      }
    },
  },
  data() {
    return {
      model: {},
      modelParent: {},
      message: "",
    };
  },
};
</script>

<style></style>
