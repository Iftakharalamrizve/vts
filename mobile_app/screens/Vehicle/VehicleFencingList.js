import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import { appPrimaryColor } from "../../configs/colors";
import FencingListModal from "./FencingListModal";
import { fencingList} from "../../store/actions/fencing";
import {connect} from "react-redux";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const initialLocation ={
  latitude: 23.810331,
  longitude: 90.412521,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01 * ASPECT_RATIO,
}

 class VehicleFencingList extends Component {
      constructor(props) {
        super(props);
        this.state = {
          currentLocation: null,
          region: {
            ...initialLocation,
          },
          fencingListModal: false,
        };
      }

      async componentDidMount() {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }
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
            currentLocation: newRegion,
          });
          await this.props.fencingList();
        } catch (error) {}
      }

      onMarkerDragEnd = (coord) => {
        this.setState({
          pin: coord,
        });
      };

      createRouteForVehicleFencingCreate = (item) => {
          this.props.navigation.navigate("FencingCreate", item);
      };

     markerGenerate = (fencingList) => {
         var markerList = fencingList.map((item, index) => {
             return (
                 <View key={index}>
                     <Marker
                         coordinate={{...this.state.region,latitude:item.lat,longitude:item.long}}
                         pinColor="black"
                         title={item.title}
                         draggable={false}
                     >
                         <Image source={require("../../assets/marker.png")} />
                     </Marker>
                     <Circle
                         strokeWidth={2}
                         strokeColor="#C9E4D1"
                         fillColor="#C9E4D1"
                         geodesic={true}
                         center={{...this.state.region,latitude:item.lat,longitude:item.long}}
                         radius={parseInt(item.radius)}
                     />
                 </View>
             );
         });
         return markerList;
     };

  render() {

    const { fencingListModal, region , pin } = this.state;
    const { item } = this.props.route.params;
    const {fencingList} = this.props.fencingState ;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          userLocationPriority="high"
          provider={PROVIDER_GOOGLE}
          moveOnMarkerPress={true}
        >
            {fencingList!==undefined?this.markerGenerate(fencingList):null}
        </MapView>
        <View style={styles.fenchingListButtonVIew}>
          <TouchableOpacity
            onPress={() => this.setState({ fencingListModal: true })}
            style={styles.IconStyle}
          >
            <AntDesign name="bars" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.createRouteForVehicleFencingCreate(item);
            }}
            style={styles.IconStyle}
          >
            <AntDesign name="pluscircleo" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <FencingListModal
            visitModal={fencingListModal}
            setModalVisible={(value) =>
                this.setState({fencingListModal: value})
            }
            item={item}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fencingState: state.fencing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fencingList: () => {
      dispatch(fencingList(""));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehicleFencingList);
const styles = StyleSheet.create({
  fenchingListButtonVIew: {
    width: width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  IconStyle: {
    backgroundColor: appPrimaryColor,
    padding: 5,
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
