const http = require('http');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const uuid = require('uuid');
const app = new Koa();

app.use(koaBody());

// => CORS
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({...headers});
    try {
      return await next();
    } catch (e) {
      e.headers = {...e.headers, ...headers};
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});





// => GET/POST
const tickets = [
  {
    id: 1232313,
    name: 'Тест1',
    description: 'Описание1',
    status: false,
    created: new Date(),
  },
  {
    id: 123434352313,
    name: 'Тест2',
    description: 'Описание2',
    status: false,
    created: new Date(),
  },
  {
    id: 12324545313,
    name: 'Тест3',
    description: 'Описание3',
    status: false,
    created: new Date(),
  },
  {
    id: 12324545313,
    name: 'Тест3',
    description: 'Описание3',
    status: false,
    created: new Date(),
  }


];

app.use(async ctx => {
  const { method, id } = ctx.request.query;

  switch (method) {
      case 'allTickets':
          ctx.response.body = tickets;
          return;
      case 'ticketById':
          ctx.response.body = tickets.find(el => el.id == id);
          return;
      case 'editTicket':
        const parseToEdit = JSON.parse(ctx.request.body);
        const elIndex = tickets.findIndex(el => el.id == parseToEdit.id);
        console.log(tickets[elIndex]);
        tickets[elIndex] = {
          ...tickets[elIndex],
          ...parseToEdit,
        }
        ctx.response.status = 200;
        return;
      case 'createTicket':
        const parse = JSON.parse(ctx.request.body);
        tickets.push({
          id: +new Date + Math.random(),
          name: parse.name,
          description: parse.description,
          status: false,
          created: new Date(),
        })
        ctx.response.status = 200;
          return;    
      case 'deleteTicketById':
        const ticketIndex = tickets.findIndex(el => el.id == id);
        if (ticketIndex !== -1) {
          tickets.splice(ticketIndex, 1);
          ctx.response.body = 'удалено';
          ctx.response.status = 200;
          return; 
        } else {
          ctx.response.status = 404;
          return;
        }
             
      default:
          ctx.response.status = 404;
          return;
  }
});



const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port)
