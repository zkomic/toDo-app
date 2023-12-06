import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from '../Board';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.css']
})
export class NewBoardDialogComponent implements OnInit {

  boardName!: string;
  board: Board[] = [];


  constructor(
    public dialogRef: MatDialogRef<NewBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Board
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.data);
    this.data.name = this.boardName;
    this.dialogRef.close(this.data);
  }
  

  onClose(): void {
    this.dialogRef.close(); 
  }
}


