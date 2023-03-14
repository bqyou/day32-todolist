export interface RSVP{
    name:string
    email:string
    age:number
    attendance:string
}

export interface Task {
    description: string
    dueDate: string
}

export interface Activities{
    title: string
    name: string
    tasks: Task[]
}