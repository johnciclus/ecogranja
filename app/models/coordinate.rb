class Coordinate < ActiveRecord::Base
  attr_accessible :ind, 
                  :lat, 
                  :lng,
                  :alt,
                  :farm_id
                  
  validates :ind,     :presence => true
  validates :lat,     :presence => true
  validates :lng,     :presence => true
  validates :alt,     :presence => true
  validates :farm_id, :presence => true
  
  belongs_to :farm
end
