import React from 'react';
import client from '../packs/axios.js'

export default class Orders extends React.Component {
  state = {
    orders: [],
    orderStates: {
      pending: {
        name: 'Pending',
        color: 'danger',
        transition: {
          name: 'Start',
          color: 'warning'
        }
      },
      in_progress: {
        name: 'In progress',
        color: 'warning',
        transition: {
          name: 'Complete',
          color: 'success'
        }
      },
      completed: {
        name: 'Completed',
        color: 'success'
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

    client.get('orders')
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

  render() {
    const orders = this.orders()

    return (
      <div className="container">
        <div className="row" style={{ margin: '32px 0' }}>
          <button className="btn btn-primary" onClick={() => this.createOrder()}>
            Add new order
          </button>
        </div>
        <div className="row">
          {orders}
        </div>
      </div >
    )
  }
}