class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :p2
      t.integer :p1
      t.integer :p1SecretCard
      t.integer :p2SecretCard
      t.text :p1Cards
      t.text :p2Cards
      t.boolean :inProgress, default: true
      t.integer :whosTurn
      t.integer :currentTurn, default: 1
      t.integer :friendshipId

      t.timestamps
    end
  end
end
