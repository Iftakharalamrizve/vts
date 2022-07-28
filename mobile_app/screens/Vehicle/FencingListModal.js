import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {StyleSheet,TouchableOpacity, Text, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { CheckBox, Switch } from "react-native-elements";
import Modal from '../../components/Modal';
import {connect} from "react-redux";
import {updateFencing,deleteFencing} from "../../store/actions/fencing";
import {setLoadingStatus, setToastMessage} from "../../store/actions/settings";
import Loading from "../../components/Loading";
import Toaster from "../../components/Toaster";


class FencingListModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      checked: true
    }
  }
  changeFencingOption = async (item,id)=>{
    try {
        this.props.setLoadingStatus(true);
        await  this.props.updateFencingOperation(item,id);
        this.props.setLoadingStatus(false);
        this.props.setToastMessage('Update Fencing Successfully','success');
    }catch (error) {
         this.props.setLoadingStatus(false);
         this.props.setToastMessage('Can Not Update Fencing ','error');
         this.props.setLoadingStatus(false);
    }
  }

  deleteFencing = async (id)=>{
    try {
        this.props.setLoadingStatus(true);
        await  this.props.deleteFencingInfo(id);
        this.props.setLoadingStatus(false);
        this.props.setToastMessage('Delete Fencing Successfully','success');
    }catch (error) {
        this.props.setLoadingStatus(false);
        this.props.setToastMessage('Can Not Delete Fencing ','error');
        this.props.setLoadingStatus(false);
    }
  }
  fencingListGenerate = (fencingList) => {
    var fencingList = fencingList.map((item, index) => {
      return (
            <View style={styles.rowStyle} key={index}>
              <Text style={styles.nameSectionStyle}>{item.title}</Text>
              <Text style={styles.actionStyle}>
                <CheckBox
                  checked={item.in_notification  === 1 ? true:false}
                  onPress={() => this.changeFencingOption({in_notification: item.in_notification===1?0:1},item.fencing_id)}
                />
              </Text>
              <Text style={styles.actionStyle}>
                <CheckBox
                  checked={item.out_notification  === 1 ? true:false}
                  onPress={() => this.changeFencingOption({out_notification: item.out_notification===1?0:1},item.fencing_id)}
                />
              </Text>
              <Text style={styles.actionStyle}>
                <Switch
                    value={item.notification_status === 1 ? true:false}
                    onValueChange={(value) => this.changeFencingOption({notification_status:value=='true'?1:0},item.fencing_id)}
                />
              </Text>

              <View style={styles.actionStyle2}>
                <TouchableOpacity
                  onPress={() => {this.deleteFencing(item.fencing_id)}}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
      );
    });
    return fencingList;
  };

  render() {
    const { visitModal, setModalVisible, item , fencingState } = this.props;
    const { checked } = this.state;
    return (
      <>
          <Modal
              visible={visitModal}
              title={item.plate_number}
              setModalVisible={setModalVisible}
          >
              <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                  <View style={styles.rowStyle}>
                      <Text style={styles.nameSectionStyle}></Text>
                      <Text style={styles.actionStyle}>In</Text>
                      <Text style={styles.actionStyle}>Out</Text>
                      <Text style={styles.actionStyle}>On/Off</Text>
                      <Text style={styles.actionStyle}></Text>
                  </View>
                  {fencingState.fencingList!==undefined?this.fencingListGenerate(fencingState.fencingList):null}

              </View>
              <Loading />
              <Toaster />
          </Modal>
      </>
    );
  }
}

FencingListModal.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  navigation: PropTypes.object,
};
FencingListModal.defaultProps = {
  visitModal: false,
  item: {},
};

const mapStateToProps = (state) => {
  return {
    fencingState: state.fencing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFencingOperation: async (data,id) => {
       await  dispatch(updateFencing(data,id));
    },
    deleteFencingInfo: async (id) => {
       await  dispatch(deleteFencing(id));
    },
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FencingListModal);

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 40,
    borderColor: "#ccc",
    padding: 5,
  },
  nameSectionStyle: {
    display: "flex",
    flex: 2,
  },
  actionStyle: {
    display: "flex",
    flex: 1,
  },
  actionStyle2: {
    display: "flex",
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
  },

});
