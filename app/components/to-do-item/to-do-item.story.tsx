import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { ToDoItem } from "./to-do-item"
import { KSUid, ToDoModel, ToDoState } from "../../models"

storiesOf("ToDo", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ToDoItem
          style={{ backgroundColor: color.error }}
          todo={ToDoModel.create({ id: KSUid(), task: "buy milk", state: ToDoState.ACTIVE })}
        />
      </UseCase>
    </Story>
  ))
