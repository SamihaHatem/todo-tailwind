import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviroment';
import { taskI } from '../../../shared/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class BeService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(environment.baseUrl + '')
  }

  addNewTask(reqBody: taskI) {
    return this.http.post(environment.baseUrl + '', reqBody)
  }

  EditTask(reqBody: taskI) {
    return this.http.put(environment.baseUrl + '', reqBody)
  }

  DeleteTaskByID(taskId: any) {
    return this.http.get(environment.baseUrl + '' + taskId)
  }

  getTaskById(taskID: any) {
    return this.http.get(environment.baseUrl + '' + taskID)
  }
}
