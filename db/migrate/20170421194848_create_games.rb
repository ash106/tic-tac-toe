class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.jsonb :history
      t.string :winner

      t.timestamps
    end
  end
end
