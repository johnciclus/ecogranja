class CreateCoordinates < ActiveRecord::Migration
  def change
    create_table :coordinates do |t|
      t.integer :ind, :null => false
      t.float   :lat, :null => false
      t.float   :lng, :null => false
      t.float   :alt, :null => false
      
      t.references :farm, :null => false
      t.timestamps
    end
    
  end
end
