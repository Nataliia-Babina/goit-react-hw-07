
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice"

const contactScheme = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("This is a requarid field"),
  number: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("This is a required field"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={contactScheme}
      onSubmit={(values, actions) => {
        dispatch(addContact({ id: nanoid(), ...values }));
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
           <label htmlFor="name">Name:</label>
          <Field className={css.field} type="text" name="name" />
          <ErrorMessage name="name" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="number">Number:</label>
          <Field className={css.field} type="text" name="number" />
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