import axios from 'axios';

const API_URL = 'http://localhost:3000/api/notes'; // Replace with your server URL

export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
