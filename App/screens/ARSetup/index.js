import React from "react";
import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroImage,
  ViroMaterials,
  ViroText,
} from "@viro-community/react-viro";
import styles from "./styles";
import { Pressable, Text, View } from "react-native";
import PropTypes from "prop-types";

const EmptyScene = (props) => {
  const { type, uri, mtlUri } = props.sceneNavigator.viroAppProps || {};
  const [position, setPosition] = React.useState([0, 0, -1]);
  const [Rotation, setRotation] = React.useState([0, 0, 0]);
  const [Scale, setScale] = React.useState(
    type === "3DPreview" ? [0.5, 0.5, 0.5] : [0.85, 1, 1]
  );

  const onObjectDrag = (dragToPos) => {
    setPosition(dragToPos);
  };

  const onObjectPinch = (pinchState, scaleFactor, source) => {
    if (pinchState == 3) {
      let scale_size = Scale[0] * scaleFactor;
      setScale([scale_size, scale_size, scale_size]);
    }
  };

  const onObjectRotation = (rotateState, rotationFactor, source) => {
    if (rotateState == 3) {
      let rotation = Rotation[0] - rotationFactor;
      setRotation([rotation, rotation, rotation]);
    }
  };

  if (type === "3DPreview") {
    ViroMaterials.createMaterials({
      mtl: {
        diffuseTexture: { uri: mtlUri },
      },
    });
  }

  return (
    <ViroARScene onTrackingUpdated={() => {}}>
      {type === "setup" && (
        <ViroText
          text="Go towards the wall and move 4 to 5 steps back"
          position={[0, 0, -1]}
          scale={[0.5, 0.5, 0.5]}
        />
      )}
      {type === "imagePreview" && (
        <ViroImage
          placeholderSource={require("../../assets/images/test.jpg")}
          source={{ uri }}
          scale={Scale}
          position={position}
          rotation={Rotation}
          onDrag={onObjectDrag}
          onPinch={onObjectPinch}
          onRotate={onObjectRotation}
        />
      )}

      {type === "3DPreview" && (
        <>
          <ViroAmbientLight color="#ffffff" />
          <Viro3DObject
            source={{ uri: uri }}
            position={position}
            scale={Scale}
            type="OBJ"
            rotation={Rotation}
            onDrag={onObjectDrag}
            onPinch={onObjectPinch}
            onRotate={onObjectRotation}
            materials={["mtl"]}
          />
        </>
      )}
    </ViroARScene>
  );
};

function ARSetup({ navigation, route }) {
  const { uri, mtlUri } = route.params || {};

  const [type, setType] = React.useState("setup");

  const handleClick = () => {
    if (type === "setup" && uri) {
      if (uri?.endsWith(".jpg") || uri?.endsWith(".png")) {
        setType("imagePreview");
      } else {
        setType("3DPreview");
      }
    } else {
      setType("setup");
    }
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: EmptyScene,
        }}
        viroAppProps={{ uri, type, mtlUri }}
        style={styles.f1}
      />
      <Pressable style={styles.previewButton} onPress={handleClick}>
        <View>
          <Text style={styles.previewButtonText}>
            {type === "setup" ? "Preview" : "Go Back"}
          </Text>
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
