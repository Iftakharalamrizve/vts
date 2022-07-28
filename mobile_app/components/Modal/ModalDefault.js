import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Animated, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { appSecondaryColor } from '../../configs/colors';
import Card from '../Card';

const SCREEN = Dimensions.get('window');

class ModalDefault extends React.Component {
  constructor(props) {
    super(props);
    const {visible} = props;
    const opacity = visible ? 0.7 : 0;
    this.state = {
      visible: props.visible,
      opacity: new Animated.Value(opacity),
      heightView: 0,
    };
  }
  animation = (type = 'open', cb = () => {}) => {
    const toValue = type === 'open' ? 0.7 : 0;
    const duration = 350;
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start(cb);
  };

  onShow = () => {
    this.animation();
  };

  componentDidUpdate(preProps) {
    const {visible} = this.props;
    // Close
    if (!visible && preProps.visible !== visible) {
      this.animation('close', () => this.updateVisible(visible));
    }
    // Open
    if (visible && preProps.visible !== visible) {
      this.updateVisible(visible);
    }
  }
  updateVisible = visible => {
    this.setState({visible});
  };
  render() {
    const {setModalVisible, maxHeight, theme, children} = this.props;
    const {visible, opacity, heightView} = this.state;
    const bottom = opacity.interpolate({
      inputRange: [0, 0.7],
      outputRange: [-heightView, 0],
    });
    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={() => setModalVisible(false)}
        onShow={this.onShow}>
        <Animated.View
          style={[
            styles.viewOpacity,
            {
              backgroundColor: theme.colors.modal,
              opacity: opacity,
            },
          ]}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => setModalVisible(false)}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              bottom: bottom,
            },
          ]}>
          <Card
            secondary={false}
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              this.setState({
                heightView: height > maxHeight ? maxHeight : height,
              });
            }}
            style={[
              styles.viewChildren,
              {
                maxHeight,
              },
            ]}>
            <View style={styles.modalTitle}>
              <View><Text style={styles.modalTitleText}>{this.props.title }</Text></View>
              <View><AntDesign onPress={() => setModalVisible(false)} name="closecircleo" size={28} color="white" /></View>
            </View>
            {children}
          </Card>
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  viewOpacity: {
    flex: 1,
  },
  touch: {
    flex: 1,
  },
  content: {
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  modalTitle: {
    height: 60,
    width: SCREEN.width,
    backgroundColor: appSecondaryColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:10
  },
  modalTitleText: {
    color: 'white',
    fontSize:20
  },
  viewChildren: {
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingTop: 15,
  },
});

ModalDefault.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  maxHeight: PropTypes.number,
  children: PropTypes.node,
};
ModalDefault.defaultProps = {
  visible: false,
  maxHeight: SCREEN.height - 200,
  setModalVisible: (value = false) => {},
};

export default function ModalDefaultComponent(props) {
  const theme = useTheme();
  return <ModalDefault {...props} theme={theme} />;
}
