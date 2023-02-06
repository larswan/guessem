class Turn < ApplicationRecord
    belongs_to :user, foreign_key: 'playerId'
    belongs_to :game, foreign_key: 'gameId'
end
