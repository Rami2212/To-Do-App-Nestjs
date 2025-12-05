<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Todo } from './types/todo';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import { getTodos, createTodo, toggleTodo, deleteTodo } from './api/todos';

const todos = ref<Todo[]>([]);
const loadingInitial = ref(true);
const loadingAdd = ref(false);
const error = ref<string | null>(null);

const loadTodos = async () => {
  try {
    loadingInitial.value = true;
    error.value = null;
    const data = await getTodos();
    todos.value = data;
  } catch (err: any) {
    error.value = err?.message ?? 'Failed to load todos';
  } finally {
    loadingInitial.value = false;
  }
};

onMounted(() => {
  loadTodos();
});

const handleAddTodo = async (title: string) => {
  try {
    loadingAdd.value = true;
    error.value = null;
    const newTodo = await createTodo(title);
    todos.value = [newTodo, ...todos.value];
  } catch (err: any) {
    error.value = err?.message ?? 'Failed to add todo';
  } finally {
    loadingAdd.value = false;
  }
};

const handleToggleTodo = async (id: string) => {
  try {
    error.value = null;
    const updated = await toggleTodo(id);
    todos.value = todos.value.map((t) =>
      t.id === updated.id ? updated : t,
    );
  } catch (err: any) {
    error.value = err?.message ?? 'Failed to toggle todo';
  }
};

const handleDeleteTodo = async (id: string) => {
  try {
    error.value = null;
    await deleteTodo(id);
    todos.value = todos.value.filter((t) => t.id !== id);
  } catch (err: any) {
    error.value = err?.message ?? 'Failed to delete todo';
  }
};

</script>

<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <h1 class="title">Todo List</h1>
      </div>

      <div class="card">
        <TodoForm :loading="loadingAdd" @add="handleAddTodo" />

        <div v-if="error" class="error-box">
          <span class="error-icon">⚠️</span>
          {{ error }}
        </div>

        <div v-if="loadingInitial" class="loading-state">
          <div class="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
        <div v-else>
          <TodoList
            :todos="todos"
            @toggle="handleToggleTodo"
            @delete="handleDeleteTodo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary: #3b82f6;
  --primary-dark: #1e40af;
  --primary-light: #dbeafe;
  --success: #10b981;
  --error: #ef4444;
  --error-light: #fee2e2;
  --error-dark: #b91c1c;
  --bg-dark: #0f172a;
  --bg-card: #ffffff;
  --border: #e2e8f0;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 100%;
  max-width: 42rem;
}

.header {
  margin-bottom: 2rem;
  animation: slideDown 0.6s ease-out;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: #93c5fd;
  font-weight: 500;
}

.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
}

.error-box {
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--error-light);
  color: var(--error-dark);
  font-size: 0.875rem;
  font-weight: 500;
  border-left: 4px solid var(--error);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: shake 0.3s ease-in-out;
}

.error-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.loading-state {
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e5e7eb;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-0.5rem);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(0.5rem);
  }
}

@media (max-width: 640px) {
  .page {
    padding: 1rem;
  }

  .title {
    font-size: 1.875rem;
  }

  .card {
    border-radius: 0.75rem;
  }
}
</style>