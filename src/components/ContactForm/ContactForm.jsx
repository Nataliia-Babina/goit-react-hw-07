import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const handleSubmit = (values, actions) => {
    onAddContact(values);
    actions.resetForm();
  };

  const dispatch = useDispatch();
  const onAddContact = values => {
    dispatch(addContact(values));
  };

  const nameId = nanoid();
  const numberId = nanoid();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!'),
  });


  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
          >
      <Form className={css.form}>
        <div className={css.formGroup}>
           <label htmlFor={nameId}>Name:</label>
          <Field className={css.field} type="text" name="name" id={nameId} />
          <ErrorMessage name="name" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={numberId}>Number:</label>
          <Field className={css.field} type="text" name="number" id={numberId}/>
          <ErrorMessage name="number" className={css.error} component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;