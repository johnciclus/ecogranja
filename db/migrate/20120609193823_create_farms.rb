class CreateFarms < ActiveRecord::Migration
  def change
    create_table :farms do |t|
      t.string :name,     :null => false
      t.string :owner,    :null => false
      t.string :address,  :null => false
      t.string :city,     :null => false
      t.string :state,    :null => false
      t.string :country,  :null => false
      t.float :loc_lat,   :null => false
      t.float :loc_lng,   :null => false
      t.float :loc_alt,   :null => false
      t.float :area,      :null => false
      t.float :avg_slope, :null => false
      
      t.references :user, :null => false
      t.timestamps
    end
  end
end
