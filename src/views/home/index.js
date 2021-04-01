import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Custom } from '../../styles';
import { serviceActions } from '../../store/actions';
import { Colors } from '../../styles';



// components 
import CustomSearchInput from '../../components/atoms/CustomSearchInput';
import ServicesView from '../../components/Layouts/ServicesView';
import CustomFooter from '../../components/atoms/CustomFooter';


function mapStateToProps(state) {
  const {
    loading,
    services
  } = state.services;

  return {
    loading,
    services
  };
}

function mapDispatchToProps(dispatch) {

  return {
    getServices: () => dispatch(serviceActions.getServices())
  };
}


class HomeScreen extends PureComponent {

  state = {
    services: [],
    arrayholder: [],
    searchString: ''
  }

  // arrayholder = allServices


  searchFilterFunction = text => {
    this.setState({
      searchString: text
    })
 
    const newData = this.state.arrayholder.filter(item => {
      const itemData = `${item.category.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      services: newData
    });

  };


  async componentDidMount() {
    const { getServices, services } = this.props;

    await getServices();

    this.setState({
      services,
      arrayholder: services
    });
  }

  componentDidUpdate(prevProps) {
    const { services } = this.props;

    if (services !== prevProps.services && services) {
      this.setState({
        services,
        arrayholder: services
      });
    }
  }

  render() {
    const { navigation, loading } = this.props;
    var { searchString, services } = this.state;

    return (
      <View style={styles.customBackground}>
        <View style={styles.content}>
          <View style={[styles.textCenter, Custom.mv30]}>
            <Text style={styles.boldText}>How can we help you today?</Text>
          </View>
          <CustomSearchInput
            placeholder='Search for a service'
            value={searchString}
            onChangeText={text => this.searchFilterFunction(text)} />
          <Text style={[styles.boldText, Custom.mt40, Custom.mb20]}>Services</Text>
          <ServicesView services={services} navigation={navigation} />
        </View>
        {
          loading
            ?
            <View style={styles.overlay}>
              <ActivityIndicator size='large' color={Colors.PRIMARY} />
            </View>
            :
            null
        }
        <CustomFooter />
      </View>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
