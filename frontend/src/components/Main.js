import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Main extends Component {
  toHome = () => {
    return <Redirect to="/"/>;
  }

  render() {
    const { isAuthenticated } = this.props;

    if(!isAuthenticated) {
      return this.toHome();
    }

    return (
      <div>
        <h1>Someshit</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
