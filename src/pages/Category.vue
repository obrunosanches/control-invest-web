<template>
  <BaseTable className="w-full text-sm text-left text-gray-400" striped>
    <BaseTableHead className="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Product name</BaseTableHeadCell>
      <BaseTableHeadCell>Color</BaseTableHeadCell>
      <BaseTableHeadCell>Category</BaseTableHeadCell>
      <BaseTableHeadCell>Price</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">Edit</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow>
        <BaseTableCell>
          Fjallraven - Foldsack No. 1
        </BaseTableCell>
        <BaseTableCell>Spacial gray</BaseTableCell>
        <BaseTableCell>Backpack</BaseTableCell>
        <BaseTableCell>$109.95</BaseTableCell>
        <BaseTableCell>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          <span class="px-2 text-gray-300">|</span>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
        </BaseTableCell>
      </BaseTableRow>
      <BaseTableRow>
        <BaseTableCell>
          Mens Casual Premium Slim
        </BaseTableCell>
        <BaseTableCell>Black</BaseTableCell>
        <BaseTableCell>T-Shirts</BaseTableCell>
        <BaseTableCell>$22.3</BaseTableCell>
        <BaseTableCell>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          <span class="px-2 text-gray-300">|</span>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
        </BaseTableCell>
      </BaseTableRow>
      <BaseTableRow>
        <BaseTableCell>
          Mens Cotton Jacket"
        </BaseTableCell>
        <BaseTableCell>Brow</BaseTableCell>
        <BaseTableCell>Jacket</BaseTableCell>
        <BaseTableCell>$55.9</BaseTableCell>
        <BaseTableCell>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          <span class="px-2 text-gray-300">|</span>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable from '../components/Table/BaseTable.vue';
import BaseTableHead from '../components/Table/BaseTable.Head.vue';
import BaseTableHeadCell from '../components/Table/BaseTable.HeadCell.vue';
import BaseTableBody from '../components/Table/BaseTable.Body.vue';
import BaseTableRow from '../components/Table/BaseTable.Row.vue';
import BaseTableCell from '../components/Table/BaseTable.Cell.vue';
</script>
