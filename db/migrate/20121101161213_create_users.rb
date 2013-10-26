class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username,           :null => false
      t.string :name,               :null => false
      t.string :encrypted_password, :null => false
      t.string :salt,               :null => false
      t.string :email,              :null => false
      t.string :occupation,         :null => false
      t.string :organization,       :null => false
      t.string :city,               :null => false
      t.string :state,              :null => false
      t.string :country,            :null => false
      
      t.references :profile,  :null => false
      t.timestamps
    end
  end
end
