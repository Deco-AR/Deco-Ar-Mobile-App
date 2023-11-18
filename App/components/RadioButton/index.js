import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {RadioButtonIcon, RadioButtonIconActive} from '../../assets/images';

const RadioButton = ({isCheck, style, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.54} style={{...style}} onPress={onPress}>
      {isCheck ? (
        <View>
          <SvgXml xml={RadioButtonIconActive} width={20} height={20} />
        </View>
      ) : (
        <View>
          <SvgXml xml={RadioButtonIcon} width={20} height={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;
