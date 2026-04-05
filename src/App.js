import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';
import { COLOR_WHITE, SAFE_AREA_BOTTOM_COLOR } from './constants';

const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  cwCookie: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  colorScheme: PropTypes.oneOf(['dark', 'light', 'auto']),
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
};

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
      backdropColor={COLOR_WHITE}
      coverScreen
      isVisible={isModalVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modal}>
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

ChatWootWidget.propTypes = propTypes;

export default ChatWootWidget;
