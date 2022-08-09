import React, { forwardRef } from 'react';

const FormInput = forwardRef(
  (
    { type, placeholder, onChange, onBlur, name, className, value, disabled },
    ref
  ) => {
    return (
      <input
        disabled={disabled}
        value={value}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={className}
      />
    );
  }
);

export default FormInput;
