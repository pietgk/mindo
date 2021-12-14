/* eslint-disable react-native/no-color-literals */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"
import { Animated, StyleSheet, Text, View, I18nManager, Alert } from "react-native"

import { RectButton } from "react-native-gesture-handler"

import Swipeable from "react-native-gesture-handler/Swipeable"

export default class AppleStyleSwipeableRow extends Component {
  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })
    const pressHandler = () => {
      this.close()
      Alert.alert(text)
    }

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {this.renderRightAction("Completed", "#ffab00", 128, progress)}
      {this.renderRightAction("Delete", "#dd2c00", 64, progress)}
    </View>
  )

  private swipeableRow?: Swipeable

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref
  }

  private close = () => {
    this.swipeableRow?.close()
  }

  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  actionText: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
