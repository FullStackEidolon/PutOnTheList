import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { getNotes } from '../../services/noteService.ts';

export default function ClientSideNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className={styles.notesList}>
      {notes.length ? (
        notes.map((note, index) => (
          <div key={index} className={styles.note}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            {/* Additional note details or actions */}
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
}
