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
    messageRequire: {
      value: true,
      message: 'El campo es requerido',
    },
    validateTrim: {
      trim: (value) => {
        if (!value.trim()) {
          return 'No se acepta espacios vacios.';
        }
        return true;
      },
    },
    validateSelection(value) {
      console.log('valor del seleccionado', value);
      if (value === '0') {
        return 'Seleccione una opción';
      }
      return true;
    },
    validateEquals(getValues) {
      return {
        esquals: (value) =>
          value === getValues || 'Las contraseñas no coinciden',
      };
    },
  };
};
