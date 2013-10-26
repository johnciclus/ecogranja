class Production < ActiveRecord::Base
  attr_accessible   :name,
                    :AreaCultivo,
                    :DistHorizontal,
                    :DistVertical,
                    :farm_id
  
  validates :name,              :presence => true
  validates :AreaCultivo,       :presence => true
  validates :DistHorizontal,    :presence => true
  validates :DistVertical,      :presence => true
  validates :farm_id,           :presence => true
  
  has_many :scenarios, :dependent => :destroy
  belongs_to :farm
end
