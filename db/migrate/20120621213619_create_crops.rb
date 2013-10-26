class CreateCrops < ActiveRecord::Migration
  def change
    create_table :crops do |t|
      t.string :name,           :null => false
      t.string :description,    :null => false
      
      t.float :NabsorPro,       :null => false
      t.float :PAbsorPro,       :null => false
      t.float :KAbsorPro,       :null => false
      t.float :NExtraPro,       :null => false
      t.float :PExtraPro,       :null => false
      t.float :KExtraPro,       :null => false
      t.float :ProPhPlantas,    :null => false
      t.float :DesPhPlantas,    :null => false
      t.float :PesoUniCultivo,  :null => false
      t.float :DesPesoUniCul,   :null => false
      t.float :PesoUniCosecha,  :null => false
      t.float :DesPesoUniCos,   :null => false
      t.float :TiemVegetativo,  :null => false
      t.float :TiemReproductivo,:null => false
      t.float :ProLumiPlanta,   :null => false
      t.float :DesLumiPlanta,   :null => false
      t.float :ProPreciPlanta,  :null => false
      t.float :DesPreciPlanta,  :null => false
      t.float :ProHumePlanta,   :null => false
      t.float :DesHumePlanta,   :null => false
      t.float :ProTempPlanta,   :null => false
      t.float :DesTempPlanta,   :null => false
      
      t.references :article,    :null => false
      t.timestamps
    end
  end
end
