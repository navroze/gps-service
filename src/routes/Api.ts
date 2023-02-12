/**
 * Define all your API web-routes
 */
import { Router } from 'express';
import { userValidator, gpsValidator } from '../middleware/request-middleware';
import { login, register } from '../handlers/user';
import { auth } from '../middleware/auth';
import { createGpsRecordHandler } from '../handlers/gpsRecords';

const router = Router();

// Health check route
router.get('/healthcheck', (req, res) => {
    res.send({ message: 'Server is up and running' });
});

//User routes
router.post('/login', userValidator, login);
router.post('/register', userValidator, register);

// GPS Routes
router.post('/gps-record', [gpsValidator, auth], createGpsRecordHandler);

export default router;