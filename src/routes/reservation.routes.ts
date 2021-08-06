import { Router } from "express";
import { 
    getReservations, 
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
} from "../controllers/reservation.controller";

const router = Router();

router.get('/reservas', getReservations);
router.get('/reservas/:id', getReservation);
router.post('/reservas', createReservation);
router.put('/reservas/:id', updateReservation);
router.delete('/reservas/:id', deleteReservation);

export default router;
