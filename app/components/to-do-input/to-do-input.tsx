import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { flatten } from "ramda"
import { State } from "react-powerplug"
import { TextField } from ".."
import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const INPUT: TextStyle = {
  backgroundColor: color.transparent,
}

export interface ToDoInputProps {
  style?: StyleProp<ViewStyle>
}

export const ToDoInput = observer(function ToDoInput(props: ToDoInputProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])
  const { todoStore } = useStores()

  return (
    <State initial={{ value: "" }}>
      {({ state, setState }) => (
        <TextField
          style={styles}
          inputStyle={INPUT}
          onEndEditing={() => {
            if (state.value.length > 0) {
              todoStore.addToDo(state.value)
              setState({ value: ''})
            }
          }}
          onChangeText={(value) => setState({ value })}
          value={state.value}
          placeholderTx="todoScreen.placeholder"
        />
      )}
    </State>
  )
})
