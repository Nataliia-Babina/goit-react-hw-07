import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
    items: [],
    loading: false,
    error: null,
    name: "",
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchContacts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        }).addCase(fetchContacts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        }).addCase(addContact.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(addContact.fulfilled, (state, action) => {
            state.loading = false;
            state.items.unshift(action.payload)
        }).addCase(addContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        }).addCase(deleteContact.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteContact.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }).addCase(deleteContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const selectContacts = (state) => state.contacts.items;
export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], (contacts, filterValue) =>
    contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filterValue.toLowerCase());
    }));

export const contactsReducer = contactsSlice.reducer;