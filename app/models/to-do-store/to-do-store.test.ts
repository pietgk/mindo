import { getSnapshot } from "mobx-state-tree"
import { ToDoStoreModel } from "./to-do-store"

describe("ToDoStore", () => {
  it("can be created", () => {
    const instance = ToDoStoreModel.create({})
    expect(getSnapshot(instance)).toMatchInlineSnapshot(`
      Object {
        "todos": Object {},
      }
    `)
  })
})

describe("ToDoStore User", () => {
  it("can add a new Task to the TO-DO list", () => {
    const instance = ToDoStoreModel.create({})
    const todo = instance.addToDo("buy milk")
    expect(getSnapshot(instance.todos.get(todo.id))).toMatchSnapshot({
      id: expect.any(String),
    })
  })
  it("can get all Tasks from the TO-DO list for visualisation", () => {
    const instance = ToDoStoreModel.create({})
    const tasks = ["buy milk", "feed the cat"]
    tasks.forEach((task) => instance.addToDo(task))
    instance.todos.forEach(task => {
      expect(task).toMatchSnapshot({
        id: expect.any(String)
      })
    })
  })
  it("can mark a Task in the TO-DO list as complete", () => {
    const instance = ToDoStoreModel.create({})
    const todo = instance.addToDo("buy milk")
    instance.completed(todo.id)
    expect(getSnapshot(instance.todos.get(todo.id))).toMatchSnapshot({
      id: expect.any(String),
    })
  })
  it("can delete a Task from the TO-DO list", () => {
    const instance = ToDoStoreModel.create({})
    const todo = instance.addToDo("buy milk")
    instance.delete(todo.id)
    expect(getSnapshot(instance.todos.get(todo.id))).toMatchSnapshot({
      id: expect.any(String),
    })
  })
})
