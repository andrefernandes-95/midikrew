// @flow
import React from "react";
import {
  TiMail as MailIcon,
  TiKeyOutline as PasswordIcon,
} from "react-icons/ti";
import type { Form as FormType } from "data/forms/types";
import { Ul, Li } from "componentsStyled/Shared";
import { Text } from "componentsStyled/Typography";
import Form from "../Form";

interface Props {
  close: () => void;
}

const form: FormType[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    icon: MailIcon,
    dataType: "string",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: PasswordIcon,
    dataType: "string",
    required: true,
  },
];

const Join = ({ close }: Props) => {
  const error = false;
  return (
    <React.Fragment>
      <Ul>
        <strong>What you get by joining the krew:</strong>
        <Li>- Create, save and load projects linked to your account.</Li>
        <Li>- Upload unlimited instruments to use in your tracks.</Li>
      </Ul>
      <Form
        close={close}
        submitName="Join krew"
        form={form}
        submitHandler={() => {}}
      />
      {error && (
        <React.Fragment>
          <Text error margin={`1.5rem 0 0 0`}>
            <strong>Error:</strong>
          </Text>
          <Text error margin={`0.5rem 0 0 0`}>
            {error}
          </Text>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Join;
