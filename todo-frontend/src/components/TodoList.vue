<script setup lang="ts">
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem.vue';

const props = defineProps<{
  todos: Todo[];
}>();

const emits = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div>
    <p v-if="!todos.length" class="empty-text">
      No todos yet. Add one
    </p>

    <ul v-else class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emits('toggle', $event)"
        @delete="emits('delete', $event)"
      />
    </ul>
  </div>
</template>

<style scoped>
.empty-text {
  color: #6b7280;
  font-size: 14px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
