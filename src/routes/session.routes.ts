import { Router } from "express";
import { 
    getSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession
} from "../controllers/session.controller";

const router = Router();

router.get("/sesiones", getSessions);
router.get("/sesiones/:id", getSession);
router.post("/sesiones", createSession);
router.put("/sesiones/:id", updateSession);
router.delete("/sesiones/:id", deleteSession);

export default router;
