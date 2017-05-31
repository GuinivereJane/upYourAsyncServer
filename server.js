import Koa from 'koa';
import Router from 'koa-router';
import * as data from './data/data';

var slow = require('koa-slow');

const koa = new Koa();
const app = new Router();

// x-response-time

// app.use(async function (ctx, next) {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });



// app.use(async function (ctx, next) {
//   const start = new Date();
//   await next();
//   delay(30, 20);
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`);

// });


app.use(slow({
    url: /muppets/i,
    delay: 5000
}));


app.use(slow({
    url: /actors/i,
    delay: 2000
}));


app.get('/hello/:name', async (ctx) => {
	ctx.body = `Hello, ${ctx.params.name}!\n`;
});


app.get('/muppets', (ctx)=>{
	ctx.body = JSON.stringify(data.muppets);
})

app.get('/actors', (ctx)=>{
	ctx.body = JSON.stringify(data.actors);
})



koa.use(app.routes());
koa.listen(3000);