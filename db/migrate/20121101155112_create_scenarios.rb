class CreateScenarios < ActiveRecord::Migration
  def change
    create_table :scenarios do |t|
      t.string :name,                 :null => false
      t.string :description,          :null => false
      
      t.references :environment,      :null => false
      t.references :crop,             :null => false
      t.references :production,       :null => false
      t.references :soil_improvement, :null => false
      t.references :farm,             :null => false
      
      t.timestamps
    end
  end
end
