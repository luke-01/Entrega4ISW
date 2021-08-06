import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from "typeorm";
import { Session } from "./Session";

@Entity()
@Index(["timestamp", "id_maquina"], {unique: true})
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp")
    timestamp: Date;

    @Column("int")
    id_maquina: number;

    @ManyToOne(type => Session, session => session.reservations)
    id_sesion: Session;
}
