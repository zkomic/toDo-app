import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../Task';
import { CardService } from '../services/card.service';
import { Card } from '../Card';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  task: Task | undefined;
  name: string = '';
  status: number | undefined;
  cards: Card[] = [];
  urlBoardId: number;
  existingStatus: number[] = [];
  statusTaken: boolean = false;
  errorMessage: string | null = '';

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public cardService: CardService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      task: Task;
      boardId: number;
    }
  ) {
    this.urlBoardId = data.boardId;
    console.log(this.urlBoardId);
  }
  
  ngOnInit(): void {
    if (this.data && this.data.task) {
      this.name = this.data.task.name;
      this.status = this.data.task.status;
    }
    this.getCards(this.urlBoardId);
  }

  getCards(boardId: number): void {
    this.cardService.getCards(this.urlBoardId).subscribe(
      (response: Card[]) => {
        this.cards = response;
        this.existingStatus = this.cards.map(({ status }) => status);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.statusTaken = this.existingStatus.includes(Number(this.status));
    if (!this.statusTaken) {
      this.errorMessage =
        'List with status ' + this.status + ' does not exist.';
    } else {
      this.dialogRef.close({
        ...this.data.task,
        name: this.name,
        status: this.status,
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

