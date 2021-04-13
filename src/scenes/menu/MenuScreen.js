import React, { useState } from 'react';
import { Layout, IndexPath, Select, SelectItem, Text } from '@ui-kitten/components';
import { FlatList } from 'react-native';

import StyleSheet from 'react-native-media-query';

import ScrollLayout from '../../components/layouts/ScrollLayout';
import { Flex, Spacing, Width } from '../../styles';
import ItemCard from '../../components/cards/ItemCard';
import HighlightCard from '../../components/cards/HighlightCard';

const DATA = [
  {
    id: "1",
    title: "MB01. Super Combo 1",
    price: 32.00
  },
  {
    id: "2",
    title: "MB02. Super Combo 2",
    price: 12.00
  },
  {
    id: "3",
    title: "MB03. Super Combo 3",
    price: 16.00
  },
];

const MenuScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <ScrollLayout>
      <Layout level="2" style={ styles.container } dataSet={{ media: ids.container }}>
        <Text category="h2" status="control" style={ styles.title }>Promotion Bundle</Text>

        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          ItemSeparatorComponent={ () => <Layout style={ Spacing.mx_3 }></Layout> }
          contentContainerStyle={ [Spacing.pt_5, Spacing.pb_4, Spacing.pl_4] }
          ListFooterComponent={ <Layout style={ Spacing.pr_4 }></Layout> }
          horizontal={ true }
          renderItem={ ({ item, index }) => <HighlightCard item={ item } index={ index } dynamic={ true } margin={ true }></HighlightCard> }
        />
      </Layout>

      <Text category="h2" status="danger" style={ styles.title }>Menu & Items</Text>

      <Layout style={ styles.menuContainer }>
        <Select
          status="basic"
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

        <Layout style={ styles.itemContainer } dataSet={{ media: ids.itemContainer }}>
          <HighlightCard item={ DATA[0] } index={ 0 } style={{ ...Spacing.my_3 }}></HighlightCard>

          <ItemCard item={ DATA[1] } index={ 1 } style={{ ...Spacing.my_3 }}></ItemCard>
          <ItemCard item={ DATA[2] } index={ 2 } style={{ ...Spacing.my_3 }}></ItemCard>

          <HighlightCard item={ DATA[0] } index={ 0 } style={{ ...Spacing.my_3 }}></HighlightCard>
        </Layout> 
      </Layout>
    </ScrollLayout>
  );
}

const {ids, styles} = StyleSheet.create({
  container: {
    width: "100%"
  },
  title: {
    ...Flex.selfCenter,
    ...Spacing.mt_5
  },
  flatList: {
    ...Spacing.pl_4
  },  
  menuContainer: {
    ...Width.w_100,
    ...Spacing.p_4
  },
  itemContainer: {
    ...Flex.row,
    flexWrap: 'wrap',
    ...Flex.justifyBetween,
    ...Spacing.mt_3
  }
});

export default MenuScreen;