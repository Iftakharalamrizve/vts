import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet, TouchableOpacity, View
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { appPrimaryColor } from "../../configs/colors";
import FencingCreateFormModal from "./FencingCreateFormModal";
import {connect} from "react-redux";
import {createFencing} from "../../store/actions/fencing";
import {setLoadingStatus, setToastMessage} from "../../store/actions/settings";
import {clearValidaton, createValidator} from "../../store/actions/validator";
import Loading from "../../components/Loading";
import Toaster from "../../components/Toaster";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const initialLocation ={
  latitude: 23.810331,
  longitude: 90.412521,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01 * ASPECT_RATIO,
}

 class VehicleFencingCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fencingCreateModal:false,
      currentLocation: null,
      itemInfo : this.props.route.params,
      pin: {
        ...initialLocation
      },
      region: {
        ...initialLocation
      },
      createInfo:{
        title:'',
        lat:'',
        long:'',
        radius:100,
        in_notification:1,
        out_notification:1,
        notification_status:1
      },
      afterCreateInfo:{}
    };
  }

  async componentDidMount() {
    this.props.Validator();
    await  this.getCurrentLocationAndFormatData();
  }

  getCurrentLocationAndFormatData = async () =>{
    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      let newRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * ASPECT_RATIO,
      };
      await this.setState({
        region: newRegion,
        pin: newRegion,
        currentLocation:newRegion,
        createInfo:{
          ...this.state.createInfo,
          lat:newRegion.latitude,
          long:newRegion.longitude,
          title:'',
          radius:100,
          in_notification:1,
          out_notification:1,
          notification_status:1,
          vehicle_id:this.props.route.params.vehicle_id
        },
      });
    } catch (error) {

    }
 }

  onMarkerDragEnd = (coord) => {
    this.setState({
      pin: coord,
      createInfo:{...this.state.createInfo,lat:coord.latitude,long: coord.longitude}
    });
  };

  saveFencingInfo = async () =>{
    const {createInfo} = this.state;
    try {
       await this.setState({fencingCreateModal: false})
       this.props.Validator();
       this.props.setLoadingStatus(true);
       await  this.props.createFencing(createInfo)
       await  this.getCurrentLocationAndFormatData();
       this.props.setLoadingStatus(false);
       await  this.props.setToastMessage('Create Fencing Successfully','success');

    }catch (error) {
         this.props.Validator(error);
         this.props.setLoadingStatus(false);
         this.props.setToastMessage('Can Not Create Fencing ','error');
         this.props.setLoadingStatus(false);
    }
  }

  render() {
    const { pin, region, fencingCreateModal , createInfo } = this.state;
    console.log("renderdeXXX");
    const item  = this.props.route.params;
    return (
        <>
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="Search Your Fencing Location"
              fetchDetails={true}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              onPress={(data, details = null) => {
                this.setState({
                  pin: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01 * ASPECT_RATIO,
                  },
                  region: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01 * ASPECT_RATIO,
                  },
                  createInfo:{...this.state.createInfo,lat:details.geometry.location.lat,long:details.geometry.location.lng}
                });
              }}
              query={{
                key: "AIzaSyC6GM52G_Zf5-U9Ta22uSQAz_lGQEGq05I",
                language: "en",
                components: "country:BD",
                types: "establishment",
                radius: 30000,
                location: `${this.state.region.latitude}, ${this.state.region.longitude}`,
              }}
              //test
              styles={{
                textInput: styles.textInput,
                container: styles.autocompleteContainer,
                separator: styles.separator,
                listView: styles.listView,
              }}
            />
            <MapView
              style={styles.map}
              showsUserLocation={true}
              region={region}
              userLocationPriority="high"
              provider={PROVIDER_GOOGLE}
              moveOnMarkerPress={true}
            >
              <Marker coordinate={pin}>
                <Image source={require("../../assets/marker.png")} />
              </Marker>
              <Marker
                coordinate={pin}
                pinColor="black"
                draggable={true}
                onDragEnd={(e) => {
                  this.onMarkerDragEnd(e.nativeEvent.coordinate);
                }}
              >
                <Image source={require("../../assets/marker.png")} />
              </Marker>
              <Circle
                strokeWidth={2}
                strokeColor="#C9E4D1"
                fillColor="#C9E4D1"
                geodesic={true}
                center={pin}
                radius={parseInt(createInfo.radius)}
              />
            </MapView>

            <FencingCreateFormModal
                visitModal={fencingCreateModal}
                setModalVisible={(value) =>
                    this.setState({fencingCreateModal: value})
                }
                setStateProperty={(item)=>{this.setState({createInfo:{...createInfo,...item}})}}
                saveCreateInfo={this.saveFencingInfo}
                createInfo={createInfo}
                item={item}
            />
          </View>
          <TouchableOpacity
              onPress={() => this.setState({ fencingCreateModal: true })}
              style={styles.IconStyle}
          >
            <MaterialIcons name="add-location" size={30} color="white" />
          </TouchableOpacity>
          <Loading />
          <Toaster />
        </>
          );
  }
}

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFencing: async (data) => {
      return await  dispatch(createFencing(data));
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
    Validator:(error = null) =>{
      if(error !== null){
        dispatch(createValidator(error))
      }else{
        clearValidaton
        dispatch(clearValidaton())
      }

    }

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehicleFencingCreate);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  autocompleteContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    zIndex: 1,
    top: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#cccc",
  },
  textInput: {
    color: "black",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
  row: {
    height: 40,
  },
  IconStyle: {
    backgroundColor: appPrimaryColor,
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    padding: 5,
    right: 12,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    color: "white",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
});
