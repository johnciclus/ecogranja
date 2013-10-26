class Farm < ActiveRecord::Base
  attr_accessible   :name, 
                    :owner, 
                    :address, 
                    :city,
                    :state,
                    :country,
                    :loc_lat, 
                    :loc_lng,
                    :loc_alt, 
                    :area,
                    :avg_slope,
                    :user_id
                    
  validates :name,      :presence => true
  validates :owner,     :presence => true
  validates :address,   :presence => true
  validates :city,      :presence => true
  validates :state,     :presence => true
  validates :country,   :presence => true
  validates :loc_lat,   :presence => true
  validates :loc_lng,   :presence => true
  validates :loc_alt,   :presence => true
  validates :area,      :presence => true
  validates :avg_slope, :presence => true
  validates :user_id,   :presence => true
  
  has_many :coordinates, :dependent => :destroy
  has_many :environments, :dependent => :destroy
  has_many :productions, :dependent => :destroy
  has_many :soil_improvements, :dependent => :destroy  
  has_many :scenarios, :dependent => :destroy
  accepts_nested_attributes_for :coordinates
  
  belongs_to :user
end