import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../Card';
import { Task } from '../Task';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../Board';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: Card | undefined;
  @Input() tasks!: Task[];
  @Output() taskDeleted: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cardDeleted: EventEmitter<Card> = new EventEmitter<Card>();

  showNewForm = false;
  boardId!: number;
  board: Board | undefined;

  constructor(
    public dialog: MatDialog,
    private boardService: BoardService,
    private taskService: TaskService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private boardComponent: BoardComponent
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
  }

  filterTasks() {
    return this.tasks.filter((task) => task.status === this.card?.status);
  }

  newTask() {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.boardService
      .getBoardById(this.boardId)
      .subscribe((response: Board) => {
        this.board = response;
      });
    this.dialog
      .open(NewTaskDialogComponent, {
        data: {
          boardId: this.boardId,
        },
        disableClose: true,
        panelClass: 'new-task-dialog-container',
      })
      .afterClosed()
      .subscribe(
        (response: Task) => {
          if (response) {
            this.taskService
              .createNewTask(this.boardId, {
                ...response,
                board: this.board,
              })
              .subscribe((createdTask: Task) => {
                this.taskAdded.emit(createdTask);
              });
          }
        },
        (error) => {
          console.log('Error creating task: ', error);
        }
      );
  }

  editTask(task: Task): void {
    this.taskEdited.emit(task);
  }

  deleteTask(task: Task): void {
    this.taskDeleted.emit(task);
  }

  deleteCard() {
    this.dialog
      .open(DeleteDialogComponent, {
        disableClose: true,
        panelClass: 'delete-dialog-container',
      })
      .afterClosed()
      .subscribe(
        (response) => {
          this.cardService.deleteCard(this.card!.id!).subscribe(() => {
            this.cardDeleted.emit(this.card);
            this.boardComponent.getTasks(this.boardId); //
          });
        },
        (error) => {
          console.error('Error deleting card: ', error);
        }
      );
  }
}
