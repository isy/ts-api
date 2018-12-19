import UserRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import * as httpStatus from "http-status";

const sendReponse = function(res, statusCode, data) {
  res.status(statusCode).json({ result: data });
};

class UserController {
  constructor() {}

  async get(req: Request, res: Response) {
    try {
      const data = await UserRepository.getAll();
      sendReponse(res, httpStatus.OK, data);
    } catch (e) {
      console.error.bind(console, `Error ${e}`);
    }
    // .then(user => sendReponse(res, httpStatus.OK, user))
    // .catch(err => console.error.bind(console, `Error ${err}`));
  }

  getById(req: Request, res: Response) {
    const _id = { id: req.params.id };

    if (!_id) {
      sendReponse(res, httpStatus.OK, "user not found!");
    } else {
      UserRepository.getById(req.params.id)
        .then(programs => sendReponse(res, httpStatus.OK, programs))
        .catch(err => console.error.bind(console, `Error ${err}`));
    }
  }

  create(req: Request, res: Response) {
    UserRepository.create(req.body)
      .then(menus => sendReponse(res, httpStatus.CREATED, menus))
      .catch(err => console.error.bind(console, `Error ${err}`));
  }

  update(req: Request, res: Response) {
    const _id = { id: req.params.id };

    if (req.body.length == 0) {
      return sendReponse(res, httpStatus.NOT_FOUND, "User not found!");
    }

    UserRepository.update(_id, req.body)
      .then(user => sendReponse(res, httpStatus.OK, user))
      .catch(err => console.error.bind(console, `Error ${err}`));
  }

  delete(req: Request, res: Response) {
    if (!req.params.id) {
      return sendReponse(res, httpStatus.NOT_FOUND, "User not found!");
    }

    UserRepository.delete(req.params.id)
      .then(user =>
        sendReponse(
          res,
          httpStatus.OK,
          `User  ${user.name} deleted with success!`
        )
      )
      .catch(err => console.error.bind(console, `Error ${err}`));
  }
}

export default new UserController();
