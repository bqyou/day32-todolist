import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Activities } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  form!:FormGroup
  taskArray!: FormArray

  valueChanges$!: Subscription

  @Output()
  onNewActivity = new Subject<Activities>()

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
      this.form=this.createTodoForm()
      this.valueChanges$ = this.form.valueChanges.subscribe(
        values => {
          console.info('>>>', values)
        } 
      )
  }

  ngOnDestroy(): void {
      this.valueChanges$.unsubscribe()
  }

  private createTodoForm(): FormGroup {
    this.taskArray=this.fb.array([], [Validators.minLength(1)])
    return this.fb.group({
      taskName: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      tasks: this.taskArray
    });
  }

  addTask(){
    const g = this.fb.group({
      description: this.fb.control<string>('', [Validators.required]),
      dueDate: this.fb.control<string>('', [Validators.required])
  })
  this.taskArray.push(g)
  }

  deleteTask(idx:number){
    this.taskArray.removeAt(idx);
  }

  saveTodo(){
    const activities = this.form.value as Activities
    this.onNewActivity.next(activities)
    this.form=this.createTodoForm()
  }

  isFormInvalid(): boolean {
    return this.form.invalid || this.taskArray.length <= 0
  }
}
