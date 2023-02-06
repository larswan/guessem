class Game < ApplicationRecord
    belongs_to :friendship, optional: true
    has_many :turns
end
