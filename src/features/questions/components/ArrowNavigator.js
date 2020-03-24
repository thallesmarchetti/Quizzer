import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Row, Icon } from 'native-base';

const ArrowNavigator = ({
    size,
    onPressPrev,
    onPressNext,
    leftDisabled,
    rightDisabled,
    showFinishButton,
    onPressFinish
}) => (
        <Row size={size} style={styles.arrowButtonContainer}>
            {
                !showFinishButton && (
                    <>
                        <TouchableOpacity onPress={() => (!leftDisabled) && onPressPrev()}>
                            <Image
                                source={require('../../../assets/arrow.png')}
                                style={[
                                    styles.arrowImage,
                                    styles.arrowImageLeft,
                                    leftDisabled ? styles.opaque : null
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (!rightDisabled) && onPressNext()}>
                            <Image
                                source={require('../../../assets/arrow.png')}
                                style={[
                                    styles.arrowImage,
                                    rightDisabled ? styles.opaque : null
                                ]}
                            />
                        </TouchableOpacity>
                    </>
                )
            }
            {
                showFinishButton && (
                    <>
                        <View></View>
                        <TouchableOpacity onPress={() => onPressFinish()}>
                            <Icon
                                name="check"
                                type="FontAwesome5"
                                style={styles.finishIcon}
                            />
                        </TouchableOpacity>
                    </>
                )
            }
        </Row>
    );

const styles = StyleSheet.create({
    arrowButtonContainer: {
        justifyContent: 'space-between',
        marginBottom: 15
    },
    arrowImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    arrowImageLeft: {
        transform: [{
            rotateZ: '180deg'
        }]
    },
    opaque: {
        opacity: 0.2
    },
    finishIcon: {
        height: 50,
        width: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'green',
    },
});

export default ArrowNavigator;