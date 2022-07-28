import PropTypes from "prop-types";
import React, {Component, useState} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, View , TouchableOpacity , Text} from "react-native";
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {appPrimaryColor} from "../../configs/colors";


class FencingCreateFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs:{...this.props.createInfo},
      prevStateInput:{...this.props.createInfo}
    };
  }
  componentDidMount() {
    delete this.state.inputs.lat;
    delete this.state.inputs.long;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState !== this.state){
      this.props.setStateProperty(this.state.inputs);
    }
    if(prevProps.visitModal !== this.props.visitModal){
      delete this.state.prevStateInput.lat;
      delete this.state.prevStateInput.long;
      this.state.inputs = this.state.prevStateInput
    }
  }

  render() {
    const { visitModal, setModalVisible, item  } = this.props;
    const {inputs} = this.state;
    return (
      <Modal
        visible={visitModal}
        title={item.plate_number}
        setModalVisible={setModalVisible}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={{display:'flex',flexDirection:'row'}}>
                  <View style={{display:'flex',flex:3,marginRight:5}}>
                    <Text>Name</Text>
                    <Input
                        name="title"
                        value={inputs.title}
                        placeholder="Name"
                        onChangeText={(text) =>
                            this.setState({inputs:{...inputs,title:text}})
                        }
                        secondary
                    />

                  </View>
                  <View style={{display:'flex',flex:2,marginLeft:5}}>
                    <Text>Radius</Text>
                    <Input
                        value={inputs.radius}
                        name="radius"
                        placeholder="Radius"
                        onChangeText={(text) =>
                            this.setState({inputs:{...inputs,radius:text==0?100:text}})
                        }
                        secondary
                        keyboardType="number-pad"
                    />
                  </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{display:'flex',flex:1}}>Status : </Text>
                  <View style={{display:'flex',flex:2,marginVertical:3,flexDirection:'row',alignItems:'center'}}>
                    <RadioButton
                        value={inputs.notification_status}
                        status={ inputs.notification_status == 1 ? 'checked' : 'unchecked' }
                        onPress={() => this.setState({inputs:{...inputs,notification_status:1}})}
                    />
                    <Text>Active</Text>
                  </View>
                  <View style={{display:'flex',flex:2,flexDirection:'row',alignItems:'center'}}>
                    <RadioButton
                        value={inputs.notification_status}
                        status={ inputs.notification_status == 0 ? 'checked' : 'unchecked' }
                        onPress={() => this.setState({inputs:{...inputs,notification_status:0}})}
                    />
                    <Text>In Active</Text>
                  </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{display:'flex',flex:1}}>Option : </Text>
                  <View style={{display:'flex',flex:2}}>
                    <CheckBox
                        title='In'
                        checked={inputs.in_notification}
                        onPress={() =>this.setState({inputs:{...inputs,in_notification:inputs.in_notification===1?0:1}})}
                    />
                  </View>
                  <View style={{display:'flex',flex:2}}>
                    <CheckBox
                        title='Out'
                        checked={inputs.out_notification}
                        onPress={() =>this.setState({inputs:{...inputs,out_notification:inputs.out_notification===1?0:1}})}
                    />
                  </View>
                </View>
                <Button
                  title='Create GEO Fench'
                  containerStyle={styles.button}
                  onPress={()=>{this.props.saveCreateInfo()}}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}

FencingCreateFormModal.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  navigation: PropTypes.object,
};
FencingCreateFormModal.defaultProps = {
  visitModal: false,
  item: {},
};

const styles = StyleSheet.create({

  appButtonContainer: {
    backgroundColor:appPrimaryColor
  },
  textNotification: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 30,
  },
});
export default FencingCreateFormModal;
