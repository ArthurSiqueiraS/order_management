require 'test_helper'

class Api::V1::OrdersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @id = orders.first.id
  end

  test "should get index" do
    get route

    assert_response :success
  end

  test "should get show" do
    get route(@id)

    assert_response :success
  end

  test "should post create" do
    post route

    assert_response :success
  end

  test "should put update" do
    put route(@id)

    assert_response :success
  end

  test "should delete destroy" do
    delete route(@id)

    assert_response :success
  end

  test "index should return an array of orders" do
    get route

    assert_instance_of Array, response.parsed_body, "Response data is not an array"
  end

  test "orders should be filterable by number" do
    get route, params: { number: @id }
    data = response.parsed_body

    assert data.length == 1
    assert_equal data.first['id'], @id
  end

  test "orders should be empty if filtered by non-existing number" do
    get route, params: { number: 0 }
    data = response.parsed_body

    assert data.empty?
  end

  test "orders should be filterable by states" do
    get route, params: { states: ['pending', 'in_progress'] }
    data = response.parsed_body
    filtered_states = data.pluck('state')

    assert filtered_states.include? 'pending'
    assert filtered_states.include? 'in_progress'
    assert_not filtered_states.include? 'completed'
  end

  test "the filters should work together" do
    get route, params: { number: @id, states: ['pending'] }
    data = response.parsed_body

    assert data.length == 1 && data.first['id'] == @id && data.first['state'] == 'pending'

    get route, params: { number: @id, states: ['in_progress'] }
    data = response.parsed_body

    assert data.empty?
  end

  test "show should return a single order with the required id" do
    get route(@id)

    assert_equal response.parsed_body['id'], @id
  end

  test "create should insert a new pending order" do
    old_count = Order.count
    post route
    new_count = Order.count

    assert_equal new_count, old_count + 1
    assert Order.last.pending?
  end

  test "updating a pending order should turn it's state to in_progress" do
    order = orders(:pending)
    put route(order.id)
    order = Order.find(order.id)

    assert_not order.pending?
    assert order.in_progress?
  end

  test "updating an in_progress order should turn it's state to completed" do
    order = orders(:in_progress)
    put route(order.id)
    order = Order.find(order.id)

    assert_not order.in_progress?
    assert order.completed?
  end

  test "updating a completed order should maintain it's state as completed" do
    order = orders(:completed)
    put route(order.id)
    order = Order.find(order.id)

    assert order.completed?
  end

  test "if deleting an existing id an order should be removed" do
    old_count = Order.count
    delete route(@id)
    new_count = Order.count

    assert_equal new_count, old_count - 1
    assert_not Order.pluck(:id).include? @id
  end

  private

  def route(id=nil)
    route = '/api/v1/orders'

    route += "/#{id}" if id

    route
  end
end
