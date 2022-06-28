export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: 'El correo es requerido',
    },
    patternEmail: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
      message: 'El correo no es valido',
    },
    minLengthValue(num) {
      return {
        value: num,
        message: `La contraseña debe tener al menos ${num} caracteres`,
      };
    },
    validateTrim: {
      trim: (value) => {
        if (!value.trim()) {
          return 'No se acepta espacios vacios.';
        }
        return true;
      },
    },
    validateEquals(getValues) {
      return {
        esquals: (value) =>
          value === getValues || 'Las contraseñas no coinciden',
      };
    },
  };
};
