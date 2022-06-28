export const erroresFirebase = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return {
        code: 'email',
        message: 'El correo ya esta en uso',
      };
    case 'auth/invalid-email':
      return {
        code: 'email',
        message: 'El correo no es valido',
      };
    case 'auth/user-not-found':
      return {
        code: 'email',
        message: 'El usuario no existe',
      };
    case 'auth/wrong-password':
      return {
        code: 'password',
        message: 'La contraseña es incorrecta',
      };
    default:
      return {
        code: 'email',
        message: 'error del servidor',
      };
  }
};
