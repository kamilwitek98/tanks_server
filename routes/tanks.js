import express from 'express'
import { getTanks, createTank, updateTank, deleteTank } from '../controllers/tanks.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getTanks);
router.post('/', auth, createTank);
router.patch('/:id', auth, updateTank);
router.delete('/:id', auth, deleteTank);

export default router;