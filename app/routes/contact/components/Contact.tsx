import { Helmet } from 'react-helmet-async';
import { Content } from 'app/components/Content';
import type { Group } from 'app/models';
import type { ContactForm as ContactFormType } from 'app/reducers/contact';
import ContactForm from './ContactForm';
import type { FormProps } from 'redux-form';

type Props = {
  sendContactMessage: (message: ContactFormType) => Promise<any>;
  addToast: (arg0: { message: string }) => void;
  reset: (form?: string) => void;
  change: (field: string, value: boolean) => void;
  loggedIn: boolean;
  groups: Array<Group>;
} & FormProps;

const Contact = (props: Props) => {
  return (
    <Content>
      <Helmet title="Kontakt" />
      <h1>Kontaktskjema for Abakus</h1>
      <ContactForm {...props} />
    </Content>
  );
};

export default Contact;
