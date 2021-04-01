import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, BackHandler, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom, Colors } from '../../styles';
import { faqActions } from '../../store/actions'

// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import CustomFooter from '../../components/atoms/CustomFooter';
import Accordion from '../../components/atoms/Accordion';
import CustomButton from '../../components/atoms/CustomButton';

// svg 
import Questions from '../../assets/svg/Questions.svg'

function mapStateToProps(state) {
    const { loading, faq } = state.faq;

    return {
        loading,
        faq
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFaq: () => dispatch(faqActions.getFaq()),
    };
}





class HelpScreen extends PureComponent {

    state = {
        searchString: ''
    }


    searchFilterFunction = text => {
        this.setState({
            searchString: text
        })

        // const newData = this.state.arrayholder.filter(item => {
        //   const itemData = `${item.category.toUpperCase()}`;

        //   const textData = text.toUpperCase();

        //   return itemData.indexOf(textData) > -1;
        // });

        // this.setState({
        //   services: newData
        // });

    };

    async componentDidMount() {
        const { getFaq } = this.props;

        await getFaq();
    }

    render() {
        var { searchString } = this.state;
        const { navigation, faq, loading } = this.props;

        return (
            <View style={styles.customBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    {/* <CustomSearchInput
                        placeholder='Search for frequently asked questions'
                        value={searchString}
                        onChangeText={text => this.searchFilterFunction(text)}
                    /> */}
                    <View style={styles.textCenter}>
                        <Questions />
                    </View>

                    {
                        !loading ?
                            (faq.map((faq, index) =>
                                <Accordion
                                    key={index}
                                    title={faq.question}
                                    data={faq.answer}
                                />
                            ))
                            :
                            <ActivityIndicator size="large" />
                    }


                    <CustomButton
                        title='Back'
                        buttonStyle={styles.buttonStyle}
                        customStyle={styles.secondaryButtonStyle}
                        buttonColor={Colors.WHITE}
                        onPress={() => navigation.goBack(null)}
                    />

                </ScrollView>
                <CustomFooter />
            </View>
        );
    }
}

const menu = [
    {
        title: 'Lorem ipsum dolor sit amet, consectetur',
        data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    {
        title: 'Lorem ipsum dolor sit amet, consectetur',
        data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
    },
    {
        title: 'Lorem ipsum dolor sit amet, consectetur',
        data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
    },
    {
        title: 'Lorem ipsum dolor sit amet, consectetur',
        data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    },
]

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HelpScreen);
