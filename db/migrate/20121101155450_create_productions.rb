class CreateProductions < ActiveRecord::Migration
  def change
    create_table :productions do |t|
      t.string :name,           :null => false
      t.float  :AreaCultivo,    :null => false
      t.float  :DistHorizontal, :null => false
      t.float  :DistVertical,   :null => false
      
      t.references :farm,       :null => false
      t.timestamps
    end
  end
end
