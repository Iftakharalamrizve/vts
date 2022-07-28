import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from "react-native-elements";
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import { vehicleList } from '../../store/actions/vehicle';



class VehicleSearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery:''
        };
    }
    
    
    async componentDidMount() {
        await this.props.vehicleList(this.state.searchQuery);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            await this.props.vehicleList(this.state.searchQuery);
        }
    }

    VehicleListItem = ({ item }) => {
        return (
            <ListItem bottomDivider >
                <Avatar
                    title="Test"
                    source={{
                    uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.model_number}({ item.band})</ListItem.Title>
                    <ListItem.Subtitle>{item.plate_number}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    render() {
      const {visitModal, setModalVisible , vehicleState} = this.props;
        return (
        <Modal visible={visitModal} title="Search Vehicle" setModalVisible={setModalVisible}>
            <View style={{ paddingHorizontal: 20,paddingVertical:15}}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => {this.setState({ searchQuery: text })}}
                    value={this.state.searchQuery}
                />
                <FlatList
                    data={vehicleState.vehicleSearchList}
                    renderItem={item => this.VehicleListItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </Modal>
        );
    }
}

VehicleSearchModal.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  vehicleState:PropTypes.object
};
VehicleSearchModal.defaultProps = {
  visitModal: false,
  
};

const mapStateToProps = (state) => {
    return { vehicleState: state.vehicle };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        vehicleList:(data)=>{dispatch(vehicleList(data))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VehicleSearchModal);