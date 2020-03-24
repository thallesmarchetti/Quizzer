import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Row, Col, Icon } from 'native-base';

const UserHeader = ({ user, size, onPressIcon, uri }) => (
    <Row size={size} style={styles.userHeader}>
        <Col size={10} style={styles.userIconContainer}>
            <TouchableOpacity onPress={onPressIcon}>
                {
                    uri &&
                    <Image source={{ uri }} style={styles.userPicture} />
                }
                {
                    !uri &&
                    <Icon name="user" type="FontAwesome5" style={styles.userIcon} />
                }
            </TouchableOpacity>
        </Col>
        <Col size={90} style={styles.userNameContainer}>
            <Text style={styles.ninjaText}>React Ninja</Text>
            <Text style={styles.loggedUserText}>{user}</Text>
        </Col>
    </Row>
);

const styles = StyleSheet.create({
    userHeader: {
        padding: 30
    },
    userIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    userIcon: {
        color: 'white'
    },
    userNameContainer: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    ninjaText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    loggedUserText: {
        fontSize: 15,
        color: '#9C92D8',
        fontWeight: 'bold'
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
});

export default UserHeader;