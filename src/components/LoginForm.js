import React from 'react';
import Toggable from './Toggable';

export default function LoginForm(props) {
  return (
    <Toggable buttonLabel={'Show Login'}>
      <div>
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            value={props.username}
            placeholder="Username"
            onChange={props.handleUsernameChange}
          />
          <input
            type="password"
            value={props.password}
            placeholder="Password"
            onChange={props.handlePassChange}
          />
          <input type="submit" value={'login'} />
        </form>
      </div>
    </Toggable>
  );
}
