export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: 'Este campo es requerido',
    },
    validateRequired(field) {
      return {
        esquals: (value) =>
          value === '' ? `El campo "${field}" es requerido` : true,
      };
    },
    validateRequiredSelect() {
      return {
        esquals: (value) => (value === '0' ? `Seleccione un campo` : true),
      };
    },

    patternEmail: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
      message: 'El correo no es valido',
    },
    minLengthValue(num) {
      return {
        value: num,
        message: `Debe de tener al menos ${num} caracteres`,
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
