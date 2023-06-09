import { create, read } from "@db-crud-todos";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface TodoRepositoryGetOutPut {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutPut {
    const currentPage = page || 1;
    const currentLimit = limit || 10;
    const ALL_TODOS = read();

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);

    return {
        total: ALL_TODOS.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}

async function createByContent(content: string): Promise<Todo> {
    const newTodo = create(content);
    return newTodo;
}

export const todoRepository = { get, createByContent };

// Model/schema
interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
