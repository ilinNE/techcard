import { useState, useCallback } from "react";

export function Validation() {
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: { target: any }) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setIsValid };
}
