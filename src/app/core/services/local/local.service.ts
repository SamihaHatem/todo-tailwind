import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { taskI } from '../../../shared/interfaces/task.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  platformId = inject(PLATFORM_ID)
  constructor() { }


  getAllTasks(): Observable<taskI[]> {
    let tasksList: taskI[] = [{ title: 'title', userId: 1, completed: true, id: 1 }]

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('tasks')) tasksList = JSON.parse(localStorage.getItem('tasks') as string)
      else localStorage.setItem('tasks', JSON.stringify(tasksList))
    }
    return of(tasksList);
  }

  addNewTask(reqBody: taskI): Observable<any> {
    let tasksList: taskI[] = [{ title: 'title', userId: 1, completed: true, id: 0 }]

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('tasks')) tasksList = JSON.parse(localStorage.getItem('tasks') as string)
      else localStorage.setItem('tasks', JSON.stringify(tasksList))
    }
    reqBody.id = tasksList.length;
    reqBody.completed = false;

    tasksList.push(reqBody)
    localStorage.setItem('tasks', JSON.stringify(tasksList))

    return of({ message: 'success' })
  }

  EditTask(reqBody: taskI) {
    let tasksList: taskI[] = [{ title: 'title', userId: 1, completed: true, id: 0 }]

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('tasks')) tasksList = JSON.parse(localStorage.getItem('tasks') as string)
      else localStorage.setItem('tasks', JSON.stringify(tasksList))
    }

    const taskIndex = tasksList.findIndex(task => task.id == reqBody.id);
    console.log(taskIndex)
    if (taskIndex !== -1) {
      tasksList[taskIndex] = { ...tasksList[taskIndex], ...reqBody };

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('tasks', JSON.stringify(tasksList));
      }
      return of({ task: tasksList[taskIndex] });
    } else {
      return of({ task: null });
    }

  }

  DeleteTaskByID(taskID: any) {
    let tasksList: taskI[] = [{ title: 'title', userId: 1, completed: true, id: 0 }];

    if (isPlatformBrowser(this.platformId)) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        tasksList = JSON.parse(storedTasks);
      } else {
        return of(false);
      }
    }

    const taskIndex = tasksList.findIndex((task) => task.id === taskID);
    if (taskIndex !== -1) {
      tasksList.splice(taskIndex, 1);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('tasks', JSON.stringify(tasksList));
      }

      return of(true);
    } else {
      return of(false);
    }
  }

  getTaskById(taskID: any) {

    let tasksList: taskI[] = [{ title: 'title', userId: 1, completed: true, id: 0 }]

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('tasks')) tasksList = JSON.parse(localStorage.getItem('tasks') as string)
      else localStorage.setItem('tasks', JSON.stringify(tasksList))
    }

    const task = tasksList.find(task => task.id == taskID)


    return of({ task })

  }

}
