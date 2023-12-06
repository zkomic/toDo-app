import { Component, EventEmitter, Inject, NgModule, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Board } from '../Board';
import { BoardService } from '../services/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewBoardDialogComponent } from '../new-board-dialog/new-board-dialog.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
})


export class MenuComponent {
  boards: Board[] = [];
  isValid = false;
  boardName!: string;
  boardNames: String[] = [];
  @Output() boardClicked: EventEmitter<Board> = new EventEmitter<Board>();



  constructor(public dialog: MatDialog,
    private boardService: BoardService,
    private router: Router) { 

    }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe(
      (response: Board[]) => {
        this.boards = response;
        if (this.boards && this.boards.length > 0) {
          this.boardName = this.boards[0].name;
          this.isValid = true;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  newBoard() {
    this.dialog.open(NewBoardDialogComponent, {
      data: {'boardName': ''},
      disableClose: true,
      panelClass: 'new-board-dialog-container',
    })
    .afterClosed().subscribe(
      (response: Board)  => {
        if (response && response.name.length > 0) {
          this.boardService.createNewBoard(response).subscribe(
            (createdBoard: Board) => {
              console.log(createdBoard);
              this.getBoards();
            }
          )
        }
    }, 
    (error) => {
      console.log('Error creating board: ', error);
    })
  }

  getBoardById(boardId: number) {
    this.boardService.getBoardById(boardId).subscribe(
      (response: Board) => {
        console.log(response);

        this.boardClicked.emit(response);
      }
    )
  }

  

  
}
