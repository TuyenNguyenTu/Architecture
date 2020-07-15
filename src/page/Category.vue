<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Category Records</h1>
    <br />
    <hr />
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Modify Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td>{{ record.id }}</td>
              <td>{{ record.name }}</td>
              <td>{{ record.description }}</td>
              <td>{{ format_date(record.createdDate) }}</td>
              <td>
                {{
                record.modifiedDate == null
                ? "Chưa sửa lần nào"
                : format_date(record.modifiedDate)
                }}
              </td>
              <td>{{ record.status == true ? "Active" : "Block" }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="updateRecord(record)">Edit</a> -
                <a href="#" @click.prevent="deleteRecord(record.id)">Delete</a>
                -
                <router-link :to="{ name: 'CategoryDetail', params: { id: record.id } }">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="model.id ? 'Edit with ID#' + model.id : 'New Record'">
          <form @submit.prevent="createNewRecord">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-input rows="4" v-model="model.description" type="text"></b-form-input>
            </b-form-group>
            <b-form-group label="Parent">
              <b-select v-model="model.parentId" @change="getSelectedItem">
                <option :value="null" disabled>-- Select value --</option>
                <option
                  v-for="record in records"
                  :key="record.id"
                  :value="record.id"
                >{{record.name}}</option>
              </b-select>
            </b-form-group>

            <div>
              <b-btn type="submit" variant="success">Save Record</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import api from "../service/CategoryService";
export default {
  data() {
    return {
      loading: false,
      records: [],
      model: {},
      recordsParent: [],
      parent: {},
      modelUpdate: {}
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.loading = true;
      try {
        this.records = await api.getAll();
      } finally {
        this.loading = false;
      }
    },
    async updateRecord(record) {
      this.model = Object.assign({}, record);
      this.modelUpdate = await api.getById(this.model.id);
    },
    async createNewRecord() {
      const isUpdate = !!this.model.id;
      if (isUpdate) {
        if (this.model.parentId != null) {
          await api.update(this.model);
        } else {
          this.model.parentId = this.modelUpdate.parentId;
          await api.update(this.model);
        }
      } else {
        console.log(this.model);
      }
      this.model = {};
      await this.getAll();
    },
    async deleteRecord(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        // if we are editing a food record we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }

        await api.delete(id);
        await this.getAll();
      }
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("yyyy-MM-DD");
      }
    },
    getSelectedItem(value) {
      if (value) {
        console.log(value);
        this.model.parentId = value;
      }
    }
  }
};
</script>

<style></style>
