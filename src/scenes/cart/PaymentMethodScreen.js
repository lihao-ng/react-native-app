import React from 'react';
import { StyleService, Layout, Text, useStyleSheet } from '@ui-kitten/components';
import { Desktop, Mobile, Tablet } from '../../theme/Breakpoints';

const PaymentMethodScreen = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={ styles.container }>
      <Desktop>
        <Text>HIHI DESK</Text>
      </Desktop>

      <Tablet>
        <Text>HIHI TABLED</Text>
      </Tablet>

      <Mobile>
        <Text>HIHI MOBILE</Text>
      </Mobile>
    </Layout>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-danger-500',
  },
});

export default PaymentMethodScreen;