import React, { FC, ChangeEvent, InputHTMLAttributes } from 'react';

import './form-input.styles.scss';

// Props interface for the FormInput component
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
}

// FormInput component - styled input field with floating label
// The label will 'shrink' when the input has a value
const FormInput: FC<FormInputProps> = ({
  handleChange,
  label,
  ...otherProps
}) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
