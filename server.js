const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http
  .createServer((req, res) => {
    let deportesJson
    try {
      deportesJson = JSON.parse(fs.readFileSync("data/Deportes.json", "utf8"));
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    }
    //RUTAS CLIENTE
    if (req.url == "/") {
      try {
        const html = fs.readFileSync("public/index/index.html", "utf8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    } 
    
    else if (req.url == "/estilos") {
      try {
        const css = fs.readFileSync("public/index/assets/style.css");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    } 
    
    else if (req.url == "/javascript") {
      try {
        const js = fs.readFileSync("public/index/assets/script.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(js);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }

    else if (req.url == "/boostrapcss") {
      try {
        const bootstrapCss = fs.readFileSync("utils/bootstrap/bootstrap.min.css");
        res.writeHead(200, {"Content-Type": "text/css"});        
        res.end(bootstrapCss);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }

    else if (req.url == "/boostrapjs") {
      try {
        const boostrapjs = fs.readFileSync("utils/bootstrap/bootstrap.min.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(boostrapjs);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }
    
    else if (req.url == "/jquery") {
      try {
        const jquery = fs.readFileSync("utils/jquery/jquery.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(jquery);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }
    else if (req.url == "/axios") {
      try {
        const axios = fs.readFileSync("utils/axios/axios.min.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(axios);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }
    else if (req.url == "/popper") {
      try {
        const popper = fs.readFileSync("utils/bootstrap/popper.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(popper);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }

    // RUTAS API REST
    else if (req.url == "/deportes" && req.method == "GET") {
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(deportesJson));
      } catch (error) {
        console.log(`error al leer Deportes ${error}`);
        res.statusCode = 500;
        res.end("Usuarios no Disponibles");
      }
    } 
    
    else if (req.url === "/agregar" && req.method === "POST") {             
        let body = ""
        req.on("data", (chunk) => {           
           try {
            body = JSON.parse(chunk)     
           } catch (error) {
            console.log(`error al parsear ${error}`);
           }                  
        });               
        req.on("end", () => {  
          if(!body){
            res.statusCode = 500;
            return res.end("Deporte no Agregado"); 
          }        
          deportesJson.push(body);
          fs.writeFileSync("data/Deportes.json", JSON.stringify(deportesJson));
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(body));
        });              
        
    } 
    
    else if (req.url.startsWith("/eliminar") && req.method === "DELETE") {
      try {
        const { index } = url.parse(req.url, true).query;        
        if (index) {
          const usuarioEliminado = deportesJson.splice(index, 1);
          fs.writeFileSync("data/Deportes.json", JSON.stringify(deportesJson));
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(usuarioEliminado));
        }
        else{
          throw "Elemento en query string es invalido";
        }
      } catch (error) {
        console.log(`error al eliminar un deporte ${error}`);
        res.statusCode = 500;
        res.end("Deporte no Eliminado");
      }
    } 
    
    else if (req.url.startsWith("/editar") && req.method === "PUT") {
      try {
        const { index } = url.parse(req.url, true).query;
        if (index) {
          let body = ""
          req.on("data", (chunk) => {           
             try {
              body = JSON.parse(chunk)     
             } catch (error) {
              console.log(`error al parsear ${error}`);
             }                  
          });
          req.on("end", () => {
            if(!body){
              res.statusCode = 500;
              return res.end("Deporte no Editado"); 
            }     
            deportesJson[index] = body;
            fs.writeFileSync("data/Deportes.json", JSON.stringify(deportesJson));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(body));
          });
          fs.writeFileSync("data/Deportes.json", JSON.stringify(deportesJson));
        }
        else{
          throw "Elemento en query string es invalido";
        }
      } catch (error) {
        console.log(`error al alterar un deporte ${error}`);
        res.statusCode = 500;
        res.end("Update fallido");
      }
    } 
    // RUTA 404
    else {
      try {
        const errorPage = fs.readFileSync("public/404.html", "utf8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(errorPage);
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      }
    }
  }).listen(process.env.PORT || 3000);
  

module.exports = server