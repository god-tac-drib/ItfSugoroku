class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.integer :rare
      t.string :image_url
      t.string :zone_code

      t.timestamps
    end
  end
end
