class CreateTurns < ActiveRecord::Migration[7.0]
  def change
    create_table :turns do |t|
      t.string :status, default: "new"
      t.integer :gameId
      t.integer :turn, default: 0
      t.integer :playerId
      t.string :question
      t.string :answer
      t.integer :guessedCard, default: nil
      t.jsonb :flippedCards
      t.boolean :winning, default: false

      t.timestamps
    end
  end
end
