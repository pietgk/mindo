export const reloadApp = async () => {
  await device.launchApp() // Why is this one also needed to not get an error on the next line
  await device.reloadReactNative()
}