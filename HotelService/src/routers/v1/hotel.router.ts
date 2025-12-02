import  express from "express";
import { createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIdHandler } from "../../controllers/hotel.controller";
import { validateRequestBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema) ,createHotelHandler);

hotelRouter.get('/all', getAllHotelsHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.delete('/:id', deleteHotelHandler);


export default hotelRouter;