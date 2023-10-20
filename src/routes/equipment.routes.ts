// Default imports
import express from 'express';

// Controller imports
import { get, getById, create } from '../controllers/equipment';

const Router = express.Router();

Router.get('/', get);
Router.get('/:id', getById);

Router.post('/', create);

export default Router;