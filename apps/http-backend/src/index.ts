import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  signInSchema,
  createRoomSchema,
} from "@repo/common/type";
import { prismaClient } from "@repo/db/client";

const app = express();
const port = process.env.PORT || 8000;

app.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: data.error.format(),
    });
    return;
  }
  await prismaClient.user.create({
    data: {
      email: data.data.email,
      password: data.data.password,
    },
  });
  // db call
  res.json({
    userId: "123",
  });
});
app.post("/signin", async (req, res) => {
  const parsed = signInSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsed.error.format(),
    });
    return;
  }

  const { email, password } = parsed.data;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});


app.post("/room", middleware, (req, res) => {
  const data = createRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: data.error.format(),
    });
    return;
  }
  // db  call

  res.json({
    roomId: 123,
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
