import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { TaskComponent } from './task/task.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NewBoardDialogComponent } from './new-board-dialog/new-board-dialog.component';
import { NewCardDialogComponent } from './new-card-dialog/new-card-dialog.component';
import { EditDialogComponent } from './edit-task-dialog/edit-task-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    BoardComponent,
    DeleteDialogComponent,
    NewTaskDialogComponent,
    NewBoardDialogComponent,
    NewCardDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
