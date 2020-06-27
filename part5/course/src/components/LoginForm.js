import React from 'react'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  onUsernameChange,
  onPasswordChange
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type="text" value={username} onChange={onUsernameChange} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={onPasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm