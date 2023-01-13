<script setup lang="ts">
import Layout from './components/BaseLayout.vue';
import Table from './components/Table/BaseTable.vue';
import TableHead from './components/Table/BaseTable.Head.vue';
import TableHeadCell from './components/Table/BaseTable.HeadCell.vue';
import TableBoby from './components/Table/BaseTable.Body.vue';
import TableRow from './components/Table/BaseTable.Row.vue';
import TableCell from './components/Table/BaseTable.Cell.vue';
</script>

<template>
  <Layout className="h-screen bg-gray-800">
    <Table className="w-full text-sm text-left text-gray-400" striped>
      <TableHead className="text-xs text-gray-400 uppercase bg-gray-700">
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Color</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell><span class="sr-only">Edit</span></TableHeadCell>
      </TableHead>
      <TableBoby>
        <TableRow>
          <TableCell>
            Fjallraven - Foldsack No. 1
          </TableCell>
          <TableCell>Spacial gray</TableCell>
          <TableCell>Backpack</TableCell>
          <TableCell>$109.95</TableCell>
          <TableCell>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <span class="px-2 text-gray-300">|</span>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Mens Casual Premium Slim 
          </TableCell>
          <TableCell>Black</TableCell>
          <TableCell>T-Shirts</TableCell>
          <TableCell>$22.3</TableCell>
          <TableCell>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <span class="px-2 text-gray-300">|</span>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Mens Cotton Jacket"
          </TableCell>
          <TableCell>Brow</TableCell>
          <TableCell>Jacket</TableCell>
          <TableCell>$55.9</TableCell>
          <TableCell>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <span class="px-2 text-gray-300">|</span>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
          </TableCell>
        </TableRow>
      </TableBoby>
    </Table>
  </Layout>
</template>

<style scoped>

</style>
