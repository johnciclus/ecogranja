class Profile < ActiveRecord::Base
  attr_accessible   :name,
                    :permissions
  
  validates :name,        :presence => true
  validates :permissions, :presence => true
  
  has_many :users, :dependent => :destroy
end