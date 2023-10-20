import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NotesListComponent } from './notes-list/notes-list.component';


const routes: Routes = [
  { path: 'notes/:id', component: NotesDetailComponent },
  { path: 'create', component: NoteCreateComponent },
  { path: '', component: NotesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
