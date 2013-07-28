class Character < ActiveRecord::Base
  attr_accessible :description, :image_url, :name, :price, :rare, :zone_code
end
