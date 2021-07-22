const chai = require("chai")
const chaiHttp = require("chai-http")

chai.use(chaiHttp)
const server = require("../server")

describe("Probando mi API rest", ()=>{
    it("Porbando Ruta GET /deportes",()=>{
        chai.request(server).get("/deportes").end((err,res)=>{
            const data = JSON.parse(res.text)
            console.log(data);
            chai.expect(data).to.be.an("array")

        })
    })
    it("Probando ruta POST /usuarios", () => {
        const deporte = {nombre:"basketball",precio:"15000"}
        chai
            .request(server)
            .post("/agregar")
            .send(deporte)
            .end((err, res) => {
                chai
                    .request(server)
                    .get("/deportes")
                    .end((err, res) => {
                        const data = JSON.parse(res.text)
                        console.log(data)
                        const deporteEncontrado = data.find(u => u.nombre == deporte.nombre)
                        chai.expect(deporteEncontrado).to.be.an('object')
                    })
            })
    })
})
