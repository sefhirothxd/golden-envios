import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
const Register = () => {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('123456');

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      console.log('Usuario creado');
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Ingresar correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="email"
          placeholder="Ingresar contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
