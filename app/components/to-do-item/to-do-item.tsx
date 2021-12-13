import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { ToDo } from "../../models"
import { Button } from ".."

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ToDoItemProps {
  todo: ToDo,
  style?: StyleProp<ViewStyle>
}

/**
 * ToDo list item
 */
export const ToDoItem = observer(function ToDo(props: ToDoItemProps) {
  const { style, todo } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT}>
        {todo.state} {todo.task}
      </Text>
      <Button text="Delete" preset="command" onPress={() => todo.delete()} />
    </View>
  )
})
