import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

class Notification extends React.Component {
  componentWillReceiveProps(props) {
    $('.toast').toast('show')
  }

  render() {
    const { text, color } = this.props.notification

    return (
      <div
        className={'toast text-' + color}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2500"
        style={{ position: 'absolute', top: 0, margin: '32px' }}
      >
        <div className="toast-body">
          {text}
        </div>
      </div>
    )
  }
}

export default connect(store => ({ notification: store.notification }))(Notification)
