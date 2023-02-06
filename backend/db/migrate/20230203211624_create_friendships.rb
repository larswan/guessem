class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.integer :p1Id
      t.integer :p2Id

      t.timestamps
    end
  end
end
