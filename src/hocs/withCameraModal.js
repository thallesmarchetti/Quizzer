import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const withCameraModal = Component => {
    return class CameraModal extends React.Component {
        state = {
            pictureUri: null,
            modalVisible: false,
            loading: false
        };

        setModalVisible = modalVisible => {
            this.setState({ modalVisible });
        };

        setLoading = loading => {
            this.setState({ loading });
        };

        takePicture = async () => {
            if (this.camera) {
                const options = {
                    quality: 0.5,
                    base64: true
                };

                this.setLoading(true);
                const data = await this.camera.takePictureAsync(options);
                this.setLoading(false);

                this.setState({ pictureUri: data.uri });
                this.setModalVisible(false);
            }
        };

        render() {
            return (
                <>
                    <Component
                        pictureUri={this.state.pictureUri}
                        openCameraModal={() => this.setModalVisible(true)}
                        closeCameraModal={() => this.setModalVisible(false)}
                        {...this.props}
                    />

                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}>
                        <View style={styles.container}>

                            <RNCamera
                                ref={cameraRef => {
                                    this.camera = cameraRef;
                                }}
                                style={styles.cameraPreview}
                                type={RNCamera.Constants.Type.front}
                                flashMode={RNCamera.Constants.FlashMode.auto}
                                captureAudio={false}
                                androidCameraPermissionOptions={{
                                    title: 'Permissão para usar a câmera',
                                    message: 'Precisamos da permissão para utilizar a sua câmera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancelar'
                                }}
                            />

                            <TouchableOpacity
                                onPress={this.takePicture}
                                disabled={this.state.loading}
                                style={styles.captureButton}
                            />
                        </View>
                    </Modal>
                </>
            );
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,
    },
});


export default withCameraModal;