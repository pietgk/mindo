import { Instance, SnapshotOut, types } from "mobx-state-tree"

export enum ToDoState {
  ACTIVE = '🟢',
  COMPLETED = '✅',
  DELETED = '❌'
}

/**
 * ToDo is identified by a string
 */
export type ToDoId = string

/**
 * Model description here for TypeScript hints.
 */
export const ToDoModel = types
  .model("ToDo")
  .props({
    id: types.identifier,
    task: types.optional(types.string, ""),
    state: types.optional(types.enumeration<ToDoState>(Object.values(ToDoState)), ToDoState.ACTIVE),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setName(v: string) {
      self.task = v
    },
    setState(v: ToDoState) {
      self.state = v
    },
    delete() { self.state = ToDoState.DELETED}
  }))

type ToDoType = Instance<typeof ToDoModel>
export interface ToDo extends ToDoType { }
type ToDoSnapshotType = SnapshotOut<typeof ToDoModel>
export interface ToDoSnapshot extends ToDoSnapshotType { }
export const createToDoDefaultModel = () => types.optional(ToDoModel, {})
