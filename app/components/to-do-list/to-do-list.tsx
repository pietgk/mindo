import React from "react"
import { StyleProp, ViewStyle, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { flatten } from "ramda"
import { useStores } from "../../models"
import { ToDoItem } from ".."
import AppleStyleSwipeableRow from "././apple-style-swipable-row"

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
export interface ToDoListProps {
  style?: StyleProp<ViewStyle>
}

export const ToDoList = observer(function ToDoList(props: ToDoListProps) {
  const todoArray = [...(useStores().todoStore?.todos?.values() ?? [])]
  const styles = flatten([FLAT_LIST, props.style])

  return (
    <FlatList
      contentContainerStyle={styles}
      data={todoArray}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <AppleStyleSwipeableRow>
          <ToDoItem todo={item} />
        </AppleStyleSwipeableRow>
      )}
    />
  )
})
