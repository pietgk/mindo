import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { ToDo } from "../../models"
import { Button, TextField } from ".."
import { State } from "react-powerplug"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing[1],
}

const STATE: TextStyle = {
  flex: 1,
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
  justifyContent: 'center',
  alignItems: 'center',
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
  justifyContent: 'center',
  alignItems: 'center',
}

const INPUT: TextStyle = {
  backgroundColor: color.transparent,
}

const FIELD: ViewStyle = {
  alignItems: 'center',
}

export interface ToDoItemProps {
  todo: ToDo
  style?: StyleProp<ViewStyle>
}

/**
 * ToDo list item
 */
export const ToDoItemNew = observer(function ToDo(props: ToDoItemProps) {
  const { style, todo } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={STATE}>{todo.state}</Text>
      <State initial={{ value: todo.task }}>
        {({ state, setState }) => (
          <TextField
            style={FIELD}
            inputStyle={INPUT}
            onEndEditing={() => state.value.length > 0 && todo.setTask(state.value)}
            onChangeText={(value) => setState({ value })}
            value={state.value}
          />
        )}
      </State>
    </View>
  )
})

const BUTTONS: ViewStyle = {
  flexDirection: "row",
}

const BUTTON: ViewStyle = {
  marginLeft: spacing[1],
}

export const ToDoItem = observer(function ToDo(props: ToDoItemProps) {
  const { style, todo } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT}>{todo.state}</Text>
      <State initial={{ value: todo.task }}>
        {({ state, setState }) => (
          <TextField
            style={FIELD}
            inputStyle={INPUT}
            onEndEditing={() => state.value.length > 0 && todo.setTask(state.value)}
            onChangeText={(value) => setState({ value })}
            value={state.value}
          />
        )}
      </State>
      <View style={BUTTONS}>
        <Button style={BUTTON} text="Complete" preset="command" onPress={() => todo.complete()} />
        <Button style={BUTTON} text="Delete" preset="command" onPress={() => todo.delete()} />
      </View>
    </View>
  )
})

/**
  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    })
  
    return (
      <View style={swipedRow}>
        <View style={swipedConfirmationContainer}>
          <Text style={deleteConfirmationText}>Are you sure?</Text>
        </View>
        <Animated.View style={[deleteButton, { opacity }]}>
          <TouchableOpacity onPress={() => todo.delete()}>
            <Text style={deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
  
    <Swipeable key={todo.id} renderRightActions={renderRightActions}>
    </Swipeable>

    <View style={BUTTONS}>
        <Button style={BUTTON} text="Complete" preset="command" onPress={() => todo.complete()} />
        <Button style={BUTTON} text="Delete" preset="command" onPress={() => todo.delete()} />
    </View>
 */
