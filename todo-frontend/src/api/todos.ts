import type { Todo } from '../types/todo';

const API_BASE_URL = 'http://localhost:3000';

// Get todos
export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`${API_BASE_URL}/todos`);

    if (!res.ok) {
        throw new Error('Failed to fetch todos');
    }

    return res.json();
} 

// Create a new todo
export async function createTodo(title: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) {
        const errorData = await res.text();
        throw new Error('Failed to create todo: ' + errorData);
    }

    return res.json();
}

// Toggle todo completion
export async function toggleTodo(id: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
        method: 'PATCH',
    });

    if (!res.ok) {
        const errorData = await res.text();
        throw new Error('Failed to toggle todo: ' + errorData);
    }

    return res.json();
}

// Delete todo
export async function deleteTodo(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const errorData = await res.text();
        throw new Error('Failed to delete todo: ' + errorData);
    }
}