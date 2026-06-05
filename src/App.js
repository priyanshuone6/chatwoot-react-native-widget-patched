import React, { useEffect, useState } from 'react';
import { Appearance, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';
import { COLOR_WHITE, SAFE_AREA_BOTTOM_COLOR } from './constants';

const ChatWootWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user = {},
  locale = 'en',
  colorScheme = 'light',
  customAttributes = {},
  closeModal,
}) => {
  const [cwCookie, setCookie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);
  const appColorScheme = Appearance.getColorScheme();

  const { mainBackgroundColor } = findColors({
    colorScheme,
    appColorScheme,
  });
  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={closeModal}
      statusBarTranslucent>
      <SafeAreaProvider style={styles.safeAreaProvider}>
        <SafeAreaView edges={['top']} style={[styles.headerView, { backgroundColor: COLOR_WHITE }]} />
        <SafeAreaView edges={['bottom']} style={[styles.mainView, { backgroundColor: SAFE_AREA_BOTTOM_COLOR }]}>
          <View style={[styles.contentView, { backgroundColor: mainBackgroundColor }]}>
            <WebView
              websiteToken={websiteToken}
              cwCookie={cwCookie}
              user={user}
              baseUrl={baseUrl}
              locale={locale}
              colorScheme={colorScheme}
              customAttributes={customAttributes}
              closeModal={closeModal}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default ChatWootWidget;
