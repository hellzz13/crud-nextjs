import { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        todoController.get(req, res);
    }

    res.status(405).json({
        message: "Method is not allowed",
    });
}
