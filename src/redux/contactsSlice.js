import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
    items:
    [{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" }],
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