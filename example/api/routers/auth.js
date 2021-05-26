import Router from 'koa-router';
import ms from 'ms';
import { register, verify, login } from '../../../server';

const router = new Router({ prefix: '/api' });
const users = [];

router
  .get('/', (ctx) => {
    ctx.body = 'ok';
  })
  .post('/register', (ctx) => {
    const { name } = ctx.request.body;

    const { credentialOpt } = register({ name });

    if (credentialOpt.status === 'ok') {
      ctx.cookies.set('challenge', JSON.stringify(credentialOpt.challenge), {
        httpOnly: true,
        maxAge: ms('2m'),
      });
      ctx.cookies.set('name', name, {
        httpOnly: true,
        maxAge: ms('2m'),
      });
      ctx.body = credentialOpt;
    } else {
      ctx.body = 'bad';
    }
  })
  .post('/register_response', async (ctx) => {
    const challenge = JSON.parse(ctx.cookies.get('challenge'));
    const name = ctx.cookies.get('name');

    const result = await verify({
      session: {
        challenge,
        name,
      },
      data: ctx.request.body,
    });

    if (result.status === 'ok') {
      const u = users.find((x) => name === x.name);

      if (u) {
        u.authenticators.push(result.authrInfo);
      } else {
        users.push({
          name,
          authenticators: [result.authrInfo],
        });
      }
      ctx.body = { status: 'ok' };
    } else {
      ctx.body = 'bad';
    }
  })
  .post('/login', (ctx) => {
    const { name } = ctx.request.body;

    const u = users.find((x) => x.name === name);

    const assertion = login(u);

    ctx.cookies.set('challenge', JSON.stringify(assertion.challenge), {
      httpOnly: true,
      maxAge: ms('2m'),
    });
    ctx.cookies.set('name', name, {
      httpOnly: true,
      maxAge: ms('2m'),
    });

    ctx.body = assertion;
  })
  .post('/login_response', async (ctx) => {
    const challenge = JSON.parse(ctx.cookies.get('challenge'));
    const name = ctx.cookies.get('name');

    const u = users.find((x) => x.name === name);

    const result = await verify({
      session: {
        challenge,
        authenticators: u.authenticators,
      },
      data: ctx.request.body,
    });

    if (result.status === 'ok') {
      ctx.body = { status: 'ok' };
    } else {
      ctx.body = 'bad';
    }
  });

export default router;
