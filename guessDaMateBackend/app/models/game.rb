class Game < ApplicationRecord
    belongs_to :friendship
    has_many :turns
end
