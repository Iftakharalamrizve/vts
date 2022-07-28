import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View,Text } from "react-native";
import { ListItem, Avatar , Switch } from 'react-native-elements';
import * as vehicleAction from "../store/actions/vehicle";
import Loading from "../components/Loading";
import Toaster from "../components/Toaster";
import * as validation from "../store/actions/validator";
import {updateVehicleSettings, vehicleSetting} from "../store/actions/vehicle";
import * as expenseAction from "../store/actions/accounts";
import * as settingAction from "../store/actions/settings";


const Settings = ({ navigation, props }) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const isFocused = useIsFocused();
    const list = [
        {
            name: 'App Notification',
            column_name:'app_notification'
        },
        {
            name: 'Email Notification',
            column_name:'email_notification'
        },
        {
            name: 'Over Speed Alert',
            column_name:'over_speed_alert'
        },
        {
            name: 'Range Alert',
            column_name:'range_alert'
        },
        {
            name: 'SMS Option',
            column_name:'sms_option'
        }
    ]

    useEffect(() => {
        const tryCalledSettingsInfo = async () => {
            dispatch(settingAction.setLoadingStatus(true));
            dispatch(vehicleAction.vehicleSetting());
            dispatch(settingAction.setLoadingStatus(false));
        };
        tryCalledSettingsInfo();
    }, [isFocused]);

    //state related operation
    const vehicleSettingsInfo = useSelector(
        (state) => state.vehicle.vehicleSettingsInfo
    );

    const vehicleSettingsStatusChange = async (status,name,idx) => {
        console.log(status,name,idx);
        vehicleSettingsInfo[name] = status ;
        dispatch(settingAction.setLoadingStatus(true));
        try {
            await dispatch(vehicleAction.updateVehicleSettings(vehicleSettingsInfo));
            await dispatch(settingAction.setLoadingStatus(false));
            dispatch({
                type: "SET_TOAST",
                data: {
                    status: true,
                    messege: list[idx].name + " Status Update Successfully",
                    type: "success",
                },
            });
        } catch (error) {
            await dispatch(settingAction.setLoadingStatus(false));
            dispatch({
                type: "SET_TOAST",
                data: {
                    status: true,
                    messege: list[idx].name + " Status Not Updated",
                    type: "error",
                },
            });
        }
    }

    const [switch1, setSwitch1] = useState(true);


    return (
        <View style={styles.mainView}>
            {vehicleSettingsInfo != null ?
                list.map((item, i) => (
                    <View  key={i} style={styles.listitem} >
                        <Text>{item.name}</Text>
                        <Switch
                            value={vehicleSettingsInfo[item.column_name]}
                            onValueChange={() => vehicleSettingsStatusChange(vehicleSettingsInfo[item.column_name]==1?0:1,item.column_name,i)}
                        />
                    </View>
                )) :null
            }
            <Loading />
            <Toaster />
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        height: "100%",

    },
    listitem:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal:20,


    }

});

export default Settings;
