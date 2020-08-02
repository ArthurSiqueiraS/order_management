class Api::V1::OrdersController < ApplicationController
  def index
    orders = Order.all

    render json: orders
  end

  def show
    return not_found if order.nil?

    render json: order
  end

  def create
    order = Order.create!

    render json: order
  end

  def update
    return not_found if order.nil?

    if order.may_start?
      order.start!
    elsif order.may_complete?
      order.complete!
    end

    render json: order
  end

  def destroy
    return not_found if order.nil?

    order.destroy

    render json: { message: 'Order deleted.' }
  end

  private

  def not_found
    render json: { error: "Order ##{params[:id]} not found." }, status: 404
  end

  def order
    begin
      @order ||= Order.find(params[:id])
    rescue
    end
  end
end
