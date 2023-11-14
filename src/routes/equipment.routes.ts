// Default imports
import express from 'express';

// Controller imports
import { get, getById, create, update, _delete, borrow, unborrow, remind } from '../controllers/equipment';

const Router = express.Router();

Router.get('/', get);
Router.get('/:id', getById);

Router.post('/', create);
Router.post('/:id/remind', remind);

Router.put('/:id/borrow', borrow);
Router.put('/:id/unborrow', unborrow);
Router.put('/:id', update);

Router.delete('/:id', _delete);

export default Router;