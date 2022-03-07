import React from 'react'
import {
  StyleSheet,
  View,
  Modal as ReactNativeModal,
  ModalProps,
  Pressable,
  Image
} from 'react-native'

// types
interface Props extends ModalProps {
  closeModal: () => void
  backgroundColor?: string
}

export function Modal({
  children,
  closeModal,
  backgroundColor = 'white',
  ...rest
}: Props) {
  return (
    <ReactNativeModal transparent animationType="fade" {...rest}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }]}>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Image
              style={styles.closeButtonImage}
              width={30}
              height={30}
              source={require('../../../assets/nuevo-gasto.png')}
            />
          </Pressable>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    position: 'relative'
  },
  content: {
    padding: 16,
    paddingTop: 48
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  closeButtonImage: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '45deg' }]
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
