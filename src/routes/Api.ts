/**
 * Define all your API web-routes
 */
import { Router } from 'express';
import { requestValidator, gpsSchema, userSchema } from '../middleware/request-middleware';
import { login, register } from '../handlers/user';
import { auth } from '../middleware/auth';
import { createGpsRecordHandler } from '../handlers/gpsRecords';

const router = Router();

// Health check route
router.get('/healthcheck', (req, res) => {
    res.send({ message: 'Server is up and running' });
});

// User routes
router.post('/login', requestValidator(false, userSchema), login);
router.post('/register', requestValidator(false, userSchema), register);

// GPS Routes
router.post('/gps-record', [requestValidator(true, gpsSchema), auth], createGpsRecordHandler);

export default router;
