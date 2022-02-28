import React from 'react'
import { Modal, ModalProps, SafeAreaView, StyleSheet, View } from 'react-native'

// types
interface Props extends ModalProps {
  children: React.ReactNode
}

function CustomModal({ visible, children, ...restProps }: Props) {
  return (
    <View style={styles.container}>
      <Modal transparent animationType="slide" visible={visible} {...restProps}>
        <SafeAreaView style={styles.content}>{children}</SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1
  }
})

export default CustomModal
