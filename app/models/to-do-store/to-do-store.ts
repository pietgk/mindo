import KSUID from "ksuid"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ToDoId, ToDoModel, ToDoState, withEnvironment } from ".."

export const KSUid = () => KSUID.randomSync().string as Id;
export type Id = string;

export const ToDoStoreModel = types
  .model("ToDoStore")
  .props({
    todos: types.optional(types.map(ToDoModel), {}),
  })
  .extend(withEnvironment)
  // .views((self) => ({}))
  .actions((self) => ({
    addToDo(task: string) {
      const id = KSUid()
      const todo = ToDoModel.create({ id, task, state: ToDoState.ACTIVE }) 
      self.todos.put(todo)
      return todo
    },
    completed(id: ToDoId) {
      self.todos.get(id).setState(ToDoState.COMPLETED)
    },
    delete(id: ToDoId) {
      self.todos.get(id).setState(ToDoState.DELETED)
    }
  }))

type ToDoStoreType = Instance<typeof ToDoStoreModel>
export interface ToDoStore extends ToDoStoreType { }
type ToDoStoreSnapshotType = SnapshotOut<typeof ToDoStoreModel>
export interface ToDoStoreSnapshot extends ToDoStoreSnapshotType { }
export const createToDoStoreDefaultModel = () => types.optional(ToDoStoreModel, {})
