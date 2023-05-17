import dotenv from "dotenv";
import express from 'express';
import home from './src/routes/home';
import user from './src/routes/user';
import token from "./src/routes/token";
import aluno from "./src/routes/aluno";
import "./src/database";

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/tokens/', token);
    this.app.use('/alunos/', aluno);
  }
}

export default new App().app;
