import express, { json } from 'express'; // npm install @types/express -D (instala as definições de tipo do express, -D apenas para ambiente de desenvolvimento)

const app = express();

app.use(express.json());

const users = ['Lucas', 'Diego', 'Luan', 'Robson', 'Cleiton', 'Ramirez', 'Teste'];

app.get('/users', (request, response) => {
    const search = String(request.query.search);
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {

    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
});

app.listen(3333);