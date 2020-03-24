import React from 'react';
import { StyleSheet } from 'react-native';
import { Row } from 'native-base';

const Card = ({ children, size }) => (
    <Row size={size} style={styles.card}>
        {children}
    </Row>
);

const styles = StyleSheet.create({
    card: {
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
});

export default Card;