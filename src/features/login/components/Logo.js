import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
    />
);

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    }
});

export default Logo;