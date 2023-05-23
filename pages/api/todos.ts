import { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        todoController.get(req, res);
        return;
    }

    if (req.method === "POST") {
        todoController.create(req, res);
        return;
    }

    res.status(405).json({
        message: "Method is not allowed",
    });
}
