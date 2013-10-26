class SoilImprovement < ActiveRecord::Base
  attr_accessible   :name,           
                    :DiasApliCal,     
                    :DiasApliFer,     
                    :CompFertilizante,
                    :farm_id
  
  validates :name,              :presence => true
  validates :DiasApliCal,       :presence => true
  validates :DiasApliFer,       :presence => true
  validates :CompFertilizante,  :presence => true
  validates :farm_id,           :presence => true
  
  has_many :scenarios, :dependent => :destroy
  belongs_to :farm
end
