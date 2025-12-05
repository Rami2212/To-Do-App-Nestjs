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
    <div class="form-wrapper">
        <div class="todo-form">
            <input
              v-model="title"
              type="text"
              placeholder="Add a new task..."
              :disabled="loading"
              class="todo-input"
              @keydown.enter="handleSubmit"
            />
            <button type="button" :disabled="loading" class="todo-button" @click="handleSubmit">
              <span class="button-text">
                {{ loading ? 'Adding...' : 'Add' }}
              </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.form-wrapper {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%);
}

.todo-form {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #e2e8f0;
  font-size: 0.95rem;
  color: #1f2937;
  background-color: white;
  transition: all 0.2s ease;
  font-family: inherit;
}

.todo-input::placeholder {
  color: #9ca3af;
}

.todo-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.todo-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}

.todo-button {
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.todo-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.todo-button:active:not(:disabled) {
  transform: translateY(0);
}

.todo-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-icon {
  font-size: 1rem;
  display: inline-block;
}

.button-text {
  display: none;
}

@media (min-width: 640px) {
  .button-text {
    display: inline;
  }
}

@media (max-width: 640px) {
  .form-wrapper {
    padding: 1rem;
  }

  .todo-form {
    gap: 0.5rem;
  }

  .todo-input {
    padding: 0.65rem 0.875rem;
    font-size: 0.9rem;
  }

  .todo-button {
    padding: 0.65rem 0.875rem;
    font-size: 0.9rem;
  }
}
</style>