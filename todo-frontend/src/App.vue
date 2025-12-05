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
    <div class="card">
      <h1 class="title">Todo App</h1>
      <p class="subtitle">
        Add tasks, mark them complete, or delete when done.
      </p>

      <TodoForm :loading="loadingAdd" @add="handleAddTodo" />

      <div v-if="error" class="error-box">
        {{ error }}
      </div>

      <div v-if="loadingInitial">
        <p>Loading todos...</p>
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
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  background-color: #f3f4f6;
}

.card {
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.title {
  margin-bottom: 4px;
}

.subtitle {
  margin-top: 0;
  margin-bottom: 16px;
  color: #6b7280;
  font-size: 14px;
}

.error-box {
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fee2e2;
  color: #b91c1c;
  font-size: 13px;
}
</style>
