// @flow

import React from 'react';
import type { FormProps } from 'redux-form';
import { Field } from 'redux-form';

import Button from 'app/components/Button';
import {
  Form,
  TextInput,
  RadioButtonGroup,
  RadioButton,
  legoForm,
} from 'app/components/Form';
import PhoneNumberInput from 'app/components/Form/PhoneNumberInput';
import { FlexRow } from 'app/components/FlexBox';
import UserImage from './UserImage';
import ChangePassword from './ChangePassword';
import styles from './UserSettings.css';
import { createValidator, required, isEmail } from 'app/utils/validation';
import RemovePicture from 'app/routes/users/components/RemovePicture';

export type PasswordPayload = {
  newPassword: string,
  password: string,
  retype_new_password: string,
};

type Props = FormProps & {
  changePassword: (PasswordPayload) => Promise<void>,
  updateUser: (Object) => Promise<void>,
  user: any,
  isMe: boolean,
  push: (string) => void,
  updatePicture: (Object) => void,
  removePicture: (string) => Promise<*>,
};

const UserSettings = (props: Props) => {
  const {
    handleSubmit,
    changePassword,
    invalid,
    isMe,
    pristine,
    submitting,
    updatePicture,
    removePicture,
    push,
    user,
  } = props;

  const disabledButton = invalid || pristine || submitting;
  const showAbakusMembership = user.isStudent;

  return (
    <div>
      <FlexRow justifyContent="center">
        <UserImage user={user} updatePicture={updatePicture} />
      </FlexRow>

      <h3>Slett bilde:</h3>
      <RemovePicture username={user.username} removePicture={removePicture} />

      <Form onSubmit={handleSubmit}>
        <h3>Endre Bruker:</h3>
        <Field
          placeholder="Brukernavn"
          label="Brukernavn"
          name="username"
          readOnly
          component={TextInput.Field}
          props={{
            disabled: true,
          }}
        />

        <Field
          placeholder="Fornavn"
          label="Fornavn"
          name="firstName"
          component={TextInput.Field}
        />

        <Field
          placeholder="Etternavn"
          label="Etternavn"
          name="lastName"
          component={TextInput.Field}
        />

        <RadioButtonGroup label="Kjønn" name="gender">
          <Field
            name="gender"
            label="Mann"
            inputValue="male"
            component={RadioButton.Field}
          />
          <Field
            name="gender"
            label="Kvinne"
            inputValue="female"
            component={RadioButton.Field}
          />
          <Field
            name="gender"
            label="Annet"
            inputValue="other"
            component={RadioButton.Field}
          />
        </RadioButtonGroup>
        <Field label="Allergier" name="allergies" component={TextInput.Field} />

        <Field
          placeholder="abc@stud.ntnu.no"
          label="Epost"
          name="email"
          component={TextInput.Field}
        />

        <Field
          label="Telefonnummer"
          name="phoneNumber"
          component={PhoneNumberInput.Field}
        />

        <RadioButtonGroup label="Theme" name="selectedTheme">
          <Field
            name="selectedTheme"
            label="Light"
            inputValue="light"
            component={RadioButton.Field}
          />
          <Field
            name="selectedTheme"
            label="Dark"
            inputValue="dark"
            component={RadioButton.Field}
          />
        </RadioButtonGroup>

        {showAbakusMembership && (
          <RadioButtonGroup name="isAbakusMember" label="Medlem i Abakus?">
            <Field
              name="isMemberYes"
              label="Ja"
              component={RadioButton.Field}
              inputValue="true"
            />
            <Field
              name="isMemberNo"
              label="Nei"
              component={RadioButton.Field}
              inputValue="false"
            />
          </RadioButtonGroup>
        )}

        <Button disabled={disabledButton} submit>
          Submit
        </Button>
      </Form>

      {isMe && (
        <div className={styles.changePassword}>
          <h2>Endre passord</h2>
          <ChangePassword
            push={push}
            changePassword={changePassword}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

const validate = createValidator({
  username: [required()],
  firstName: [required()],
  lastName: [required()],
  gender: [required()],
  email: [required(), isEmail()],
});

export default legoForm({
  form: 'userSettings',
  validate,
  enableReinitialize: true,
  onSubmit: (data, dispatch, { updateUser }: Props) => updateUser(data),
})(UserSettings);
