import { Router } from "express";
import { 
    getProjects, 
    getProject,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/project.controller";

const router = Router();

router.get('/proyectos', getProjects);
router.get('/proyectos/:id', getProject);
router.post('/proyectos', createProject);
router.put('/proyectos/:id', updateProject);
router.delete('/proyectos/:id', deleteProject);

export default router;
