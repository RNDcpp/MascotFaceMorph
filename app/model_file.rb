require 'base64'
require 'bcrypt'
require File.expand_path('../active_record/active_record_base',__FILE__)
class FaceAsset < ActiveRecord::Base
  self.table_name = :face_asset
  validates :name, presence: true,length: { maximum: 16 }
  def upload_file(base64_file)
    file_name = File.expand_path("../public/img/asset/#{self.id}.png",__FILE__)
    data = File.open(file_name,'w')
    data.write(Base64.decode64(base64_file))
    data.close
  end
end
class UserData < ActiveRecord::Base
  include BCrypt
  self.table_name = :user_data
  def encrypt_password(password)
    if password.present?
     self.access_token_salt = Engine.generate_salt
     self.access_token_hash = Engine.hash_secret(password, self.access_token_salt)
    end 
  end 
  def check_access_token_hash(password)
     (self.access_token_hash == Engine.hash_secret(password, self.access_token_salt))
  end
end
