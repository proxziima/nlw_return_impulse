import express from 'express';
import cors from 'cors';
import { routes } from './routes';


const app = express();

//GET = Buscar informações
//POST = Cadastrar informações
//PUT = Atualizar informações de uma entidade
//PATCH = Atualizar uma informação única de uma entidade

app.use(cors()); //uma forma de fazermos um controle de segurança no backend para que frontend inadequados acessem a informação do backend. Com o cors informamos quais endereços irão acessar o backend
app.use(express.json());
app.use(routes);



app.listen(3333), () => {
    console.log('HTTP server running!');
};;