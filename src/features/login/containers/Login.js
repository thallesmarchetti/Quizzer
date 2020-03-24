import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Grid, Row, Content, Form, Item, Label, Input, Button } from 'native-base';
import { Logo } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions';
import { withValidationErrorAnimation } from '../../../hocs';

const ShakeableForm = withValidationErrorAnimation(Form);

class Login extends React.Component {
    state = {
        shouldShake: false,
        shakeDuration: 300,
        inputName: ''
    };

    shake = () => {
        this.setState({ shouldShake: true }, () => {
            setTimeout(() => this.setState({ shouldShake: false }), this.state.shakeDuration);
        });
    };

    onSubmit = () => {
        if (this.state.inputName !== '') {
            // login
            this.props.loginUser(this.state.inputName);
            this.props.navigation.navigate('Question');
        } else {
            this.shake();
        }
    };

    render() {
        const { shouldShake, shakeDuration } = this.state;
        console.log("[render()] Init render", this.props);
        return (
            <Container style={styles.container}>
                <Grid>
                    <Row size={2} style={styles.logoContainer}>
                        <Logo />
                    </Row>                    
                    <Row size={1} style={styles.form}>
                        <Content>
                            <ShakeableForm
                                shouldShake={shouldShake}
                                duration={shakeDuration}>
                                <Item stackedLabel>
                                    <Label style={styles.label}>Seu Nome</Label>
                                    <Input
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({ inputName: text })}
                                    />
                                </Item>
                            </ShakeableForm>
                        </Content>
                    </Row>
                    <Row size={1}>
                        <Content>
                            <Button rounded block style={styles.button}
                                onPress={this.onSubmit}>
                                <Text style={styles.buttonText}>Iniciar</Text>
                            </Button>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#412DB5',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    form: {
        alignItems: 'center',
        padding: 50,
    },
    label: {
        color: '#9C92D8',
        fontSize: 22,
    },
    input: {
        color: 'white',
    },
    button: {
        backgroundColor: '#00C708',
        width: '50%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    }
});

const mapDispatchToProps = (dispatch) => {
    console.log('[mapDispatchToProps]', dispatch);
    return bindActionCreators({
        loginUser
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);