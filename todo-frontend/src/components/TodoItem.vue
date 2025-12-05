<script setup lang="ts">
import type { Todo } from '../types/todo';

const props = defineProps<{
  todo: Todo;
}>();

const emits = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'delete', id: string): void;
}>();

const onToggle = () => emits('toggle', props.todo.id);
const onDelete = () => emits('delete', props.todo.id);
</script>

<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.isCompleted"
      @change="onToggle"
      class="todo-checkbox"
    />

    <span
      class="todo-title"
      :class="{ completed: todo.isCompleted }"
    >
      {{ todo.title }}
    </span>

    <button class="delete-button" @click="onDelete">
      Delete
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.todo-checkbox {
  margin-right: 8px;
}

.todo-title {
  flex: 1;
  font-size: 14px;
  color: #111827;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete-button {
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  background-color: #ef4444;
  color: white;
  font-size: 12px;
  cursor: pointer;
}
</style>
