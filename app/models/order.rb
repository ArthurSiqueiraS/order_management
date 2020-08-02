class Order < ApplicationRecord
  include AASM

  aasm :column => 'state', no_direct_assignment: true do
    state :pending, initial: true
    state :in_progress, :completed

    event :start do
      transitions from: :pending, to: :in_progress
    end

    event :complete do
      transitions from: :in_progress, to: :completed
    end
  end

  def step!
    if may_start?
      start!
    elsif may_complete?
      complete!
    end
  end

  class << self
    def filter(params)
      query = {}

      query[:id] = params[:number] if params[:number].present?
      query[:state] = params[:states] if params[:states].present?

      Order.where(query)
    end
  end
end
