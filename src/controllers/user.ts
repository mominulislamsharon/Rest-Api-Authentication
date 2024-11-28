import express, { Request, Response } from "express";
import { deleteUserById, getUser, getUserById } from "../db/users";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUser();

     res.status(200).json(users);

  }catch (error){
    console.log(error);
     res.sendStatus(400);
    } 
}

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteUserById(id);

    res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) =>{
  try {
    const { id } = req.params;
    const { username } = req.body;
    if(!username){
      res.sendStatus(400);
      return;
    }
    const user = await getUserById(id);
    user.username = username;
    await user.save();
     res.status(200).json(user).end();
}catch(error){
  console.log(error);
  res.sendStatus(400);
}
}