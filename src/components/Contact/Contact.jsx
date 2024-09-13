import css from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { FiActivity } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <p className={css.field}>
          <FaUser /> {name}
        </p>
        <p className={css.field}>
        <FiActivity />
        {number}
      </p>
      </div>
      <button className={css.button} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;