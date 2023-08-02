<template>
  <div id="app">
    <TableCreator />
  </div>
</template>




<script>
import { defineComponent } from 'vue';
import TableCreator from '@/components/TableCreator.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    TableCreator,
   
  }
});
</script>