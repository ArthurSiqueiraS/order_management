require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  test "should be created with pending state" do
    order = Order.create

    assert order.pending?, "Initial state is not pending"
  end

  test "order id should be an integer" do
    order = Order.create

    assert_instance_of Integer, order.id, "Order id is not an integer"
  end

  test "order can't be directly updated" do
    order = Order.create

    assert_raises AASM::NoDirectAssignmentError do
      order.update(state: 'in_progress')
    end
  end

  test "if order is pending, it can be started" do
    order = orders(:pending)

    assert order.pending? && order.may_start?, "Pending order can't be started"
  end

  test "if order is pending, it can't be completed" do
    order = orders(:pending)

    assert order.pending? && !order.may_complete?, "Pending order can be completed"
  end

  test "if order is in progress, it can be completed" do
    order = orders(:in_progress)

    assert order.in_progress? && order.may_complete?, "Order in progress can't be completed"
  end

  test "if order is in progress, it can't be started" do
    order = orders(:in_progress)

    assert order.in_progress? && !order.may_start?, "Order in progress can be started"
  end

  test "if order is completed, it can't be started" do
    order = orders(:completed)

    assert order.completed? && !order.may_start?, "Completed order can be started"
  end

  test "if order is completed, it can't be completed" do
    order = orders(:completed)

    assert order.completed? && !order.may_complete?, "Completed order can be completed"
  end
end
