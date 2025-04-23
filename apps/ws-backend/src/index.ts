
import {WebSocketServer} from "ws"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws, req) => {
    const url = req.url;
    if(!url) {
        ws.close(4000, "No URL provided")
        return
    }
    const queryParams = new URLSearchParams(url.split("?")[1])
    const token = queryParams.get("token")
    if(!token) {
        ws.close(4001, "No token provided")
        return
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    if(!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
        ws.close(4002, "Invalid token")
        return
    }
    const userId = decoded.userId;

    ws.on("message", (message) => {
        ws.send(`Hello ${userId}, you sent -> ${message}`)
    })

})