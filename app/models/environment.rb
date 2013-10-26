class Environment < ActiveRecord::Base
  attr_accessible :name,
                  :Nitrogeno,
                  :Fosforo,
                  :Potasio,
                  :PhSuelo,
                  :DensidadAparente,
                  :Profundidad,
                  :farm_id
  
  validates :name,              :presence => true
  validates :Nitrogeno,         :presence => true
  validates :Fosforo,           :presence => true
  validates :Potasio,           :presence => true
  validates :PhSuelo,           :presence => true
  validates :DensidadAparente,  :presence => true
  validates :Profundidad,       :presence => true
  validates :farm_id,           :presence => true
  
  has_many :scenarios, :dependent => :destroy
  belongs_to :farm
end
