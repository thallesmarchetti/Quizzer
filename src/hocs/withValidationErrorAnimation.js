import React from 'react';
import * as Animatable from 'react-native-animatable';

const withValidationErrorAnimation = ComponentToEnrich => props => {
    return (
        <Animatable.View
            animation={props.shouldShake ? 'shake' : ''}
            duration={props.duration}>
            <ComponentToEnrich {...props} />
        </Animatable.View>
    );
};

export default withValidationErrorAnimation;
