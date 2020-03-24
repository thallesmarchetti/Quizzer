import React from 'react';
import { StyleSheet, Text, Image, FlatList, View } from 'react-native';
import { Container, Grid, Row, Col, Icon } from 'native-base';
import { UserHeader, Card } from '../../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRanking } from '../actions';

class Ranking extends React.Component {

    componentDidMount() {
        this.props.fetchRanking();
    }

    _renderUsers = item => {
        return (
            <View style={styles.userContainer}>
                <Icon name="user" type="FontAwesome5" style={styles.userIcon} />
                <Text style={styles.usernameText}>{item.name}</Text>
                <Text style={styles.usernameText}>{item.score}</Text>
            </View>
        );
    };

    render() {
        return (
            <Container style={styles.container}>
                <UserHeader size={10} user={this.props.loggedUser} />

                <Card size={90}>
                    <Grid>
                        <Row size={10}>
                            <Col>
                                <Text style={styles.title}>Ranking Board</Text>
                            </Col>

                            <Col>
                                <Image
                                    style={styles.image}
                                    source={require('../../../assets/prize.png')} />
                            </Col>
                        </Row>

                        <Row size={90}>
                            <FlatList
                                data={this.props.ranking}
                                renderItem={({ item }) => this._renderUsers(item)}
                                keyExtractor={item => item.id}
                                contentContainerStyle={styles.flatlist}
                            />
                        </Row>
                    </Grid>
                </Card>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#412DB5',
    },
    title: {
        fontSize: 24,
        color: '#412DB5',
        fontWeight: 'bold',
    },
    image: {
        resizeMode: 'contain',
        width: 32,
        height: 32,
        alignSelf: 'flex-end',
    },
    userContainer: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    usernameText: {
        fontSize: 22,
        color: '#412DB5',
        fontWeight: 'bold',
    },
    userIcon: {
        color: '#412DB5',
    },
    flatlist: {
        padding: 8,
    },
});

const mapStateToProps = state => {
    const { loggedUser } = state.loginReducer;
    const { ranking } = state.questionReducer;
    return {
        loggedUser,
        ranking
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchRanking
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
