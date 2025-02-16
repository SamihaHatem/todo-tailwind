import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { taskI } from '../../../shared/interfaces/task.interface';
import { environment } from '../../../../environment/enviroment';
import { BeService } from '../../../core/services/be/be.service';
import { LocalService } from '../../../core/services/local/local.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  tasksServices: BeService | LocalService
  taskId: any
  isFormInvalid: boolean = false;

  constructor(private route: ActivatedRoute) {
    if (environment.isConnectedToBE) {
      this.tasksServices = inject(BeService);
    }
    else {
      this.tasksServices = inject(LocalService);
    }
  }

  TaskForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    completed: [false],
    id: ['']
  });

  onSubmit() {
    if (this.TaskForm.valid) {
      if (this.taskId == 'new') {
        this.TaskForm.removeControl('id')
    console.log(this.TaskForm.value)

        this.tasksServices.addNewTask(this.TaskForm.value as taskI).subscribe((response: any) => {
          console.log(response)
          Swal.fire({
            title: 'Success',
            icon: 'success'
          }).then(() => {
            this.TaskForm.reset()
          })
        }, (err: any) => {
          Swal.fire({
            title: 'ERROR',
            icon: 'error'
          }).then(() => {
            this.TaskForm.reset()
          })
        })
      }
      else {
        console.log('update')

        this.tasksServices.EditTask(this.TaskForm.value as taskI).subscribe((response: any) => {
          console.log(response)
          Swal.fire({
            title: 'Success',
            icon: 'success'
          })
        }, (err: any) => {
          Swal.fire({
            title: 'ERROR',
            icon: 'error'
          })
        })
      }
    }
    else {
      console.log('not valid', this.TaskForm)
      this.TaskForm.markAllAsTouched()
    }
  }

  currentTask!: taskI
  getTaskByID(id: any) {
    this.tasksServices.getTaskById(this.taskId).subscribe((response: any) => {
      this.currentTask = response.task;

      if (this.currentTask) {
        this.TaskForm.controls['title'].setValue(this.currentTask.title)
        this.TaskForm.controls['completed'].setValue(this.currentTask.completed)
        this.TaskForm.controls['userId'].setValue(this.currentTask.userId)
        this.TaskForm.controls['id'].setValue(this.currentTask.id)
      }
    }, (err: any) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((response: any) => {
      this.taskId = response.params.id
      if (this.taskId !== 'new') {
        // this.TaskForm = this.formBuilder.group({
        //   ...this.TaskForm.controls,
        //   completed: [false],
        // });

        console.log("task id: ", this.taskId)
        this.getTaskByID(this.taskId)
      }

    })
  }

}
