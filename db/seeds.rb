# encoding: UTF-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 使用済み
# require "csv"
#  
# CSV.foreach('db/characters_seed.csv') do |row|
#   row.each { |i|
#     i.force_encoding('UTF-8') if i != nil # これで手動でutf-8だと認識させてやらないとエラー Encoding::UndefinedConversionError: "\xE3" from ASCII-8BIT to UTF-8
#   }
#   Character.create(:name => row[0],
#                    :description => row[1],
#                    :price => row[2],
#                    :rare => row[3],
#                    :image_url => row[4],
#                    :zone_code => row[5])
# end