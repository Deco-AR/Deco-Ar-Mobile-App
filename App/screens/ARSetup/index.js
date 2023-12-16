import React from 'react';
import {ViroARScene, ViroARSceneNavigator} from '@viro-community/react-viro';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const EmptyScene = props => {
  return <ViroARScene />;
};

function ARSetup({navigation, route}) {
  const {uri} = route.params || {};

  const handleClick = () => {
    navigation.navigate('ARPreviewSmall', {uri});
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: EmptyScene,
        }}
        style={styles.f1}
      />
      <Text style={styles.title}>
        Go towards the wall and move 4 to 5 steps back
      </Text>
      <Pressable style={styles.previewButton} onPress={handleClick}>
        <View>
          <Text style={styles.previewButtonText}>Preview</Text>
        </View>
      </Pressable>
    </View>
  );
}

ARSetup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ARSetup;
