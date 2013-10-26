class Scenario < ActiveRecord::Base
  attr_accessible :name,
                  :description,
                  :farm_id,
                  :environment_id,
                  :production_id,
                  :soil_improvement_id,
                  :crop_id
                  
  
  validates :name,                :presence => true
  validates :description,         :presence => true
  validates :environment_id,      :presence => true
  validates :crop_id,             :presence => true
  validates :production_id,       :presence => true
  validates :soil_improvement_id, :presence => true
  
  belongs_to :farm
  belongs_to :environment
  belongs_to :production
  belongs_to :soil_improvement
  belongs_to :crop
  
end
