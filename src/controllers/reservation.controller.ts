import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Reservation } from "../entities/Reservation";
import { Session } from "../entities/Session";

export const getReservations = async (req: Request, res: Response) => {
    const reservs = await getRepository(Reservation).find({loadRelationIds: true});
    res.send(reservs);
}

export const getReservation = async (req: Request, res: Response) => {
    try {
        const reserv = await getRepository(Reservation)
                             .findOneOrFail(req.params.id, {loadRelationIds: true});
        res.send(reserv);
    } catch {
        res.status(404).send("Reserva no encontrada");
    }
}

export const createReservation = async (req: Request, res: Response) => {
    try {
        let reserv = new Reservation();
        reserv.id_maquina = req.body.id_maquina;
        reserv.timestamp = req.body.timestamp;
        reserv.id_sesion = await getRepository(Session).findOneOrFail(req.body.id_sesion);
        const result = await getRepository(Reservation).save(reserv);
        res.send(result);
    } catch (e) {
        res.status(400).send({detail: e.detail});
    }
}

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const reservRepository = getRepository(Reservation);
        let reserv = await reservRepository.findOneOrFail(req.params.id);
        const body = req.body;
        if (body.id_maquina !== undefined) {
            reserv.id_maquina = body.id_maquina
        }
        if (body.timestamp !== undefined) {
            reserv.timestamp = body.timestamp;
        }
        if (body.id_sesion !== undefined) {
            reserv.id_sesion = await getRepository(Session).findOneOrFail(body.id_sesion);
        }
        const result = await reservRepository.save(reserv);
        res.send(result);
    } catch (e) {
        res.status(400).send({detail: e.detail});
    }
}

export const deleteReservation = async (req: Request, res: Response) => {
    const result = await getRepository(Reservation).delete(req.params.id);
    res.status(200).send(result);
}
