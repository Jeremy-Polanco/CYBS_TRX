import express from 'express';

import { getTransactionSearch } from '../controllers/transactions.controller.js';

const router = express.Router();

router.route('/').get(getTransactionSearch);

export default router;
