import { todoRepository } from "@server/repository/todos";
import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

async function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;

    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
    }

    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
    }

    const output = todoRepository.get({ page, limit });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
    // fail fast validation
    const body = TodoCreateBodySchema.safeParse(req.body);

    // type narrowing
    if (!body.success) {
        res.status(400).json({
            error: {
                message: "You need to provide a content to create a TODO",
                description: body.error.issues,
            },
        });
        return;
    }

    // Here we have the data
    const createdTodo = await todoRepository.createByContent(body.data.content);

    res.status(201).json({
        todo: {
            content: createdTodo,
        },
    });
}

export const todoController = {
    get,
    create,
};
