import { Component, inject, OnInit } from '@angular/core';
import { taskI } from '../../../shared/interfaces/task.interface';
import { BeService } from '../../../core/services/be/be.service';
import { LocalService } from '../../../core/services/local/local.service';
import { environment } from '../../../../environment/enviroment';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  allTasksList: taskI[] = []
  allTasksListTemp: taskI[] = []
  isLoading: boolean = true
  isError: boolean = true
  filterValue: any
  tasksServices: BeService | LocalService

  constructor() {
    if (environment.isConnectedToBE) {
      this.tasksServices = inject(BeService);
    }
    else {
      this.tasksServices = inject(LocalService);
    }
  }

  applyFilter() {
    console.log(this.filterValue)
    if (this.filterValue) {
      this.allTasksList = this.allTasksListTemp.filter((task) => {
        const titleMatch = task.title.toString().toLowerCase().includes(this.filterValue.toString().toLowerCase())
        const idMatch = task.id ? task.id.toString().toLowerCase().includes(this.filterValue.toString().toLowerCase()) : true
        return titleMatch || idMatch
      })
    } else {
      this.allTasksList = this.allTasksListTemp
    }
  }

  deleteByID(taskId: any) {
    this.tasksServices.DeleteTaskByID(taskId).subscribe((response: any) => {
      console.log(response)
      const taskIndex = this.allTasksList.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        this.allTasksListTemp.splice(taskIndex, 1);
        this.applyFilter()
        Swal.fire({
          title: 'Done',
          icon: 'success'
        })
      }
    }, (err: any) => {
      Swal.fire({
        title: 'Error',
        icon: 'error'
      })
    })
  }

  getAllTasks() {
    this.isLoading = true;
    this.isError = false;
    this.tasksServices.getAllTasks().subscribe((response: any) => {
      console.log(response)
      this.allTasksList = response;
      this.allTasksListTemp = response;
      this.isLoading = false;
      this.isError = false;
    }, (err: any) => {
      console.log(err)
      this.isLoading = false;
      this.isError = true;
    })
  }

  ngOnInit(): void {
    this.getAllTasks()
  }

}
