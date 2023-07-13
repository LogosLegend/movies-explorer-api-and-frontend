import { useState, useEffect } from 'react';
import { EMAIL_REGEXP } from './constants.js';

export function useInput(initialValue, validations) {

    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    function handleChange(e) {
      setValue(e.target.value);
    }

    function handleDirty() {
      setDirty(true);
    }

    function useValidation(value, validations) {

      const [empty, setEmpty] = useState(false);
      const [minMaxLength, setMinMaxLength] = useState(false);
      const [email, setEmail] = useState(false);
      const [inputValid, setInputValid] = useState(false);

      useEffect(() => {

        for (const v in validations) {

          if (v === 'empty') {

            value ? setEmpty(false) : setEmpty(true)

          } else if (v === 'minMaxLength') {

            (value.length >= validations[v].min && value.length <= validations[v].max) ? setMinMaxLength(false) : setMinMaxLength(true)

          } else if (v === 'email') {

            EMAIL_REGEXP.test(value) ? setEmail(false) : setEmail(true)
          }
        }
      }, [value, validations]);

      useEffect(() => {

        if (empty || minMaxLength || email) {

          setInputValid(false);

        } else {

          setInputValid(true);
        }
      }, [empty, minMaxLength, email]);

      return { empty, minMaxLength, email, inputValid };
    }

    return { value, isDirty, handleChange, handleDirty, ...valid };
  }