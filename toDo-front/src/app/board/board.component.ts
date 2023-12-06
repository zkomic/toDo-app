import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../Task';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { BoardService } from '../services/board.service';
import { Card } from '../Card';
import { NewCardDialogComponent } from '../new-card-dialog/new-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [CardService],
})
export class BoardComponent implements OnInit {
  tasks: Task[] = [];
  cards: Card[] = [];
  boardId!: number;
  board: Board | undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private taskService: TaskService,
    private cardService: CardService,
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));

    this.boardService.getBoardById(this.boardId).subscribe(
      (response) => {
        this.board = response;
        this.getTasks(this.boardId);
        this.getCards(this.boardId);
      },
      (error) => this.router.navigate(['/'])
    );

    this.route.paramMap.subscribe((params: Params) => {
      const newBoardId = Number(this.route.snapshot.paramMap.get('id'));

      if (this.boardId !== newBoardId) {
        this.boardId = newBoardId;
        this.getTasks(this.boardId);
        this.getCards(this.boardId);
      }
    });
  }

  addCard() {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.boardService.getBoardById(this.boardId).subscribe(
      (response: Board) => {
        this.board = response;
      });
    this.dialog
      .open(NewCardDialogComponent, {
        data: {
          boardId: this.boardId },
        disableClose: true,
        panelClass: 'new-card-dialog-container',
      })
      .afterClosed()
      .subscribe(
        (response: Card) => {
          if (response) {
            this.cardService
              .createCard({ ...response, board: this.board })
              .subscribe((createdBoard: Card) => {
                this.getCards(this.boardId);
              });
          }
        },
        (error) => {
          console.log('Error creating board: ', error);
        }
      );
  }

  getCards(boardId: number): void {
    this.cardService.getCards(boardId).subscribe(
      (response: Card[]) => {
        this.cards = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getTasks(boardId: number): void {
    this.taskService.getAllTasks(boardId).subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onAddTask(addTask: Task): void {
    this.getTasks(this.boardId);
  }

  onDeleteTask(deleteTask: Task): void {
    this.getTasks(this.boardId);
  }

  onEditTask(deleteTask: Task): void {
    this.getTasks(this.boardId);
  }

  onDeleteCard($event: Card) {
    this.getCards(this.boardId);
  }
}
