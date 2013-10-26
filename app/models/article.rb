class Article < ActiveRecord::Base
  attr_accessible :title, 
                  :content, 
                  :category_id
  
  validates :title,       :presence => true
  validates :content,     :presence => true
  validates :category_id, :presence => true
  
  has_one :crop, :dependent => :destroy
  belongs_to :category
end
