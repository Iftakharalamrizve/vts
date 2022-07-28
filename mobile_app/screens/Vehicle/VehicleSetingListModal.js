import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from "react-native-elements";
import Modal from '../../components/Modal';

class VehicleSetingListModal extends Component {
    constructor(props) {
        super(props);
    }

    createVehicleSettingOperation = (item,type,optional=null) => {
        this.props.handleSettingPage(type,optional, { item: item });
    }

    render() {
        const { visitModal, setModalVisible, item } = this.props;
        return (
            <Modal visible={visitModal} title={item.plate_number} setModalVisible={setModalVisible}>
                <View style={{ paddingHorizontal: 20,paddingVertical:15}}>
                    <ListItem bottomDivider >
                        <ListItem.Content>
                            <ListItem.Title>History Play Back</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem onPress={()=>{this.createVehicleSettingOperation(item,'navigate','FencingList')}} bottomDivider >
                        <ListItem.Content>
                            <ListItem.Title>GEO Fencing</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem onPress={()=>{this.createVehicleSettingOperation(item,'showSpeedModal')}} bottomDivider >
                        <ListItem.Content>
                            <ListItem.Title>Over Speed</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider >
                        <ListItem.Content>
                            <ListItem.Title>Reports</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </Modal>
        );
    }
}

VehicleSetingListModal.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  navigation:PropTypes.object
};
VehicleSetingListModal.defaultProps = {
    visitModal: false,
    item:{}
};
export default VehicleSetingListModal;
