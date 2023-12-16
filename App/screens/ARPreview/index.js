import React from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroImage,
} from '@viro-community/react-viro';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';

const SceneWithImage = props => {
  const {uri} = props.sceneNavigator.viroAppProps || {};
  return (
    <ViroARScene>
      <ViroImage
        placeholderSource={require('../../assets/images/test.jpg')}
        source={{uri}}
        scale={[0.85, 1, 1]}
        position={[0, 0, -1]}
      />
    </ViroARScene>
  );
};

function ARPreview({navigation, route}) {
  const {uri} = route.params || {};
  const handleClick = size => {
    if (size === 1) {
      navigation.navigate('ARPreviewSmall', {uri});
    } else if (size === 2) {
      navigation.navigate('ARPreviewMedium', {uri});
    } else if (size === 3) {
      navigation.navigate('ARPreviewLarge', {uri});
    }
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: SceneWithImage,
        }}
        viroAppProps={{uri}}
        style={styles.f1}
      />
      <View style={styles.previewButtonsContainer}>
        <Pressable style={styles.previewButton} onPress={() => handleClick(1)}>
          <View>
            <Text style={styles.previewButtonText}>24" x 18"</Text>
          </View>
        </Pressable>
        <Pressable style={styles.previewButton} onPress={() => handleClick(2)}>
          <View>
            <Text style={styles.previewButtonText}>28" x 24"</Text>
          </View>
        </Pressable>
        <Pressable style={styles.previewButton} onPress={() => handleClick(3)}>
          <View>
            <Text style={styles.previewButtonText}>30" x 36"</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default ARPreview;
