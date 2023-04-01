const express = require('express');
const upload = require('./../utils/multer');
const protect = require('./../middleware/protect');
const restrictTo = require('./../middleware/restrictTo');

const userControllers = require('./../controllers/user-controller');

const router = express.Router();

const { sendToken, verifySignUpToken, signup, login, sendRecoveryMail, resetPassword, getAllUsers, getAllGuides, getMe, updateMe, deleteMe, getAGuide, postAGuide, updateAGuide, deleteAGuide } = userControllers;

router.route('/sendToken').post(sendToken);

router.route('/verifySignUpToken').post(verifySignUpToken);

router.route('/signup').post(upload.single('image'), signup);

router.route('/login').post(login);

router.route('/sendRecoveryMail').post(sendRecoveryMail);

router.route('/resetPassword').post(resetPassword);

router.use(protect);

router.route('/me')
    .get(getMe)
    .patch(updateMe)
    .delete(deleteMe);

router.route('/users').get(restrictTo('admin'), getAllUsers);

router.route('/guides').get(restrictTo('admin'), getAllGuides);

router.route('/guide')
    .get(restrictTo('admin'), getAGuide)
    .post(restrictTo('admin'), postAGuide)
    .patch(restrictTo('admin'), updateAGuide)
    .delete(restrictTo('admin'), deleteAGuide);

module.exports = router;