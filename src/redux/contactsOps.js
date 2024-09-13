import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://66e1ca56c831c8811b565859.mockapi.io/';

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/contacts');
        return data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    try {
        const { data } = await axios.post('/contacts', contact);
        return data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/contacts/${contactId}`);
        return data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})