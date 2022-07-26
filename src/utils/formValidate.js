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
    validateRequiredNumber(field) {
      return {
        esquals: (value) =>
          value.match(
            /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
          )
            ? true
            : `En el campo "${field}" debe ingresar solo numeros`,
      };
    },
    validateRequiredDni(field) {
      return {
        esquals: (value) =>
          value.match(
            /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
          ) && value.length === 8
            ? true
            : `En el campo "${field}" debe ingresar solo numeros y debe de tener  8 digitos`,
      };
    },
    validateRequiredTelefono(field) {
      return {
        esquals: (value) =>
          value.match(
            /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
          ) && value.length === 9
            ? true
            : `En el campo "${field}" debe ingresar solo numeros y debe de tener  9 digitos`,
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
