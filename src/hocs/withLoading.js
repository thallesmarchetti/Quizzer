import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const withLoading = Component => props => {
    return (
        <>
            <Component {...props} />

            {props.loading && (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ccc',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withLoading;