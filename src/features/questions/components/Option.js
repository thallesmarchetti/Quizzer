import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Option = ({ text, onPress, enableGreen, enableRed }) => (
    <TouchableOpacity
        style={[
            styles.optionButton,
            enableGreen ? styles.optionGreenButton : null,
            enableRed ? styles.optionRedButton : null
        ]}
        onPress={onPress}>
        <Text style={[
            styles.optionButtonText,
            enableGreen || enableRed ? styles.optionSelectedButtonText : null
        ]}>
            {text}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    optionButton: {
        borderRadius: 43,
        height: 60,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.29,
        elevation: 5,
        marginBottom: 15
    },
    optionButtonText: {
        fontSize: 24,
        color: 'black'
    },
    optionGreenButton: {
        backgroundColor: '#00C708',
    },
    optionRedButton: {
        backgroundColor: '#FF9B9B',
    },
    optionSelectedButtonText: {
        color: '#fff',
    },
});

export default Option;