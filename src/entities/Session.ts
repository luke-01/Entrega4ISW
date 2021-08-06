import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Project } from "./Project";
import { Reservation } from "./Reservation";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cumplida: boolean;

    @ManyToOne(type => Project, project => project.sessions)
    @JoinColumn({name: "id_proyecto"})
    id_proyecto: Project

    @OneToMany(type => Reservation, reservation => reservation.id_sesion)
    reservations: Reservation[]
}
