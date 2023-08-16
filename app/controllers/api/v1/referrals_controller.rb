class Api::V1::ReferralsController < ApplicationController
  before_action :authenticate_user!

  def index
    referrals = current_user.referrals
    render json: {referrals: referrals}
  end

  def create
    @referral = current_user.referrals.build(referral_params)
    if @referral.save
      ReferralMailer.invite_email(@referral).deliver
      render json: @referral
    else
      render json: @referral.errors, status: 400
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:name, :email)
  end
end
