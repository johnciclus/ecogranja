class Crop < ActiveRecord::Base
  attr_accessible :name,
                  :description,
                  :NabsorPro,
                  :PAbsorPro,
                  :KAbsorPro,
                  :NExtraPro,
                  :PExtraPro,
                  :KExtraPro,
                  :ProPhPlantas,
                  :DesPhPlantas,
                  :PesoUniCultivo,
                  :DesPesoUniCul,
                  :PesoUniCosecha,
                  :DesPesoUniCos,
                  :TiemVegetativo,
                  :TiemReproductivo,
                  :ProLumiPlanta,
                  :DesLumiPlanta,
                  :ProPreciPlanta,
                  :DesPreciPlanta,
                  :ProHumePlanta,
                  :DesHumePlanta,
                  :ProTempPlanta,
                  :DesTempPlanta,
                  :article_id
                  
  validates :name,            :presence => true
  validates :description,     :presence => true
  validates :NabsorPro,       :presence => true
  validates :PAbsorPro,       :presence => true
  validates :KAbsorPro,       :presence => true
  validates :NExtraPro,       :presence => true
  validates :PExtraPro,       :presence => true
  validates :KExtraPro,       :presence => true
  validates :ProPhPlantas,    :presence => true
  validates :DesPhPlantas,    :presence => true
  validates :PesoUniCultivo,  :presence => true
  validates :DesPesoUniCul,   :presence => true
  validates :PesoUniCosecha,  :presence => true
  validates :DesPesoUniCos,   :presence => true
  validates :TiemVegetativo,  :presence => true
  validates :TiemReproductivo,:presence => true
  validates :ProLumiPlanta,   :presence => true
  validates :DesLumiPlanta,   :presence => true
  validates :ProPreciPlanta,  :presence => true
  validates :DesPreciPlanta,  :presence => true
  validates :ProHumePlanta,   :presence => true
  validates :DesHumePlanta,   :presence => true
  validates :ProTempPlanta,   :presence => true
  validates :DesTempPlanta,   :presence => true
  validates :article_id,      :presence => true
  
  has_many   :scenarios, :dependent => :destroy
  belongs_to :article
end
