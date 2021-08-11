import React, { FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '../utils';

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
});

const ReloadIcon: FC<{ load: () => void }> = ({ load }) => {
  const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        onPress={load}
        name={reloadIconName}
        size={24}
        color={colors.PRIMARY_COLOR}
      />
    </View>
  );
};

export default ReloadIcon;
