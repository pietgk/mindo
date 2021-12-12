// import KSUID from "ksuid" // RN issues :-(
import uuid from 'react-native-uuid';
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ToDoId, ToDoModel, ToDoState } from "../to-do/to-do"
import { withEnvironment } from "../extensions/with-environment"
export const KSUid = () => uuid.v4() as Id;
export type Id = string;

export const ToDoStoreModel = types
  .model("ToDoStore")
  .props({
    todos: types.optional(types.map(ToDoModel), {}),
  })
  .extend(withEnvironment)
  // .views((self) => ({}))   // eslint-disable-line @typescript-eslint/no-unused-vars
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
