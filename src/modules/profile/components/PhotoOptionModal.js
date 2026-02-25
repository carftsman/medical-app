import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PhotoOptionModal = ({ visible, onClose, onCamera, onGallery }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.option} onPress={onCamera}>
            <Text style={styles.text}>📷 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onGallery}>
            <Text style={styles.text}>🖼 Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={{ color: 'red' }}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default PhotoOptionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  option: {
    paddingVertical: 15
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  cancel: {
    paddingVertical: 15,
    alignItems: 'center'
  }
});