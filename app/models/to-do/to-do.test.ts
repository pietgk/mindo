import { getSnapshot } from "mobx-state-tree"
import { ToDoState } from ".."
import { ToDoModel } from "./to-do"

describe("ToDo", () => {
  test("can be created", () => {
    const instance = ToDoModel.create({
      id: "1",
      task: "Buy Milk",
    })
    expect(getSnapshot(instance)).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "state": "🟢",
        "task": "Buy Milk",
      }
    `)
  })

  test("can be marked as complete", () => {
    const instance = ToDoModel.create({
      id: "1",
      task: "Buy Milk",
    })
    instance.setState(ToDoState.COMPLETED)
    expect(getSnapshot(instance)).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "state": "✅",
        "task": "Buy Milk",
      }
    `)
  })

  test("can be marked as delete", () => {
    const instance = ToDoModel.create({
      id: "1",
      task: "Buy Milk",
    })
    instance.setState(ToDoState.DELETED)
    expect(getSnapshot(instance)).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "state": "❌",
        "task": "Buy Milk",
      }
    `)
  })
})
