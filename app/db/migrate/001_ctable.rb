class Ctable < ActiveRecord::Migration
public
  def self.up
    create_table :face_asset do |t|
      t.column :name, :text, :default => "noname",:limit=>16
      t.column :i , :integer, :default => 0
      t.column :j , :integer, :default => 0
      t.column :y , :integer, :default => 0
      t.column :eye_h , :integer, :default => 0
      t.column :eye_v , :integer, :default => 0
      t.column :eye_i , :integer, :default => 0
      t.column :eye_j , :integer, :default => 0
      t.column :eye_vsize , :integer, :default => 0
      t.column :eye_width , :integer, :default => 0
      t.column :eye_size , :integer, :default => 0
      t.column :nose_y , :integer, :default => 0
      t.column :nose_len , :integer, :default => 0
      t.column :mouth_y , :integer, :default => 0
      t.column :mouth_width , :integer, :default => 0
      t.column :mouth_y , :integer, :default => 0
      t.column :mouth_width , :integer, :default => 0
      t.column :mouth_end_y , :integer, :default => 0
      t.column :mouth_t_i , :integer, :default => 0
      t.column :mouth_t_j , :integer, :default => 0
      t.column :mouth_b_i , :integer, :default => 0
      t.column :mouth_b_j , :integer, :default => 0
      t.column :eb_y , :integer, :default => 0
      t.column :eb_h , :integer, :default => 0
      t.column :eb_i , :integer, :default => 0
      t.column :eb_j , :integer, :default => 0
      t.column :eb_w , :integer, :default => 0
      t.column :eye_pup_width , :integer, :default => 0
      t.column :eye_line_width , :integer, :default => 0
      t.column :eye_pup_size , :integer, :default => 0
      t.column :eye_pup_o , :integer, :default => 0
      t.timestamps :null => false
    end
    create_table :user_data do |t|
      t.column :uid, :text,:null=>false
      t.column :access_token, :text,:null=>false
      t.column :access_token_hash, :text,:null=>false
      t.column :access_token_salt, :text,:null=>false
      t.column :token_secret, :text,:null=>false
      t.timestamps :null => false
    end
  end
  def self.down
    drop_table :face_asset
    drop_table :user_data
  end
end
