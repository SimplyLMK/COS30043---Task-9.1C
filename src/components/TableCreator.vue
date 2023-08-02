<template>
  <div>
    <!-- <button @click="createTableData">Create Table</button> -->
    <button @click="toggle">View Table</button>
    <div v-if="show">
      <h2>Table Data:</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>CP</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <td>{{ item.code }}</td>
            <td>{{ item.desc }}</td>
            <td>{{ item.cp }}</td>
            <td>{{ item.type }}</td>
            <td>
              <button @click="deleteRecord(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <form @submit.prevent="insertRecord">
      <label for="code">Code:</label>
      <input type="text" id="code" v-model="newRecord.code" required>
      <label for="desc">Description:</label>
      <input type="text" id="desc" v-model="newRecord.desc" required>
      <label for="cp">CP:</label>
      <input type="text" id="cp" v-model="newRecord.cp" required>
      <label for="type">Type:</label>
      <input type="text" id="type" v-model="newRecord.type" required>
      <button type="submit">Insert Record</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import createTable from '@/composables/createTable';
import get_documents from '@/composables/get_documents';
import { watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

export default defineComponent({
  setup() {
    let show = ref(false);
    const tableData = ref([]);
    const itemsPerPage = 10;
    const currentPage = ref(1);
    const totalPages = ref(1);
    const newRecord = ref({
      code: '',
      desc: '',
      cp: '',
      type: '',
    });

    const createTableData = async () => {
      const jsonData = [
       {"code":"ICT10001", "desc":"Problem Solving with ICT", "cp":12.5, "type":"Core"},
{"code":"COS10005", "desc":"Web Development", "cp":12.5, "type":"Core"},
{"code":"INF10003", "desc":"Introduction to Business Information Systems", "cp":12.5, "type":"Core"},
{"code":"INF10002", "desc":"Database Analysis and Design", "cp":12.5, "type":"Core"},
{"code":"COS10009", "desc":"Introduction to Programming", "cp":12.5, "type":"Core"},
{"code":"INF30029", "desc":"Information Technology Project Management", "cp":12.5, "type":"Core"},
{"code":"ICT30005", "desc":"Professional Issues in Information Technology", "cp":12.5, "type":"Core"},
{"code":"ICT30001", "desc":"Information Technology Project", "cp":12.5, "type":"Core"},
{"code":"COS20001", "desc":"User-Centred Design", "cp":12.5, "type":"Software Development"},
{"code":"TNE10005", "desc":"Network Administration", "cp":12.5, "type":"Software Development"},
{"code":"COS20016", "desc":"Operating System Configuration", "cp":12.5, "type":"Software Development"},
{"code":"SWE20001", "desc":"Development Project 1 - Tools and Practices", "cp":12.5, "type":"Software Development"},
{"code":"COS20007", "desc":"Object Oriented Programming", "cp":12.5, "type":"Software Development"},
{"code":"COS30015", "desc":"IT Security", "cp":12.5, "type":"Software Development"},
{"code":"COS30043", "desc":"Interface Design and Development", "cp":12.5, "type":"Software Development"},
{"code":"COS30017", "desc":"Software Development for Mobile Devices", "cp":12.5, "type":"Software Development"},
{"code":"INF20012", "desc":"Enterprise Systems", "cp":12.5, "type":"Systems Analysis"},
{"code":"ACC10007", "desc":"Financial Information for Decision Making", "cp":12.5, "type":"Systems Analysis"},
{"code":"INF20003", "desc":"Requirements Analysis and Modelling", "cp":12.5, "type":"Systems Analysis"},
{"code":"ACC20014", "desc":"Management Decision Making", "cp":12.5, "type":"Systems Analysis"},
{"code":"INF30005", "desc":"Business Process Management", "cp":12.5, "type":"Systems Analysis"},
{"code":"INF30003", "desc":"Business Information Systems Analysis", "cp":12.5, "type":"Systems Analysis"},
{"code":"INF30020", "desc":"Information Systems Risk and Security", "cp":12.5, "type":"Systems Analysis"},
{"code":"INF30001", "desc":"Systems Acquisition & Implementation Management", "cp":12.5, "type":"Systems Analysis"}
      ];

      await createTable('table', jsonData);
      console.log('Table created successfully.');
    };

    const { error, documents } = get_documents('table');

    const viewTableData = () => {
      show.value = true;
    };

    const toggle = () => {
      show.value = !show.value;
    };

    const insertRecord = async () => {
      try {
        await projectFirestore.collection('table').add(newRecord.value);
        console.log('Record inserted successfully.');
        newRecord.value = { code: '', desc: '', cp: '', type: '' };
      } catch (error) {
        console.error('Error inserting record:', error);
      }
    };

    const deleteRecord = async (recordId) => {
      try {
        await projectFirestore.collection('table').doc(recordId).delete();
        console.log('Record deleted successfully.');
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    };

    const calculateTotalPages = () => {
      totalPages.value = Math.ceil(tableData.value.length / itemsPerPage);
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return tableData.value.slice(startIndex, endIndex);
    });

    watchEffect(() => {
      if (documents.value.length > 0) {
        tableData.value = documents.value;
        calculateTotalPages();
      }
    });

    return {
      tableData: paginatedData,
      createTableData,
      show,
      insertRecord,
      deleteRecord,
      error,
      currentPage,
      totalPages,
      goToPage,
      newRecord,
      toggle,
    };
  },
});
</script>

<style>

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
