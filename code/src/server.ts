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
    {id: 4, name: "Red Bull Racing"}
]

const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Lando Norris", team: "McLaren"},
    {id: 3, name: "Charles Leclerc", team: "Ferrari"},
    {id: 4, name: "Lewis Hamilton", team: "Mercedes"},
    {id: 5, name: "Sergio Perez", team: "Red Bull Racing"}
]

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

