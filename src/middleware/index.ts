import express from "express";
import { deleteUserById, getUserBySessionToken } from "../db/users";
import { merge, get } from "lodash";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string | undefined;

    if (currentUserId) {
      res.sendStatus(403);
    }

    if (currentUserId !== id) {
      res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["MOMINUL-AUTH"];

    if (!sessionToken) {
      res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

// export const deleteUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params;

//     const deleteUser = await deleteUserById(id);

//     res.json(deleteUser);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };
