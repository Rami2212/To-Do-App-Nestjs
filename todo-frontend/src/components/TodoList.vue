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
  <div class="list-wrapper">
    <p v-if="!todos.length" class="empty-text">
      <span class="empty-icon">📋</span>
      <span>No tasks yet. Add one to get started!</span>
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
.list-wrapper {
  padding: 1.5rem;
}

.empty-text {
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .list-wrapper {
    padding: 1rem;
  }

  .empty-text {
    padding: 2rem 1rem;
    font-size: 0.95rem;
  }
}
</style>