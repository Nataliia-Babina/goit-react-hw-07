import css from './SearchBox.module.css';
import { nanoid } from 'nanoid';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchBox = () => {
  const inputId = nanoid();

  const dispatch = useDispatch();

  const onSearchContact = event => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };

  const filterValue = useSelector(selectNameFilter);
  return (
    <div className={css.search}>
      <label htmlFor={inputId}>Find contacts by name</label>
      <input className={css.input} type="text" value={filterValue} onChange={onSearchContact} id={inputId}/>
    </div>
  );
};

export default SearchBox;