/* eslint-disable no-console, import/no-unresolved */
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import router from 'routers/auth';

const app = new Koa();

app.proxy = true;
app.keys = ['changeme'];
app.use(cors({
  credentials: true,
}));
app.use(koaBody({}));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
});
app.use(router.routes());

// Set your RP_ID here.
// process.env.RP_ID = 'localhost';

app.listen(process.env.PORT || 10000, () => {
  console.log('server started.');
});

export default app;
