interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}
interface TodoRepositoryGetOutPut {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutPut> {
    return fetch("/api/todos").then(async (respServer) => {
        const todosString = await respServer.text();
        const todosFromServer = JSON.parse(todosString).todos;

        const ALL_TODOS = todosFromServer;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALL_TODOS.length / limit);

        return {
            todos: paginatedTodos,
            total: ALL_TODOS.length,
            pages: totalPages,
        };
    });
}

export const todoRepository = {
    get,
};

// prox ao model/schema
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
