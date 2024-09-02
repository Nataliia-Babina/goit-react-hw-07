import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from '../../redux/contactsSlice'; 

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items); 
    const filter = useSelector(state => state.filters.name.toLowerCase());

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
    );

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
    };

    return (
        <ul className={css.list}>
            {filteredContacts.map(contact => (
                <li key={contact.id} className={css.listItem}>
                    <Contact contact={contact} onDelete={() => handleDelete(contact.id)} /> 
                </li>
            ))}
        </ul>
    );
};

  export default ContactList; 