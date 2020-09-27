import express from "express"
import path from "path"
import http from "http"
import socketIO from "socket.io"
import { json, raw, text, urlencoded } from 'body-parser';
import ejs from "ejs";

const port: any = process.env.port || 3000

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        app.set('views',path.join(__dirname,'../views'));

        app.set('view engine' , 'ejs');

        app.get('/',(req,res)=>{
            res.render('index.ejs',{test:'questo è un test'});
        })
        

        this.server = new http.Server(app);
        const io: socketIO.Server = socketIO(this.server);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log( `Server listening on port ${this.port}.` )
        })
    }
}

new App(port).Start()