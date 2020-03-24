import React from 'react';
import { Container, Row, Grid, Icon, Col } from 'native-base';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { UserHeader, Card, ContainerWithLoading } from '../../../components';
import { Option, ArrowNavigator } from '../components';
import { connect } from 'react-redux';
import { withCameraModal, withImagePicker } from '../../../hocs';
import { bindActionCreators } from 'redux';
import { previousQuestion, nextQuestion, selectOption, finishQuiz, fetchQuestions } from '../actions';

class Question extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions();
    }

    padStart = (expression) => {
        return (expression + "").padStart(2, '0');
    };

    _renderOptions = () => {
        const userChoice = this.props.userChoices.find(
            choice => choice.questionIndex === this.props.currentQuestion
        );
        let options = null;

        if (this.props.questions.length > 0) {
            options = this.props.question.options.map((option, index) => (
                <Option
                    key={index} text={option}
                    onPress={() => (!userChoice) ? this.props.selectOption(index) : null}
                    enableGreen={
                        userChoice &&
                        (
                            (userChoice.choiceIndex === index &&
                                userChoice.choiceIndex === this.props.question.rightAnswerIndex) ||
                            index === this.props.question.rightAnswerIndex
                        )
                    }
                    enableRed={
                        userChoice &&
                        userChoice.choiceIndex === index &&
                        userChoice.choiceIndex !== this.props.question.rightAnswerIndex
                    }
                />
            ))
        }

        return options;
    };

    isFirstQuestion = () => {
        return this.props.currentQuestion === 0;
    };

    isLastQuestion = () => {
        return this.props.currentQuestion + 1 === this.props.questions.length;
    };

    render() {
        return (
            <ContainerWithLoading
                style={styles.container}
                loading={this.props.loading}>
                {/* Cabeçalho */}
                <UserHeader
                    size={10}
                    user={this.props.loggedUser}
                    uri={this.props.pictureUri}
                    onPressIcon={this.props.openCameraModal}
                />

                {/* Card */}
                <Card size={90}>
                    <Grid>
                        <Row size={10}>
                            <Text style={styles.questionHeaderBig}>Perguntas {this.padStart(this.props.currentQuestion + 1)}/</Text>
                            <Text style={styles.questionHeaderSmall}>{this.padStart(this.props.questions.length)}</Text>
                        </Row>
                        <Row size={20} style={styles.questionTextContainer}>
                            <Text style={styles.questionText}>{this.props.question.name}</Text>
                        </Row>
                        <Row size={60}>
                            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                                {this._renderOptions()}
                            </ScrollView>
                        </Row>

                        <ArrowNavigator
                            size={10}
                            onPressPrev={this.props.previousQuestion}
                            onPressNext={this.props.nextQuestion}
                            leftDisabled={this.isFirstQuestion()}
                            rightDisabled={this.isLastQuestion()}
                            showFinishButton={this.props.userChoices.length === this.props.questions.length}
                            onPressFinish={this.props.finishQuiz}
                        />
                    </Grid>
                </Card>
            </ContainerWithLoading>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#412DB5'
    },
    questionHeaderBig: {
        fontSize: 24,
        color: '#412DB5',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    questionHeaderSmall: {
        fontSize: 16,
        color: '#412DB5',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    questionTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    questionText: {
        fontSize: 24,
        color: '#412DB5',
        textAlign: 'center'
    },
    scrollViewContainer: {
        padding: 5
    },
});

const mapStateToProps = (state) => {
    const { loggedUser } = state.loginReducer;
    const { questions, currentQuestion, userChoices, loading } = state.questionReducer;
    return {
        loggedUser,
        questions,
        currentQuestion,
        userChoices,
        question: questions.length > 0 ? questions[currentQuestion] : {},
        loading
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            previousQuestion,
            nextQuestion,
            selectOption,
            finishQuiz,
            fetchQuestions
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withCameraModal(withImagePicker(Question)));