// @flow
import React from "react";
import TextInput from "components/Inputs/TextInput";
import { Submit } from "componentsStyled/Buttons";
import type { Form as FormType } from "data/forms/types";

interface Props {
  close: () => void;
  form: FormType[];
  submitName: string;
  submitHandler?: () => void;
  isSubmitting?: boolean;
}

const Form = ({ form, submitName = "Submit", isSubmitting }: Props) => {
  return (
    <React.Fragment>
      {form.map((field, index) => (
        <TextInput
          key={index}
          {...field}
          name={field.name}
          label={field.label}
          type={field.type}
          icon={<></>}
        />
      ))}

      <Submit type="submit" disabled={isSubmitting}>
        {submitName}
      </Submit>
    </React.Fragment>
  );
};

export default Form;
