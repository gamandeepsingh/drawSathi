import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema , signInSchema , createRoomSchema} from "@repo/common/type"

const app = express();
const port = process.env.PORT || 8000;

app.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body)
    if(!data.success) {
        res.status(400).json({
            message: "Invalid data",
            errors: data.error.format()
        })
        return
    }
    // db call
    res.json({
        userId: "123"
    })
})
app.post("/signin", (req, res) => {
    const data = signInSchema.safeParse(req.body)
    if(!data.success) {
        res.status(400).json({
            message: "Invalid data",
            errors: data.error.format()
        })
        return
    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post("/room", middleware, (req, res) => {
    const data = createRoomSchema.safeParse(req.body)
    if(!data.success) {
        res.status(400).json({
            message: "Invalid data",
            errors: data.error.format()
        })
        return
    }
    // db  call

    res.json({
        roomId: 123
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});