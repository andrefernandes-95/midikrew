import { useField, useFormikContext } from "formik";

/**
 * Custom hook to handle field behavior
 */
function useEnhancedField({ name, onChange: customOnChange }) {
  const [field, meta, helpers] = useField(name);
  const { setStatus } = useFormikContext();

  const handleChange = (event) => {
    const value =
      event && event.target && event.target.value !== undefined
        ? event.target.value
        : event;

    helpers.setValue(value);
    setStatus((prevStatus) => ({ ...prevStatus, error: null }));

    if (typeof customOnChange === "function") {
      customOnChange(event);
    }
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return {
    field,
    meta,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}

export default useEnhancedField;
