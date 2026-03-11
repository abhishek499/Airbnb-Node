import  express from "express";
import { confirmBookingHandler, confirmBookingWithLockingHandler, createBookingHandler, createBookingHandlerWithRedlock } from "../../controllers/booking.controller";
import { validateRequestBody } from "../../validators";
import { createBookingSchema } from "../../validators/booking.validator";

const bookingRouter = express.Router()

bookingRouter.post('/create', validateRequestBody(createBookingSchema), createBookingHandler);
bookingRouter.post('/createWithRedlock', validateRequestBody(createBookingSchema), createBookingHandlerWithRedlock);
bookingRouter.get('/confirm/:idempotencyKey', confirmBookingHandler)
bookingRouter.get('/confirmWithLock/:idempotencyKey', confirmBookingWithLockingHandler)

export default bookingRouter;