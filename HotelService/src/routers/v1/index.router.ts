import express from 'express';
import {validateRequestBody} from '../../validators';

import { pingSchema } from '../../validators/ping.validator';

import pingRouter from './ping.router'
import hotelRouter from './hotel.router';

const v1Router = express.Router()

v1Router.use('/ping', validateRequestBody(pingSchema), pingRouter);
v1Router.use('/hotels', hotelRouter);


export default v1Router;