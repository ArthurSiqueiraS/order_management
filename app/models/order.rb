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
end
