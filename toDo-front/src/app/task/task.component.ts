import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Task } from '../Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({ 
  selector: 'app-task',
  templateUrl: './task.component.html', 
  styleUrls: ['./task.component.css'],
})

export class TaskComponent {
  @Input() tasks: Task [] = [];
  @Output() taskDeleted: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>();

  
  name!: string;
  status!: number;
  boardId!: number;
  
  constructor(public dialog: MatDialog,
    private taskService: TaskService,
    private route: ActivatedRoute) { 
  } 


  initialData(task: Task){
    this.name = task.name;
    this.status = task.status;
  }

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));

  }  

    deleteTask(task: Task): void {
      this.dialog.open(DeleteDialogComponent, {
        disableClose: true,
      })
      .afterClosed().subscribe(
        (response)  => {
          if (response && task.id) {
            this.taskService.deleteTask(this.boardId, task.id).subscribe(() => {
              this.taskDeleted.emit(task);
            });
            console.log('Task deleted: ', response);
          }
      }, 
      (error) => {
        console.error('Error deleting task: ', error);
      })
    }


    editTask(task: Task): void {
      this.dialog.open(EditDialogComponent, {
        data: {
          task: task,
          boardId: this.boardId,
        },
        disableClose: true,
      }
      )
        .afterClosed().subscribe(
          (response: Task) => {
            if (response) {
              this.taskService.editTask(this.boardId, response).subscribe(
                (aa: any) => {
                  this.taskEdited.emit(response);
                }
              )
            }
          },
          (error) => {
            console.log('Error updating task: ', error);
          })
    }
  }






