import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Session } from "./Session";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    id_maker: number;

    @Column()
    nombre: string;

    @Column("text")
    descripcion: string;

    @OneToMany(type => Session, session => session.id_proyecto)
    sessions: Session[];
}

