import express from 'express';
import {
  subscribeEmail,
  deleteSubscriber
} from '../Controllers/suscriberController.js';
import adminAuth from '../Middlewares/adminAuth.js';

const susrouter = express.Router();

susrouter.post('/', subscribeEmail);
susrouter.delete('/:id',adminAuth,deleteSubscriber);

export default susrouter;