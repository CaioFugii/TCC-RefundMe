import React, { useState } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

interface ValidationReturn {
  [key: string]: string;
}

function parseErrorSchema(error: ValidationError): ValidationReturn {
  console.log('error', error);
  return error.inner.reduce(
    (previous: ValidationReturn, current, index): ValidationReturn => {
      previous[current.path] = error.errors[index];
      return previous;
    },
    {}
  );
}

const useForm = (initialState = {}, validate: ObjectSchema) => {
  const [values, setValues] = useState<Record<string, any>>(initialState);
  const typeErrors: ValidationReturn = {};
  const [errors, setErrors] = useState(typeErrors);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.type === 'checkbox') {
      // @ts-ignore
      setValues({ ...values, [event.target.name || '']: event.target.checked });
    } else if (event.target.type === 'radio') {
      setValues({
        ...values,
        [event.target.name || '']: event.target.value === 'true'
      });
    } else {
      setValues({ ...values, [event.target.name || '']: event.target.value });
    }
  };

  const handleSubmit = (callback: Function) => async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    let valid;
    try {
      valid = await validate.validate(values, { abortEarly: false });
      setErrors({});
    } catch (error) {
      console.log('error :', error);
      console.log(parseErrorSchema(error));
      setErrors(parseErrorSchema(error));
    }
    if (valid) callback(valid);
  };

  return {
    handleChange,
    handleSubmit,
    setValues,
    errors,
    values
  };
};

export { useForm };
