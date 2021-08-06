import { Session } from "../entities/Session";
import { Project } from "../entities/Project";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export const getSessions = async (req: Request, res: Response) => {
    const sessions = await getRepository(Session).find({loadRelationIds: true});
    res.send(sessions);
}

export const getSession = async (req: Request, res: Response) => {
    try {
        const session = await getRepository(Session)
                              .findOneOrFail(req.params.id, {loadRelationIds: true});
        res.send(session);
    } catch (e){
        console.log(e);
        res.status(404).send("Session no encontrada")
    }
}

export const createSession = async (req: Request, res: Response) => {
    try {
        const sessionRepository = getRepository(Session);
        let session = new Session();
        session.cumplida = req.body.cumplida;
        session.id_proyecto = await getRepository(Project).findOneOrFail(req.body.id_proyecto);
        const result = await sessionRepository.save(session);
        res.send({id: result.id, id_proyecto: result.id_proyecto.id, cumplida: result.cumplida});
    } catch (e) {
        res.status(400).send(e)
    }
} 

export const updateSession = async (req: Request, res: Response) => {
    try {
        const sessionRepository = getRepository(Session);
        let session  = await sessionRepository.findOneOrFail(req.params.id);
        const body = req.body;
        if (body.cumplida !== undefined) {
            session.cumplida = body.cumplida
        }
        if (body.id_proyecto !== undefined) {
            getRepository(Project).findOneOrFail(body.id_proyecto)
              .then((project) => {
                  session.id_proyecto = project;
              })
              .catch(() => {
                  res.status(400).send("Proyecto no encontrado");
                  return;
              });
        }
        const result = await sessionRepository.save(session);
        res.send({id: result.id, id_proyecto: result.id_proyecto.id, cumplida: result.cumplida});
    } catch {
        res.status(404).send("Sesion no encontrada")
    }
}

export const deleteSession = async (req: Request, res: Response) => {
    const result = await getRepository(Session).delete(req.params.id)
    res.status(200).send(result);
}
