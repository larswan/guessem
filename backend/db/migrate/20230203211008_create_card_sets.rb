class CreateCardSets < ActiveRecord::Migration[7.0]
  def change
    create_table :card_sets do |t|
      t.string :topicName

      t.timestamps
    end
  end
end
