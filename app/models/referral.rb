class Referral < ApplicationRecord
    validates_presence_of :email, :name
    validates_uniqueness_of :email
    
    belongs_to :user
end
