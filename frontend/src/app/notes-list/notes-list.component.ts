import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent {

  notes: Note[] = [];  // Explicitly type the notes array

  constructor(private router: Router, private noteService: NoteService) { 
    // Fetch notes from the backend when the component is initialized
    this.noteService.getNotes().subscribe((data: Note[]) => {
      this.notes = data;
      //for each note in the notes, print the note
      this.notes.forEach((note) => {
        console.log(note);
      });

      console.log(this.notes)
    }, (error: Error) => {
      // Handle any errors that might occur during the fetch
      console.error('Error fetching notes:', error);
    });
  }
  addNote() {
    this.router.navigate(['/create']);
  }

  deleteNote(noteId: string) {
    this.noteService.deleteNote(noteId).subscribe(() => {
      // Handle the response (e.g., remove the note from the list or display a success message)
      this.notes = this.notes.filter(note => note.id !== noteId);
    }, (error: Error) => {
      // Handle any errors that might occur during deletion
      console.error('Error deleting note:', error);
    });
  }

  viewNote(noteId: string) {
    // Find the note with the provided id
    const note = this.notes.find(n => n.id === noteId);
    
    this.router.navigate(['/notes', note]);
  }
}
