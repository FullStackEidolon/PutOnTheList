'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Importing the noteService
import { getNotes, deleteNote } from '../services/noteService'; // Adjust the path as per your project structure

export default function Home() {
  const [notes, setNotes] = useState([]);

  const handleDelete = async (note) => {
    console.log('Deleting note with id:', note)
    console.log("keys", Object.keys(note))
    console.log("id", note._id)
    try {
      await deleteNote(note._id); // This function is from noteService.ts
      setNotes(previousNotes => previousNotes.filter(n => n._id !== note._id)); // Corrected line
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  

  // In your note rendering section, add a delete button

  // Fetch notes when the component mounts
  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      console.log('Notes:', data);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle the error as per your requirement
    }
  };
  
  useEffect(() => {
    fetchNotes();    
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>POTL</h1>
        {/* You can add more header elements or styling here */}
      </div>
      <div className={styles.notesList}>
        {notes.length ? (
          notes.map((note, index) => (
            <div key={index} className={styles.note}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDelete(note)}>Delete</button>
              {/* Additional note details or actions can be added here */}
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}
