import { Feather } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import { appPrimaryColor } from "../configs/colors";
import { vehicleList } from "../store/actions/vehicle";
import VehicleSearchModal from "./Vehicle/VehicleSearchModal";
import VehicleSetingListModal from "./Vehicle/VehicleSetingListModal";
import io from "socket.io-client/dist/socket.io";
import VehicleSpeedModal from "./Vehicle/VehicleSpeedModal";


const { width, height } = Dimensions.get("window");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitSearchModal: false,
      visitSettingModal: false,
      vehicleSpeedRateModal:false,
      selectedVehicle: null,
      latitude:'23.75071833333333',
      longitude:'90.37441944444444',
      heading:'0',
    };
  }

  async componentDidMount() {
    console.log("APP STARTED");
    
    //socket server connection to receive data from gps device
    this.socket = io("http://118.67.215.228:3051");
    
    
    this.socket.on('lat-lng-received',async (data)=>{
      console.log(data.device_id);
      console.log(this.state)
      if(data.device_id=='0358735076069193'){
        this.setState({
          latitude:data.latitude,
          longitude:data.longitude,
          heading:data.orientation,
        });
        //  this.setState((state,props)=>({
        //   latitude:data.latitude,
        //   longitude:data.longitude,
        //   heading:data.orientation,
        // }));
        
      }
      
    });
    // await this.props.vehicleList();
  }
  componentDidUpdate(){
    console.log("component updated");
  }
  handleSettingPage = (type , navigationName, item) => {
    this.setState({ visitSettingModal: false });
    switch (type) {
        case 'navigate':
            this.props.navigation.navigate(navigationName,item);
            break;
        case 'showSpeedModal':
            this.setState({ vehicleSpeedRateModal: true });
            break;
        case 'updateSpeedInfo':
            this.props.updateVehicleSpeedLimit(item,this.selectedVehicle.id)
            break;
        default:
            this.setState({ vehicleSpeedRateModal: false });
    }

  };

  markerGenerate = () => {
    var markerList = this.props.vehicleState.vehicleList.map((item, index) => {
      // console.log(this.socket);
      return (
        <Marker.Animated
          key={index}
          coordinate={{
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
          }}

          onPress={() => {
            this.setState({ selectedVehicle: item, visitSettingModal: true });
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              transform: [{
                rotate: `${this.state.heading}deg`
              }]
            }}
            source={require("../assets/top-UberX.png")}
          />
        </Marker.Animated>
      );
    });
    return markerList;
  };

  getMapRegion = () => ({
    latitude: parseFloat(this.state.latitude),
    longitude: parseFloat(this.state.longitude),
    latitudeDelta: 0.002,
    longitudeDelta: 0.002 * (width / height),
  });
  render() {
    const ASPECT_RATIO = width / height;
    const { visitSearchModal, visitSettingModal, selectedVehicle , vehicleSpeedRateModal } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
        ref={ref => { this.map = ref }}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          zoomEnabled={true}
          showsScale={true}
          zoomControlEnabled={true}
          region={this.getMapRegion()}
          initialRegion={{
            latitude: 23.810331,
            longitude: 90.412521,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * ASPECT_RATIO,
          }}
          onLayout={() => {
            this.map.animateCamera({
               center: {
               latitude: this.state.latitude,
               longitude: this.state.longitude,
            },
               heading: 0,
               pitch: 90,
             });
          }}
        >
          {this.markerGenerate()}
        </MapView>
        <View style={styles.mainSearchButtonView}>
          <TouchableOpacity
            onPress={() => this.setState({ visitSearchModal: true })}
            style={styles.search}
          >
            <Feather style={styles.searchIcon} name="search" size={18} />
            <Text style={styles.inputText}> Vehicle </Text>
          </TouchableOpacity>
        </View>
        <VehicleSearchModal
          visitModal={visitSearchModal}
          setModalVisible={(value) =>
              this.setState({visitSearchModal: value})
          }
        />
          {selectedVehicle != null ? (
              <VehicleSpeedModal
                  visitModal={vehicleSpeedRateModal}
                  handleSettingPage={this.handleSettingPage}
                  setModalVisible={(value) =>
                      this.setState({vehicleSpeedRateModal: value})
                  }
                  item={selectedVehicle}
              />
          ) : null}

        {selectedVehicle != null ? (
          <VehicleSetingListModal
              visitModal={visitSettingModal}
              handleSettingPage={this.handleSettingPage}
              setModalVisible={(value) =>
                  this.setState({visitSettingModal: value})
              }
              item={selectedVehicle}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { vehicleState: state.vehicle };
};
const mapDispatchToProps = (dispatch) => {
  return {
    vehicleList: () => {
      dispatch(vehicleList(""));
    },
    updateVehicleSpeedLimit:(info,id) =>{
       dispatch(updateVehicleSpeedLimit(info,id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  mainSearchButtonView: {
    width: width,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  search: {
    width: 110,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 4,
    backgroundColor: appPrimaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
  inputText: {
    fontWeight: "700",
    color: "white",
  },
  textInput: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
    marginLeft: 20,
  },

  searchIcon: {
    fontWeight: "700",
    color: "white",
  },
});
