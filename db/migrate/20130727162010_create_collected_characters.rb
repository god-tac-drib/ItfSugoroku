class CreateCollectedCharacters < ActiveRecord::Migration
  def change
    create_table :collected_characters do |t|
      t.integer :user_id
      t.integer :character_id

      t.timestamps
    end
  end
end
