import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../Card';
import { CardService } from '../services/card.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css'],
})
export class NewCardDialogComponent implements OnInit {
  cardName!: string;
  cardStatus!: number;
  urlBoardId!: number;
  errorMessage: string | null = null;

  cards: Card[] = [];
  existingStatus: number[] = [];
  statusTaken: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { boardId: number },
    public cardService: CardService
  ) {
    this.urlBoardId = data.boardId;
  }

  ngOnInit(): void {
    this.getCards(this.urlBoardId);
  }

  getCards(boardId: number): void {
    this.cardService.getCards(this.urlBoardId).subscribe(
      (response: Card[]) => {
        this.cards = response;
        this.existingStatus = this.cards.map(({ status }) => status);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    //console.log(typeof this.existingStatus[0], this.existingStatus);
    //console.log(typeof this.cardStatus, this.cardStatus);
    this.statusTaken = this.existingStatus.includes(Number(this.cardStatus));
    if (this.statusTaken) {
      this.errorMessage = 'Status ' + this.cardStatus + ' is already taken. Please choose a different status.';
    } else {
      this.errorMessage = null;
      this.dialogRef.close({
        name: this.cardName,
        status: this.cardStatus,
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
