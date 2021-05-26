import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { register, login } from '../../../client/lib/index.cjs';

export default function Home() {
  const [name, setName] = useState('');
  const [text, setText] = useState('Enter your name and click register.');

  const _register = async () => {
    try {
      const d = await register(name);
      if (d) {
        setText(`${name} registered successfully.`);
      } else {
        setText(`${name} registered failed.`)
      }
    } catch (e) {
      setText(`${name} registered with error.`);
    }
  };

  const _login = async () => {
    try {
      const d = await login(name);
      if (d) {
        setText(`${name} login successfully.`);
      } else {
        setText(`${name} login failed.`);
      }
    } catch (e) {
      setText(`${name} login with error.`);
    }
  };

  return (
   <div className={styles.container}>
     <main className={styles.main}>
       <h1>WebAuthn Example</h1>
      <div>
        <input placeholder="Name here" value={name} onChange={(e) => { setName(e.target.value); }} />
      </div>
      <div>
        <button onClick={_register}>Register</button>
        <button onClick={_login}>Login</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {text}
      </div>
    </main>
   </div>
  )
}
