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
    <button
      class="todo-checkbox"
      :class="{ 'is-completed': todo.isCompleted }"
      @click="onToggle"
      :aria-label="`Toggle ${todo.title}`"
    >
      <span v-if="todo.isCompleted" class="checkbox-icon">✓</span>
    </button>

    <span
      class="todo-title"
      :class="{ completed: todo.isCompleted }"
    >
      {{ todo.title }}
    </span>

    <button class="delete-button" @click="onDelete" aria-label="Delete task">
      Delete
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  gap: 0.75rem;
  background-color: #ffffff;
}

.todo-item:hover {
  background-color: #f9fafb;
  border-color: #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.todo-checkbox {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 0.875rem;
  color: white;
  font-weight: 600;
}

.todo-checkbox:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.todo-checkbox:active {
  transform: scale(0.95);
}

.todo-checkbox.is-completed {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
}

.todo-checkbox.is-completed:hover {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.checkbox-icon {
  display: inline-block;
}

.todo-title {
  flex: 1;
  font-size: 0.95rem;
  color: #1f2937;
  transition: all 0.2s ease;
  word-break: break-word;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete-button {
  flex-shrink: 0;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 1;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2);
}

.delete-button:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
  transform: translateY(-1px);
}

.delete-button:active {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2);
}

.delete-icon {
  display: inline-block;
}

@media (max-width: 640px) {
  .todo-item {
    padding: 0.875rem 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  .delete-button {
    padding: 0.5rem 0.65rem;
  }

  .todo-title {
    font-size: 0.9rem;
  }

  .todo-checkbox {
    width: 1.375rem;
    height: 1.375rem;
  }
}
</style>