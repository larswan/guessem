class CreateTurns < ActiveRecord::Migration[7.0]
  def change
    create_table :turns do |t|
      t.integer :roundNum
      t.string :question
      t.string :answer
      t.boolean :winning
      t.text :flippedCards
      t.integer :gameId
      t.integer :playerId

      t.timestamps
    end
  end
end
