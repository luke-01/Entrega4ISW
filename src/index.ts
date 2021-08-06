import "reflect-metadata";
import express from "express";
import cors from "cors";
import {createConnection} from "typeorm";

// Modelos
import { Project } from "./entities/Project";
import { Session } from "./entities/Session";
import { Reservation } from "./entities/Reservation";

// Routers
import projectRouter from "./routes/project.routes";
import sessionRouter from "./routes/session.routes";
import reservationRouter from "./routes/reservation.routes";

const main = async () => {
    const app = express();

    const conn = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "",
        database: "ProyectoISW",
        entities: [Project, Session, Reservation],
        synchronize: true,
        logging: true
    });

    app.use(cors())
    app.use(express.json())

    app.use(projectRouter);
    app.use(sessionRouter);
    app.use(reservationRouter)

    app.listen(3000)
    console.log("Server on port", 3000)
}


main();
