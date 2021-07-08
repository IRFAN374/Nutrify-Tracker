import express from 'express';
import {
  AllMealsByUserId,
  AllUserDB,
  DeleteUserById,
  EditUserByName,
  searchUserName,
 
} from '../controllers/adminController.js'

const router = express.Router();

router.get('/search',searchUserName)

router.get('/',AllUserDB);
router.get('/:id',AllMealsByUserId);


router.delete('/:id',DeleteUserById);
router.patch('/:id',EditUserByName);

export default router;