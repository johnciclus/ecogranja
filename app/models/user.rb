class User < ActiveRecord::Base
  attr_accessor :password
  
  before_save :encrypt_password
  after_save  :clear_password
  
  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
  
  validates :username,      :presence => true,  :uniqueness   => true,  :length => { :in => 4..25 }
  validates :name,          :presence => true  
  validates :email,         :presence => true,  :uniqueness   => true,  :format => EMAIL_REGEX
  validates :occupation,    :presence => true
  validates :organization,  :presence => true
  validates :city,          :presence => true
  validates :state,         :presence => true
  validates :country,       :presence => true
  validates :profile_id,    :presence => true
  validates :password,      :presence => true,  :confirmation => true
  validates_length_of :password, :in => 6..20,  :on => :create
  
  has_many   :farms, :dependent => :destroy
  belongs_to :profile
  
  attr_accessible :username,
                  :name,
                  :password, 
                  :password_confirmation,        
                  :salt,    
                  :email,       
                  :occupation,  
                  :organization,
                  :city,  
                  :state, 
                  :country,
                  :profile_id
                  
  def self.authenticate(username_or_email="", login_password="")
    if  EMAIL_REGEX.match(username_or_email)    
      user = User.find_by_email(username_or_email)
    else
      user = User.find_by_username(username_or_email)
    end
  
    if user && user.match_password(login_password)
      return user
    else
      return false
    end
  end  
  
  def match_password(login_password="")
    encrypted_password == BCrypt::Engine.hash_secret(login_password, salt)
  end
  
  def encrypt_password
     if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.encrypted_password = BCrypt::Engine.hash_secret(password, salt)
    end
  end

  def clear_password
    self.password = nil
  end
end
