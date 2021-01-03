


/*
main http methods
    GET   -> fetch  info from backend
    POST  -> create info on backend
    PUT   -> full update of some resource
    PATCH -> partial update of some resource
*/

/*
main restful parameter types
 
    query: filters, pagination
    path:  specify the resource 
    body:  body of data for the endpoint to inspect
*/


/*
Middleware: 
    Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

    Middleware functions can perform the following tasks:

    Execute any code.
    Make changes to the request and the response objects.
    End the request-response cycle.
    Call the next middleware function in the stack.
*/



const { request } = require('express');
const express = require('express');
const { uuid } = require('uuidv4');



const logMiddleware = (request, response, next) => {
    const {method, url} = request;
    const label = `[${method}] -> ${url}`;
    console.time(label);
    next();
    console.timeEnd(label);
}



const app = express();



// app.use(logMiddleware);
app.use(express.json());





const projects = [];


app.get('/', (request, response) => {
    return response.send({data: ['hello', 'world']});
});


// projects resource
app.get('/repositories', (request, response) => {
    // console.log('get projects called with query params: ', request.query);

    return response.send(projects);
});

app.post('/repositories', (request, response) => {
    // console.log('create project called with body: ', request.body);
    const { title, url, techs } = request.body;
    const project = { title, url, techs, likes: 0, id: uuid() };
    projects.push(project);
    return response.send(project);
});

app.put('/repositories/:id', (request, response) => {
    const { params, body } = request;
    // console.log('update project called with: ', {params, body});
   
    const { title, url, techs } = body;

    const project = {
        id: params.id
    };

    const index = projects.findIndex(p => p.id == project.id);

    if (index == -1)
        return response.status(400).send({error: 'Project not found'});
    
    if (title)
        projects[index].title = title;
    if (url)
        projects[index].url = url;
    if (techs)
        projects[index].techs = techs;

    console.log('put project result: ', projects[index]);

    return response.send(projects[index]);
});

app.post("/repositories/:id/like", (request, response) => {
    const {params} = request;
    
    const index = projects.findIndex(p => p.id == params.id);

    if (index == -1)
        return response.status(400).send();
    
    projects[index].likes += 1;

    return response.send(projects[index]);
});

app.delete('/repositories/:id', (request, response) => {
    const {id} = request.params;
    // console.log('delete project called with path params: ', request.params);

    const index = projects.findIndex(p => p.id == id);
    if (index == -1)
        return response.status(400).send({error: 'Project not found'});
    
    const deletedProject = projects.splice(index, 1);

    return response.status(204).send();
})









module.exports = app;
