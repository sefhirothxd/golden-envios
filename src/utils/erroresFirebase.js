export const erroresFirebase = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'El correo ya esta en uso';
    case 'auth/invalid-email':
      return 'El correo no es valido';
    case 'auth/user-not-found':
      return 'El usuario no existe';
    case 'auth/wrong-password':
      return 'La contraseña es incorrecta';
    default:
      return 'Error desconocido';
  }
};
