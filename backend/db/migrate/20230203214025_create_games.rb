class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.jsonb :cards, default: {}
      t.integer :p1
      t.integer :p2
      t.string :winningQuestion
      t.string :winningAnswer
      t.jsonb :winningCard
      t.integer :winningUser
      t.jsonb :p1SecretCard
      t.jsonb :p2SecretCard
      t.string :topic
      t.integer :whosTurn
      t.boolean :inProgress, default: true
      t.integer :currentTurn, default: 0

      t.timestamps
    end
  end
end
