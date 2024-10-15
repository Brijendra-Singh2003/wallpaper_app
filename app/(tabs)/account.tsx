import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function account() {
  return (
    <SafeAreaView>
      <Text style={styles.text}>account</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  }
})