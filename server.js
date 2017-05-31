const Koa  = require('koa');
const Router = require('koa-router');

const slow = require('koa-slow');

const koa = new Koa();
const app = new Router();

 const muppets = [
								{id:"1",name:"Kermit", actorId:"1"},
								{id:"2",name:"Dr. Teeth", actorId:"1"},
								{id:"3",name:"Rowlf", actorId:"1"},
								{id:"4",name:"Waldrof", actorId:"1"},
								{id:"5",name:"the Swedish Chef", actorId:"1"},
								{id:"6",name:"Animal", actorId:"2"},
								{id:"7",name:"Fozzie Bear", actorId:"2"},
								{id:"8",name:"Miss Piggy", actorId:"2"},
								{id:"9",name:"Sam the Eagle", actorId:"2"}							
							];

const actors = [
												{id:"1",name:"Jim Henson"},
												{id:"2",name:"Frank Oz"},
											];


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
	ctx.body = JSON.stringify(muppets);
})

app.get('/actors', (ctx)=>{
	ctx.body = JSON.stringify(actors);
})



koa.use(app.routes());
koa.listen(process.env.PORT || 3000);