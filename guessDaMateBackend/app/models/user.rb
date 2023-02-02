class User < ApplicationRecord
    has_many :friendships
    has_many :users, through: :friendships
    has_many :games, through: :friendships
    has_many :turns

end
