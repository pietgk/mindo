import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ToDoStoreModel } from "../to-do-store/to-do-store"
import { CharacterStoreModel } from "../character-store/character-store"

/**
 * A RootStore model.
 */
 // console.log(' 😀😀😀 todo store', JSON.stringify(types.optional(ToDoStoreModel, {}), null, 2))
 export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {}),
  todoStore: types.optional(ToDoStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
