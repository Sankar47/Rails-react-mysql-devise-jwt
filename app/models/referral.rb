class Referral < ApplicationRecord
    validates_presence_of :email, :name
    validates_uniqueness_of :email
    validates_email_format_of :email
    
    belongs_to :user
end
