import React from "react";
import useEnhancedField from "hooks/useEnhancedFields";
import { InputWrap, Label, Description, Error, StyledInput } from "./styled";

interface Props {
  name: string;
  label?: string;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  description?: string;
  icon?: React.ReactNode;
}

const TextInput = ({
  name,
  label,
  description,
  icon: Icon,
  type = "text",
  ...props
}: Props) => {
  const { field, meta, onChange, onBlur } = useEnhancedField({
    name,
    onChange: props.onChange,
  });

  return (
    <InputWrap>
      <Label>
        {label}
        {Icon}
        {description && <Description>({description})</Description>}
      </Label>
      <StyledInput {...field} type={type} onChange={onChange} onBlur={onBlur} />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </InputWrap>
  );
};

export default TextInput;
