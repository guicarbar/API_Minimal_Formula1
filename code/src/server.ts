import fastify from "fastify"
import cors from "@fastify/cors"

const server = fastify({logger: true})
server. register(cors, {
    origin: "*",
    methods:"GET"
})

const teams = [
    {id: 1, name: "Ferrari"},
    {id: 2, name: "McLaren"},
    {id: 3, name: "Mercedes"},
    {id: 4, name: "Red Bull Racing"},
    {id: 5, name: "Alpine"},
    {id: 6, name: "Aston Martin"},
    {id: 7, name: "AlphaTauri"},
    {id: 8, name: "Alfa Romeo"},
    {id: 9, name: "Haas"},
    {id: 10, name: "Williams"}
];

const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Lando Norris", team: "McLaren"},
    {id: 3, name: "Charles Leclerc", team: "Ferrari"},
    {id: 4, name: "Lewis Hamilton", team: "Mercedes"},
    {id: 5, name: "Sergio Perez", team: "Red Bull Racing"},
    {id: 6, name: "Carlos Sainz", team: "Ferrari"},
    {id: 7, name: "George Russell", team: "Mercedes"},
    {id: 8, name: "Daniel Ricciardo", team: "AlphaTauri"},
    {id: 9, name: "Yuki Tsunoda", team: "AlphaTauri"},
    {id: 10, name: "Fernando Alonso", team: "Aston Martin"},
    {id: 11, name: "Lance Stroll", team: "Aston Martin"},
    {id: 12, name: "Esteban Ocon", team: "Alpine"},
    {id: 13, name: "Pierre Gasly", team: "Alpine"},
    {id: 14, name: "Valtteri Bottas", team: "Alfa Romeo"},
    {id: 15, name: "Guanyu Zhou", team: "Alfa Romeo"},
    {id: 16, name: "Kevin Magnussen", team: "Haas"},
    {id: 17, name: "Nico Hülkenberg", team: "Haas"},
    {id: 18, name: "Alex Albon", team: "Williams"},
    {id: 19, name: "Logan Sargeant", team: "Williams"}
];

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200)
    return teams
})

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200)
    return drivers
})

interface driverParams {
    id: string
}

server.get<{Params: driverParams}>("/drivers/:id", async(request, response) => {
    const id =  parseInt(request.params.id)
    const driver = drivers.find(d => d.id === id)

    if(!driver) {
        response.type("application/json").code(404)
        return {message: "Driver not found"}
    } else {
        response.type("application/json").code(200)
        return {driver}
    }
})

server.listen({port: 3333}, () => {console.log("Server iniciado na porta: 3333")})

