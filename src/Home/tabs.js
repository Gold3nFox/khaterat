import React, { Component } from 'react';
import { Container,Left,Text,Right,Button,Icon,TabHeading,Body,Header,Title, Content, Tab, Tabs } from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

export default class Mytabs extends Component {
    
  render() {
    return (
      <Container>
          <Header > 
        <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer()}}
            >
              <Icon name="menu" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>صفحه اصلی</Title>
          </Body>
        </Header>
        {/* <Header hasTabs /> */}
        <Tabs locked={true} tabBarPosition="overlayTop" onChangeTab={()=>this.forceUpdate() }>
          <Tab heading={ <TabHeading style={{marginLeft: 10,}}><Icon style={{fontSize: 20}} name="heart" /><Text>علاقه مندی ها</Text></TabHeading>}>
            <Tab1  />
          </Tab>
          <Tab heading={ <TabHeading ><Text>سایر خاطرات</Text></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab style={{marginRight: 10}} heading={ <TabHeading><Icon name="ios-more"></Icon></TabHeading>}>
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}