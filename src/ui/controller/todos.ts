async function get() {
    return fetch("/api/todos").then(async (respServer) => {
        const todosString = await respServer.text();
        const todosServer = JSON.parse(todosString).todos;
        return todosServer;
    });
}

export const todoController = {
    get,
};
