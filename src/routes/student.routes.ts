// Default imports
import express from 'express';

// Controller imports
import { get } from '@/controllers/student';

const Router = express.Router();

Router.get('/', get);

export default Router;