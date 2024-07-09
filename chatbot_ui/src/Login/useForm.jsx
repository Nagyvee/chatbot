// useForm.js
import { useState } from 'react';
import { validate } from './Validate';

const useForm = (initialValues, isLogging) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors = validate(values, isLogging);
    setErrors(validationErrors);
    return validationErrors;
  };

  return [values, errors, handleChange, validateForm, setValues, setErrors];
};

export default useForm;
