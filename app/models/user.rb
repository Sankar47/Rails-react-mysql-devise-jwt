class User < ApplicationRecord
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_format_of :email,:with => Devise::email_regexp

  has_many :referrals

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
end
