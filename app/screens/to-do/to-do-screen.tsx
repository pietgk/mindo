import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Header, GradientBackground, Screen, TextField, ToDoList } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { State } from "react-powerplug"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const INPUT_CONTAINER: ViewStyle = {
  padding: 8,
  marginBottom: 4,
  backgroundColor: color.transparent,
}
const INPUT: TextStyle = {
  borderColor: color.text,
  backgroundColor: color.transparent,
  borderWidth: 1,
  padding: 8,
  borderRadius: 20,
  // color: color.primaryDarker
}

export const ToDoScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const { todoStore } = useStores()

    return (
      <View testID="ToDoListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#111b11"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="todoScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <ToDoList />
          <State initial={{ value: "" }}>
            {({ state, setState }) => (
              <TextField
                style={INPUT_CONTAINER}
                inputStyle={INPUT}
                onEndEditing={() => state.value.length > 0 && todoStore.addToDo(state.value)}
                onChangeText={(value) => setState({ value })}
                value={state.value}
                placeholderTx="todoScreen.placeholder"
                labelTx="todoScreen.prompt"
              />
            )}
          </State>
        </Screen>
      </View>
    )
  },
)
