<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: 'add', title: string): void;
}>();

const title = ref('');

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const value = title.value.trim();
  if (!value) return;
  emits('add', value);
  title.value = '';
};
</script>

<template>
    <form @submit="handleSubmit" class="todo-form">
        <input
          v-model="title"
          type="text"
          placeholder="Add a new todo"
          :disabled="loading"
          class="todo-input"
        />
        <button type="submit" :disabled="loading" class="todo-button">
          {{ loading ? 'Adding...' : 'Add Todo' }}
        </button>
    </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.todo-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.todo-input:disabled {
  background-color: #f9fafb;
}

.todo-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #2563eb;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.todo-button:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>