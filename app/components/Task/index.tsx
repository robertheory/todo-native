import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  name: string;
  checked: boolean;
  onRemove: () => void;
  onCheck: () => void;
};

export const TaskItem = ({ name, checked, onCheck, onRemove }: Props) => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        fillColor='#31CF67'
        unfillColor='#FFFFFF'
        iconStyle={{ borderColor: '#000' }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={() => onCheck()}
        isChecked={checked}
      />
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};
