import React from 'react';
import ImagePicker from 'react-native-image-picker';

const withImagePicker = Component => {
    return class ImagePickerComponent extends React.Component {
        state = {
            image: null
        };

        pickImage = () => {
            const options = {
                title: 'Selecione uma foto',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            };

            ImagePicker.launchImageLibrary(options, response => {
                if (response.didCancel) {
                    console.log('Usuário cancelou a escolha da imagem.');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    this.setState({
                        image: response.uri
                    });
                }
            });
        };

        render() {
            return (
                <Component
                    imagePickerSource={this.state.image}
                    openImagePicker={this.pickImage}
                    {...this.props}
                />
            );
        }
    }
};

export default withImagePicker;