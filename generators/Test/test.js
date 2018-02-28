/**
*
* Auth
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// import get from 'lodash/get'
import { MainContainer, Container, HeaderNav, FooterNav } from '../../Components'
import styles from './styles'


class Auth extends Component {
  static propTypes = {
  }

  render() {
    return (
      <MainContainer>
        <HeaderNav/>
        <ScrollView>
          <View>
            <Text>
              Auth
            </Text>
          </View>
        </ScrollView>
        <FooterNav navigation={this.props.navigation}/>
      </MainContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  state: (state) => state,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
