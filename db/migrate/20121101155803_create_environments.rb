class CreateEnvironments < ActiveRecord::Migration
  def change
    create_table :environments do |t|
      t.string :name,             :null => false
      t.float  :Nitrogeno,        :null => false
      t.float  :Fosforo,          :null => false
      t.float  :Potasio,          :null => false
      t.float  :PhSuelo,          :null => false
      t.float  :DensidadAparente, :null => false
      t.float  :Profundidad,      :null => false
      
      t.references :farm,         :null => false
      t.timestamps
    end
  end
end
