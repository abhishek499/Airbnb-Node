import express from 'express';
import pingRouter from './ping.router'
import {validateRequestBody} from '../../validators';
import { pingSchema } from '../../validators/ping.validator';

const v1Router = express.Router()

v1Router.use('/ping', validateRequestBody(pingSchema), pingRouter);


export default v1Router;