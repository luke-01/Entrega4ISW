import { Project } from "../entities/Project";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export const getProjects = async (req: Request, res: Response) => {
    const projects = await getRepository(Project).find();
    res.send(projects);
}

export const getProject = async (req: Request, res: Response) => {
    try {
        const project = await getRepository(Project).findOneOrFail(req.params.id);
        res.send(project);
    } catch {
        res.status(404).send({detail: "Proyecto no encontrado"})
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        const projectRepository = getRepository(Project);
        const project = projectRepository.create(req.body);
        const result = await projectRepository.save(project);
        res.send(result)
    } catch (e) {
        res.status(400).send({detail: e.detail})
    }
} 

export const updateProject = async (req: Request, res: Response) => {
    try {
        const projectRepository = getRepository(Project);
        const project  = await projectRepository.findOneOrFail(req.params.id);
        const body = req.body;
        if (body.id_maker !== undefined) {
            project.id_maker = body.id_maker;
        }
        if (body.nombre !== undefined) {
            project.nombre = body.nombre;
        }
        if (body.descripcion !== undefined) {
            project.descripcion = body.descripcion;
        }
        const result = await projectRepository.save(project);
        res.send(result);
    } catch {
        res.status(404).send({detail: "Proyecto no encontrado"})
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    const result = await getRepository(Project).delete(req.params.id)
    res.status(200).send(result);
}
