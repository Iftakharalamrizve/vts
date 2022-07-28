import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from '../../components/Modal';
import Button from "../../components/Button";
import Input from "../../components/Input";
import {updateVehicleSpeedLimit, vehicleList} from "../../store/actions/vehicle";
import {connect} from "react-redux";
import {setLoadingStatus, setToastMessage} from "../../store/actions/settings";
import Loading from "../../components/Loading";
import Toaster from "../../components/Toaster";

class VehicleSpeedModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            inputs:{
                over_speed_limit:this.props.item.over_speed_limit
            }
        }
    }
    async updateOverSpeedLimitAction(){
        try {
            this.props.setLoadingStatus(true);
            await this.props.updateVehicleSpeedLimit(this.state.inputs,this.props.item.vehicle_id);
            this.props.setLoadingStatus(false);
            this.props.setToastMessage('Update Vehicle Speed Successfully','success');
        }catch (error) {
            this.props.setLoadingStatus(false);
            this.props.setToastMessage('Can Not Update Vehicle Speed ','error');
            this.props.setLoadingStatus(false);
        }
    }
    render() {
        const { visitModal, setModalVisible, item } = this.props;
        const {inputs} = this.state
        return (
            <Modal visible={visitModal} title='Over Speed & Range Setting' setModalVisible={setModalVisible}>
                <View style={{ paddingHorizontal: 20,paddingVertical:15}}>
                    <Input
                        name="over_speed_limit"
                        value={inputs.over_speed_limit}
                        placeholder="Over Speed Limit"
                        onChangeText={(text) =>
                            this.setState({inputs:{...inputs,over_speed_limit:text}})
                        }
                        secondary
                        keyboardType="number-pad"
                    />
                    <Button
                        title='Update Speed Limit'
                        containerStyle={styles.button}
                        onPress={()=>{this.updateOverSpeedLimitAction()}}
                    />
                </View>
                <Loading />
                <Toaster />
            </Modal>
        );
    }
}

VehicleSpeedModal.propTypes = {
    visitModal: PropTypes.bool,
    setModalVisible: PropTypes.func,
    navigation:PropTypes.object
};
VehicleSpeedModal.defaultProps = {
    visitModal: false,
    item:{}
};
const styles = StyleSheet.create({
    button: {
        marginVertical: 30,
    },
});


const mapStateToProps = (state) => {
    return { vehicleState: state.vehicle };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingStatus:(status) =>{
            dispatch(setLoadingStatus(status));
        },
        setToastMessage:(message,type) =>{
            var data = {
                status: true,
                messege: message,
                type: type,
            }
            dispatch(setToastMessage(data));
        },
        updateVehicleSpeedLimit:(info,id) =>{
            dispatch(updateVehicleSpeedLimit(info,id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehicleSpeedModal);
