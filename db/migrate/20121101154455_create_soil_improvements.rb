class CreateSoilImprovements < ActiveRecord::Migration
  def change
    create_table :soil_improvements do |t|
      t.string :name,            :null => false
      t.string :DiasApliCal,     :null => false
      t.string :DiasApliFer,     :null => false
      t.string :CompFertilizante,:null => false
      
      t.references :farm,        :null => false
      t.timestamps
    end
  end
end
