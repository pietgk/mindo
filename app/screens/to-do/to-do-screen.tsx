import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Header, GradientBackground, Screen, ToDoList, ToDoInput } from "../../components"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

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
  borderColor: color.text,
  borderRadius: 24,
  borderWidth: 1,
  marginHorizontal: 4,
  marginBottom: 16,
  backgroundColor: color.transparent,
}

export const ToDoScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

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
          <ToDoInput style={INPUT_CONTAINER} />
        </Screen>
      </View>
    )
  },
)
