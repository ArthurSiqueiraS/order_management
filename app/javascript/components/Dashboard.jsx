import React from 'react';
import client from '../packs/axios.js'

export default class Orders extends React.Component {
  state = {
    orders: [],
    numberQuery: null,
    orderStates: {
      pending: {
        name: 'Pending',
        color: 'danger',
        transition: {
          name: 'Start',
          color: 'warning'
        },
        filter: false
      },
      in_progress: {
        name: 'In progress',
        color: 'warning',
        transition: {
          name: 'Complete',
          color: 'success'
        },
        filter: false
      },
      completed: {
        name: 'Completed',
        color: 'success',
        filter: false
      },
    }
  }

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders() {
    const states = Object.keys(this.state.orderStates).filter(stateKey => (
      this.state.orderStates[stateKey].filter
    ))

    client.get('orders', {
      params: {
        number: this.state.numberQuery,
        states
      }
    })
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  createOrder() {
    client.post('orders')
      .then(() => {
        this.fetchOrders()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  updateOrder(order) {
    client.put(`orders/${order.id}`)
      .then(() => {
        this.fetchOrders()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  deleteOrder(order) {
    client.delete(`orders/${order.id}`)
      .then(() => {
        this.fetchOrders()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  orders() {
    return this.state.orders.map(order => {
      const orderState = this.state.orderStates[order.state]
      const transition = orderState.transition

      return (
        <div key={order.id} className=" col-12 col-sm-6 col-lg-3 p-2">
          <div className={'card border' + orderState.color}>
            <div className="card-body">
              <h5 className="card-title text-info">#{order.id}</h5>
              <p className={'card-text text-' + orderState.color}>
                {orderState.name}
              </p>
              <div className="text-right">
                {transition ?
                  <button
                    className={'btn btn-outline-' + transition.color}
                    onClick={() => this.updateOrder(order)}
                  >
                    {transition.name}
                  </button>
                  : null
                }
                <button className="btn btn-danger ml-2" onClick={() => this.deleteOrder(order)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  handleNumberInput(value) {
    this.setState({ numberQuery: value }, this.fetchOrders)
  }

  toggleStateFilter(stateKey) {
    const newStates = { ...this.state.orderStates }
    newStates[stateKey].filter = !newStates[stateKey].filter

    this.setState({ orderStates: newStates }, this.fetchOrders)
  }

  render() {
    const orders = this.orders()

    return (
      <div className="container">
        <div className="row" style={{ margin: '32px 0' }}>
          <div className="col-12 col-md-6 col-lg-4 input-group">
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Search by order #"
              onChange={(e) => this.handleNumberInput(e.target.value)}
            />
          </div>
          <div
            className="col-12 col-md-6 col-lg-4 mr-0 my-4 mt-md-0 mb-lg-0 form-check form-check-inline"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {Object.keys(this.state.orderStates).map((stateKey, i) => {
              const state = this.state.orderStates[stateKey]

              return (
                <div key={stateKey} className="pr-4">
                  <input
                    className="form-check-input"
                    type="checkbox" id={'checkbox-state-' + i}
                    onChange={() => this.toggleStateFilter(stateKey)}
                    checked={state.filter}
                  />
                  <label className="form-check-label" htmlFor={'checkbox-state-' + i}>
                    {state.name}
                  </label>
                </div>
              )
            })}
          </div>
          <div className="col-12 col-lg-4 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => this.createOrder()}>
              Add new order
            </button>
          </div>
        </div>
        <div className="row">
          {orders}
        </div>
      </div>
    )
  }
}